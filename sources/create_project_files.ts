import fs   = require('fs');
import path = require('path');

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
        case 'hoogspanningsleidingen': return { group: 'Masten en leidingen', title: 'Hoogspanningsleidingen', clustering: true, desc: 'Bron: Imergis 2016' };
        case 'hoogspanningsmasten': return { group: 'Masten en leidingen', title: 'Hoogspanningsmasten', clustering: true, desc: 'Bron: Imergis 2016' };
        
        case 'inrichting_el_station': return { group: 'Weg en spoor', title: 'Inrichting stations', clustering: true, desc: 'Bron: Imergis 2016' };
        case 'spoorwegen': return { group: 'Weg en spoor', title: 'Spoorwegen', clustering: true, desc: 'Bron: Imergis 2016' };
        case 'wegdeel_vlak_brug_beweegbaar': return {  group: 'Weg en spoor', title: 'Beweegbare bruggen', clustering: true, desc: 'Bron: Imergis 2016' };

        case 'gemeente': return { group: 'Bevolking', oneActive: true, clustering: false, title: 'gemeente', desc: 'Bron: CBS Gemeente, Wijk en Buurtkaart 2015' };
        case 'wijk': return { group: 'Bevolking', oneActive: true, clustering: false, title: 'Wijk', desc: 'Bron: CBS Gemeente, Wijk en Buurtkaart 2015' };
        case 'buurt': return { group: 'Bevolking', oneActive: true, clustering: false, title: 'buurt', desc: 'Bron: CBS Gemeente, Wijk en Buurtkaart 2015' };

        default: return { group: 'Overig', title: id, clustering: true, desc: '???' };
    }
}

const dataFolder        = '../csweb/data/projects';
const resourceFolder    = 'data/resourceTypes';
const defaultProjectUrl = path.join(dataFolder, 'default_project.json');

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
            // Create links
            // console.log('<li><a href="csweb/index.html?project=%s">%s</a></li>', id, title);
            // Create default solution project links
            // console.log(`{ "id": "${id}", "title": "${title}", "url": "data/projects/${id}/project.json", "isDynamic": false },`);
            // return;

            // Create project files
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
                            newGroup.clusterLevel = 11;
                        }
                        if (info.oneActive) {
                            newGroup.oneLayerActive = true;
                        }
                        groups[groupId] = newGroup;
                    }
                    let group = groups[groupId];
                    let url = path.join(folder, file).replace('..\\csweb\\', '').replace(/\\/g, '/');
                    let typeUrl = path.join(resourceFolder, layerId).replace(/\\/g, '/');
                    group.layers.push({
                        id: layerId,
                        title: info.title,
                        description: info.desc,
                        type: 'geojson',
                        url: url,
                        typeUrl: typeUrl,
            	        opacity: 0.75,
                        defaultFeatureType: layerId,
                        isDynamic: false,
                        timeAware: false,
                        fitToMap: true
                    });
                });
                for (var key in groups) {
                    if (!groups.hasOwnProperty(key)) continue;
                    project.groups.push(groups[key]);
                }
                fs.writeFile(projectUrl, JSON.stringify(project, null, 2));
            });
        });
    });
});