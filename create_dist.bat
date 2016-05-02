if exist "dist" rd /q /s "dist"
md dist
copy index.html dist
xcopy /S color dist\color\
xcopy /S css dist\css\
xcopy /S font-awesome dist\font-awesome\
xcopy /S fonts dist\fonts\
xcopy /S img dist\img\
xcopy /S js dist\js\
xcopy /S csweb\app\*.js dist\csweb\app\
xcopy /S csweb\bower_components\angularUtils-pagination dist\csweb\bower_components\angularUtils-pagination\
xcopy /S csweb\bower_components\csweb\dist-bower dist\csweb\bower_components\csweb\dist-bower\
xcopy /S csweb\bower_components\font-awesome\fonts dist\csweb\bower_components\font-awesome\fonts\
xcopy /S csweb\bower_components\font-awesome\css dist\csweb\bower_components\font-awesome\css\
xcopy /S csweb\css dist\csweb\css\
xcopy /S csweb\data dist\csweb\data\
xcopy /S csweb\images dist\csweb\images\
xcopy /S csweb\js dist\csweb\js\
copy csweb\favicon.ico dist\csweb\
copy csweb\index.html dist\csweb\
copy csweb\m.html dist\csweb\
copy csweb\mode-json.js dist\csweb\
