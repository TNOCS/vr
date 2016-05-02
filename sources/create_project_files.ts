import fs   = require('fs');
import path = require('path');
import IFeature = csComp.Services.IFeature;

export interface IGeoJSON {
    type: string;
    features: IFeature[];
}

export interface Layer {
    id?: string;
    title?: string;
    description?: string;
    type?: string;
    url?: string;
    typeUrl?: string;
    opacity?: number;
    defaultFeatureType?: string;
    isDynamic?: boolean;
    timeAware?: boolean;
    fitToMap?: boolean;    
}

export interface Group {
    id: string;
    title: string;
    description?: string;
    clustering?: boolean;
    clusterLevel?: number;
    oneLayerActive?: boolean;
    layers: Layer[]; 
}

export interface IProject {
    id?: string;
    title?: string;
    groups: Group[];
}

export class FeatureType {
    name: string;
    style = {
        drawingMode: 'Point',
        fillColor: '#ffffff',
        strokeColor: '#ffffff',
        selectedStrokeColor: '#0000FF',
        strokeWidth: 2,
        stroke: true,
        fillOpacity: 0.9,
        opacity: 0.9,
        iconWidth: 28,
        iconHeight: 28,
        nameLabel: 'Name',
        iconUri: 'images/marker-icon.png'
    };
    propertyTypeKeys = '';
}

export class PropertyType {
    constructor(public title: string, public type = 'text') {}
}

export interface ITypeResource {
    featureTypes: { [key: string]: FeatureType };
    propertyTypeData: { [key: string]: PropertyType };
}

/** Convert project id (folder name) to project title. */
function projectIdToTitle(id: string) {
    switch(id) {
        case 'amsterdam-amstelland':  return 'Amsterdam-Amstelland';
        case 'brabant-noord':         return 'Brabant-noord';
        case 'drenthe':               return 'Drenthe';
        case 'flevoland':             return 'Flevoland';
        case 'friesland':             return 'Fryslân';
        case 'gelderland-midden':     return 'Gelderland-Midden';
        case 'gelderland-zuid':       return 'Gelderland-Zuid';
        case 'gooi_en_vechtstreek':   return 'Gooi en Vechtstreek';
        case 'groningen':             return 'Groningen';
        case 'haaglanden':            return 'Haaglanden';
        case 'hollands_midden':       return 'Hollands Midden';
        case 'ijsselland':            return 'IJsselland';
        case 'kennemerland':          return 'Kennemerland';
        case 'limburg-noord':         return 'Limburg-Noord';
        case 'midden-west-brabant':   return 'Midden-West-Brabant';
        case 'noord-holland-noord':   return 'Noord-Holland-Noord';
        case 'noord-oost-gelderland': return 'Noord- en Oost-Gelderland';
        case 'rotterdam-rijnmond':    return 'Rotterdam-Rijnmond';
        case 'twente':                return 'Twente';
        case 'utrecht':               return 'Utrecht';
        case 'zaanstreek-waterland':  return 'Zaanstreek-Waterland';
        case 'zeeland':               return 'Zeeland';
        case 'zuid-holland-zuid':     return 'Zuid-Holland-Zuid';
        case 'zuid-limburg':          return 'Zuid-Limburg';
        case 'zuidoost-brabant':      return 'Zuidoost-Brabant';
    }
}

