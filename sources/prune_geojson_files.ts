/** 
 * Prune GeoJSON files by removing all files without features, and removing features that are not well formatted 
 * (like areas after clipping at the border of the region) 
 */

import fs   = require('fs');
import path = require('path');

export interface IGeoJSON {
    type: string;
    features: {
        type: string;
        properties: { [key: string]: any };
        geometry: {
            type: string;
            coordinates?: any;
            geometries?: {
                type: string;
                coordinates?: any;
            }[];
        }
    }[]
}

const dataFolder        = '../csweb/data/projects';
const resourceFolder    = 'data/resourceTypes';

/** Delete a file */
function deleteFile(file: string) {
    console.log(`Deleting: ${file}`);
    fs.unlink(file, (err) => {
        if (err) {
            console.error(err.message);
            return;
        }
    });
}

function mainLoop() {
    fs.readdir(dataFolder, (err, files) => {
        // Read data folder
        if (err) {
            console.error(err.message);
            return;
        }

        files.map(file => {
            return path.join(dataFolder, file);
        }).filter(file => {
            return !fs.statSync(file).isFile();
        }).forEach(folder => {
            // Process each project folder
            fs.readdir(folder, (err, folderFiles) => {
                if (err) {
                    console.error(err.message);
                    return;
                }
                folderFiles.map(file => {
                    return path.join(folder, file);
                }).filter(file => {
                    return path.extname(file) === '.geojson';
                }).forEach(geoJsonFile => { 
                    // Process each geojson file
                    fs.readFile(geoJsonFile, (err, data) => {
                        if (err) {
                            console.error(err.message);
                            return;
                        }
                        let geojson: IGeoJSON = JSON.parse(data.toString());
                        if (!geojson.features || geojson.features.length === 0) { 
                            // GeoJSON file is empty after clipping: remove
                            deleteFile(geoJsonFile);
                        } else {
                            // look for features that are empty or make no sense
                            let index = 0;
                            let indexOfFeaturesToRemove: number[] = [];
                            geojson.features.forEach(f => {
                                if (!f.geometry) {
                                    indexOfFeaturesToRemove.push(index);
                                    console.warn(`${geoJsonFile}: Feature ${index} contains no geometry!`);
                                } else if (f.geometry.geometries) {
                                    let geomTooSimple = true;
                                    f.geometry.geometries.some(g => {
                                        if (g.type === 'Point' || g.type === 'LineString' || g.coordinates.length <= 4) return false;
                                        geomTooSimple = false;
                                        return true;
                                    });
                                    if (geomTooSimple) {
                                        indexOfFeaturesToRemove.push(index);
                                        console.warn(`${geoJsonFile}: Feature ${index} has a too simple geometry!`);
                                    }
                                }
                                index++;
                            });
                            if (indexOfFeaturesToRemove.length > 0) {
                                for (let i = indexOfFeaturesToRemove.length - 1; i >= 0; i--) {
                                    let pruneIndex = indexOfFeaturesToRemove[i];
                                    geojson.features.splice(pruneIndex, 1);
                                }
                                fs.writeFileSync(geoJsonFile, JSON.stringify(geojson));
                            }
                        }
                    });
                });
            });
        });
    });
}

mainLoop();