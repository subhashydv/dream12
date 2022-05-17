#! /bin/bash

cd dataGenerator/
node generateData.js
cd ..
node gameStarter.js
rm ./html/result.html
open ./html/index.html

read -p "Whom do You want to bet : " userInput

node game.js ${userInput}
open ./html/index.html