function layerIdToInfo(id: string, vrTitle: string) : { title: string; desc: string; group?: string; oneActive?: boolean; clustering?: boolean} {
    switch(id) {
        case 'ambulanceposten': return { group: 'Locaties', title: 'Ambulanceposten', clustering: true, desc: 'Bron: Imergis 2016' };
        case 'brandweerkazernes': return { group: 'Locaties', title: 'Brandweerkazernes', clustering: true, desc: 'Bron: Imergis 2016' };
        case 'politievestigingen': return { group: 'Locaties', title: 'Politievestigingen', clustering: true, desc: 'Bron: Imergis 2016' };
        case 'gemeentehuizen': return { group: 'Locaties', title: 'Gemeentehuizen', clustering: true, desc: 'Bron: Imergis 2016' };

        case 'clip': return { group: 'Regio', title: vrTitle, clustering: true, desc: 'Bron: Imergis 2016' };

        case 'antenneregister': return { group: 'Masten en leidingen', title: 'Antenneregister', clustering: true, desc: 'Bron: Imergis 2016' };
        case 'c2000masten': return { group: 'Masten en leidingen', title: 'C2000 masten', clustering: true, desc: '' };
        case 'hoogspanningsleidingen': return { group: 'Masten en leidingen', title: 'Hoogspanningsleidingen', clustering: true, desc: 'Bron: Imergis 2016' };
        case 'hoogspanningsmasten': return { group: 'Masten en leidingen', title: 'Hoogspanningsmasten', clustering: true, desc: 'Bron: Imergis 2016' };
        
        case 'inrichting_el_station': return { group: 'Weg en spoor', title: 'Inrichting stations', clustering: true, desc: 'Bron: Imergis 2016' };
        case 'spoorwegen': return { group: 'Weg en spoor', title: 'Spoorwegen', clustering: true, desc: 'Bron: Imergis 2016' };
        case 'wegdeel_vlak_brug_beweegbaar': return { group: 'Weg en spoor', title: 'Beweegbare bruggen', clustering: true, desc: 'Bron: Imergis 2016' };

        case 'gemeente': return { group: 'Bevolking', oneActive: true, clustering: false, title: 'Gemeente', desc: 'Bron: CBS Gemeente, Wijk en Buurtkaart 2015' };
        case 'wijk': return { group: 'Bevolking', oneActive: true, clustering: false, title: 'Wijk', desc: 'Bron: CBS Gemeente, Wijk en Buurtkaart 2015' };
        case 'buurt': return { group: 'Bevolking', oneActive: true, clustering: false, title: 'Buurt', desc: 'Bron: CBS Gemeente, Wijk en Buurtkaart 2015' };

        case 'ziekenhuis': return { group: 'Zieken- en verpleeghuizen', oneActive: false, clustering: true, title: 'Ziekenhuizen', desc: 'Bron: Ministerie van VWZ op www.zorgopdekaart.nl' };
        case 'vvt': return { group: 'Zieken- en verpleeghuizen', oneActive: false, clustering: true, title: 'VVT', desc: 'Bron: Ministerie van VWZ op www.zorgopdekaart.nl' };
        case 'ggz': return { group: 'Zieken- en verpleeghuizen', oneActive: false, clustering: true, title: 'GGZ', desc: 'Bron: Ministerie van VWZ op www.zorgopdekaart.nl' };
        case 'ghz': return { group: 'Zieken- en verpleeghuizen', oneActive: false, clustering: true, title: 'GHZ', desc: 'Bron: Ministerie van VWZ op www.zorgopdekaart.nl' };

        default: return { group: 'Overig', title: id, clustering: true, desc: '???' };
    }
}

const dataFolder        = '../csweb/data/projects';
const resourceFolder    = 'data/resourceTypes';
const defaultProjectUrl = path.join(dataFolder, 'default_project.json');

/** Create the links for the index page, so you can easily paste them */
function createLinksForMainIndex(id: string, title: string) {
    console.log('<li><a href="csweb/index.html?project=%s">%s</a></li>', id, title);
}

/** Create the project links for the api/projects/defaultSolution.json, so you can easily paste them */
function createLinksForDefaultSolution(id: string, title: string) {
    console.log(`{ "id": "${id}", "title": "${title}", "url": "data/projects/${id}/project.json", "isDynamic": false },`);
}

