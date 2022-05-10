#! /bin/bash

cd dataGenerator/
node generateData.js
node generateHtml.js
open ../index.html

read -p "Whom do You want to bet : " userInput

node calculateStatistics.js ${userInput}
cd ..
open index.html