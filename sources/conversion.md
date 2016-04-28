# Converteren ruwe databronnen naar GeoJSON

## Converteren van de gemeente, wijk en buurtkaart uit 2015 van het CBS

(Bron)[https://data.overheid.nl/data/dataset/wijk-en-buurtkaart-2015-versie-1]
Gebruikt tools: QGIS (Essen, 64 bits), mapshaper (mapshaper-gui, lokaal geïnstalleerd via npm) 

Voor de gemeente, wijk en buurt shape file, volg onderstaande stappen.

### Stap 1: UTF-8 encoding in QGIS

De namen worden niet goed weergegeven in QGIS, e.g. Sudwest-Fryslan gaat weer helemaal mis, aangezien de encoding niet goed staat. 
Je kunt dit als volgt aanpassen (bron)[http://gis.stackexchange.com/questions/152546/is-there-a-way-to-set-the-character-encoding-for-all-layers-at-once]:

Input the code into the Python Console (Plugins > Python Console; Extensions > Python Console; Ctrl + Alt + P).

for layer in QgsMapLayerRegistry.instance().mapLayers().values():
    layer.setProviderEncoding(u'UTF-8')
    layer.dataProvider().setEncoding(u'UTF-8')
    print layer.name(), layer.dataProvider().encoding()   #Optional check: prints layer name and its encoding source

### Stap 2: Watergebieden verwijderen

Standaard staan de watergebieden ook aan. Niet zo relevant, lijkt me, en met een eenvoudig filter (menu Layers|Filter, "Water"="NEE" te verwijderen.

### Stap 3: Conversie naar GeoJSON

Ga naar menu Layers | Exporteren als, en kies GeoJSON, UTF-8 encoding, crs WGS84, en aantal posities voor decimalen 7 
(je hebt geen 15 getallen achter de komma nodig).

### Stap 4: Verwijderen van Water attribuut

De verkregen GeoJSON bevat nu overal de eigenschap, "WATER": "NEE". Dit heb ik verwijderd in een reguliere text editor via een search-and-replace 
commando.

### Stap 5: Vereenvoudigen van geometrie

Alle lagen bevatten teveel onnodige details: maak de GeoJSON files kleiner met mapshaper: comprimeer tot 5%.


# Opsplitsen van GeoJSON bronnen per VR


# Aanmaken van de project.json en projects.json voor alle beschikbare datalagen