function createProjectFiles(folder: string, data: Buffer, id: string, title: string) {
    fs.readdir(folder, (err, files) => {
        console.log(">>> %s (%s)", id, folder);
        if (err) {
            console.error(err.message);
            return;
        }
        let projectUrl = path.join(folder, 'project.json');
        let project: IProject = JSON.parse(data.toString());
        project.id = id;
        project.title = title;
        project.groups = [];
        let groups: { [key: string]: Group } = {};

        files.map(file => {
            if (file === 'project.json') return '';
            return file;
        }).forEach(file => {
            if (!file) return;
            let layerId = path.basename(file).replace(path.extname(file), '');
            let info = layerIdToInfo(layerId, id);
            let groupId = info.group.toLowerCase();
            if (!groups.hasOwnProperty(groupId)) {
                let newGroup: Group = {
                    id: groupId,
                    title: info.group,
                    layers: []
                };
                if (info.clustering) {
                    newGroup.clustering = true;
                    newGroup.clusterLevel = 13;
                }
                if (info.oneActive) {
                    newGroup.oneLayerActive = true;
                }
                groups[groupId] = newGroup;
            }
            let group = groups[groupId];
            let url = path.join(folder, file).replace('..\\csweb\\', '').replace(/\\/g, '/');
            let typeUrl = path.join(resourceFolder, layerId).replace(/\\/g, '/') + '.json';
            group.layers.push({
                id: layerId,
                title: info.title,
                description: info.desc,
                type: 'geojson',
                url: url,
                typeUrl: typeUrl,
                opacity: 75,
                defaultFeatureType: layerId,
                isDynamic: false,
                timeAware: false,
                fitToMap: true
            });
            createTypeResource(url, typeUrl, layerId);
        });
        for (var key in groups) {
            if (!groups.hasOwnProperty(key)) continue;
            project.groups.push(groups[key]);
        }
        fs.writeFile(projectUrl, JSON.stringify(project, null, 2));
    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function createPropertyType(key: string, prop: any) {
    let title = capitalizeFirstLetter(key.toLowerCase().replace('_', ' '));
    let type = isNumeric(prop) 
        ? 'number'
        : prop.length > 12
            ? 'textarea'
            : 'text';
    let sf = '';
    if (type !== 'number') {
        if (prop.indexOf('http') >= 0) {
            type = 'bbcode';
            sf = '[url={0}]website[/url]'
        } else if (prop.indexOf('.com') >= 0 || prop.indexOf('.nl') >= 0) {
            type = 'bbcode';
            sf = '[url=http://{0}]website[/url]'
        }
    }
    let pt = new PropertyType(title, type);
    if (sf) pt['stringFormat'] = sf;
    return pt;
}

var resourceFilesBeingProcessed: string[] = [];

/** Create a default type resource, if not present, from the geojson file. */
function createTypeResource(geojsonUrl: string, fileTypeUrl: string, defaultFeatureType: string) {
    var fileTypeUrl = path.join('../csweb', fileTypeUrl);
    var geojsonUrl = path.join('../csweb', geojsonUrl);
    var ext = path.extname(geojsonUrl);
    if (ext !== '.geojson' && ext !== '.json') return;
    
    if (resourceFilesBeingProcessed.indexOf(fileTypeUrl) >= 0) return;
    resourceFilesBeingProcessed.push(fileTypeUrl);
    
    fs.exists(fileTypeUrl, exists => {
        if (exists) return;
        fs.readFile(geojsonUrl, (err, data) => {
            if (err) {
                console.error(err.message);
                return;
            }
            let ft = new FeatureType();
            let tr: ITypeResource = {
                featureTypes: {},
                propertyTypeData: {}
            };
            tr.featureTypes[defaultFeatureType] = ft;

            var geojson: IGeoJSON = JSON.parse(data.toString());
            if (!geojson.features || geojson.features.length === 0) return;
            let f: IFeature;
            geojson.features.some(feature => {
                if (!feature.geometry) return false;
                f = feature;
                return true;
            });
            ft.style.drawingMode = f.geometry.type;
            ft.style.iconUri = `images/${defaultFeatureType}.png`;
            for (var key in f.properties) {
                if (!f.properties.hasOwnProperty(key)) continue;
                let prop = f.properties[key];
                if (!prop) continue;
                tr.propertyTypeData[key] = createPropertyType(key, prop);
                ft.propertyTypeKeys += ft.propertyTypeKeys ? `;${key}` : key;               
            }
            console.log(`Writing type resource ${fileTypeUrl}...`);
            fs.writeFileSync(fileTypeUrl, JSON.stringify(tr, null, 2));
        });
    });
}


// MAIN LOOP
function mainLoop() {
    fs.readFile(defaultProjectUrl, (err, data) => {
        if (err) {
            console.error(err.message);
            return;
        }

        fs.readdir(dataFolder, (err, files) => {
            if (err) {
                console.error(err.message);
                return;
            }

            files.map(file => {
                return path.join(dataFolder, file);
            }).filter(file => {
                return !fs.statSync(file).isFile();
            }).forEach(folder => {
                let id = path.basename(folder).toLowerCase();
                let title = projectIdToTitle(id);
                // createLinksForMainIndex(id, title);
                // createLinksForDefaultSolution(id, title);
                createProjectFiles(folder, data, id, title);
            });
        });
    });
}

mainLoop();