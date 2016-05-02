@echo off
rem First, convert the input data to geojson, reprojecting from RD to wgs84.
rem Second, clip to the bounds of clip.geojson
rem Third, cap the coordinate precision from default (15) to 6 decimals.
rem Fourth, add the area border to each location (if availabled).

rem Steps to reproduce: source data should be a shapefile with RD coordinates downloaded from risicokaart.nl Download hazardous objects and their boundaries, and place all of them in one single folder. Terreingrenzen should be named rgs_irg_lok_pub.shp  &  GevaarlijkeStoffen should be named rgs_irg_pos_pub.shp (or change their coorect filenames in this script).
rem Then place this script, capCoordinatePrecision.js and addContour.js into that folder. 
rem Make sure ogr2ogr.exe and node.exe are added to the PATH variable and run this script.

rem for %%f in (clip/amb*.json) do (
for %%f in (clip/*.geojson) do (
    echo Processing %%f
	echo amsterdam-amstelland
    call ogr2ogr -clipsrc ../csweb/data/projects/amsterdam-amstelland/clip.geojson 	    -f GeoJSON ../csweb/data/projects/amsterdam-amstelland/%%f 	clip/%%f 
    echo brabant-noord
    call ogr2ogr -clipsrc ../csweb/data/projects/brabant-noord/clip.geojson 			-f GeoJSON ../csweb/data/projects/brabant-noord/%%f 		clip/%%f
    echo drenthe
    call ogr2ogr -clipsrc ../csweb/data/projects/drenthe/clip.geojson 					-f GeoJSON ../csweb/data/projects/drenthe/%%f 				clip/%%f
    echo flevoland
    call ogr2ogr -clipsrc ../csweb/data/projects/flevoland/clip.geojson 				-f GeoJSON ../csweb/data/projects/flevoland/%%f 			clip/%%f
    echo friesland
    call ogr2ogr -clipsrc ../csweb/data/projects/friesland/clip.geojson 				-f GeoJSON ../csweb/data/projects/friesland/%%f 			clip/%%f
    echo gelderland-midden
    call ogr2ogr -clipsrc ../csweb/data/projects/gelderland-midden/clip.geojson 		-f GeoJSON ../csweb/data/projects/gelderland-midden/%%f 	clip/%%f
    echo gelderland-zuid
    call ogr2ogr -clipsrc ../csweb/data/projects/gelderland-zuid/clip.geojson 			-f GeoJSON ../csweb/data/projects/gelderland-zuid/%%f 		clip/%%f
    echo gooi_en_vechtstreek
    call ogr2ogr -clipsrc ../csweb/data/projects/gooi_en_vechtstreek/clip.geojson 		-f GeoJSON ../csweb/data/projects/gooi_en_vechtstreek/%%f 	clip/%%f
    echo groningen
    call ogr2ogr -clipsrc ../csweb/data/projects/groningen/clip.geojson 				-f GeoJSON ../csweb/data/projects/groningen/%%f 			clip/%%f
    echo haaglanden
    call ogr2ogr -clipsrc ../csweb/data/projects/haaglanden/clip.geojson 				-f GeoJSON ../csweb/data/projects/haaglanden/%%f 			clip/%%f
    echo hollands_midden
    call ogr2ogr -clipsrc ../csweb/data/projects/hollands_midden/clip.geojson 			-f GeoJSON ../csweb/data/projects/hollands_midden/%%f 		clip/%%f
    echo ijsselland
    call ogr2ogr -clipsrc ../csweb/data/projects/ijsselland/clip.geojson 				-f GeoJSON ../csweb/data/projects/ijsselland/%%f 			clip/%%f
    echo kennemerland
    call ogr2ogr -clipsrc ../csweb/data/projects/kennemerland/clip.geojson 			    -f GeoJSON ../csweb/data/projects/kennemerland/%%f 			clip/%%f
    echo limburg-noord
    call ogr2ogr -clipsrc ../csweb/data/projects/limburg-noord/clip.geojson 			-f GeoJSON ../csweb/data/projects/limburg-noord/%%f 		clip/%%f
    echo midden-west-brabant
    call ogr2ogr -clipsrc ../csweb/data/projects/midden-west-brabant/clip.geojson 		-f GeoJSON ../csweb/data/projects/midden-west-brabant/%%f 	clip/%%f
    echo noord-holland-noord
    call ogr2ogr -clipsrc ../csweb/data/projects/noord-holland-noord/clip.geojson 		-f GeoJSON ../csweb/data/projects/noord-holland-noord/%%f 	clip/%%f
    echo noord-oost-gelderland
    call ogr2ogr -clipsrc ../csweb/data/projects/noord-oost-gelderland/clip.geojson 	-f GeoJSON ../csweb/data/projects/noord-oost-gelderland/%%f clip/%%f
    echo rotterdam-rijnmond
    call ogr2ogr -clipsrc ../csweb/data/projects/rotterdam-rijnmond/clip.geojson    	-f GeoJSON ../csweb/data/projects/rotterdam-rijnmond/%%f 	clip/%%f
    echo twente
    call ogr2ogr -clipsrc ../csweb/data/projects/twente/clip.geojson                	-f GeoJSON ../csweb/data/projects/twente/%%f 				clip/%%f
    echo utrecht
    call ogr2ogr -clipsrc ../csweb/data/projects/utrecht/clip.geojson             		-f GeoJSON ../csweb/data/projects/utrecht/%%f 				clip/%%f
    echo zaanstreek-waterland
    call ogr2ogr -clipsrc ../csweb/data/projects/zaanstreek-waterland/clip.geojson      -f GeoJSON ../csweb/data/projects/zaanstreek-waterland/%%f 	clip/%%f
    echo zeeland
    call ogr2ogr -clipsrc ../csweb/data/projects/zeeland/clip.geojson 					-f GeoJSON ../csweb/data/projects/zeeland/%%f 				clip/%%f
    echo zuid-holland-zuid
    call ogr2ogr -clipsrc ../csweb/data/projects/zuid-holland-zuid/clip.geojson 		-f GeoJSON ../csweb/data/projects/zuid-holland-zuid/%%f 	clip/%%f
    echo zuid-limburg
    call ogr2ogr -clipsrc ../csweb/data/projects/zuid-limburg/clip.geojson 			    -f GeoJSON ../csweb/data/projects/zuid-limburg/%%f 			clip/%%f
    echo zuidoost-brabant
    call ogr2ogr -clipsrc ../csweb/data/projects/zuidoost-brabant/clip.geojson 		    -f GeoJSON ../csweb/data/projects/zuidoost-brabant/%%f 		clip/%%f
)
