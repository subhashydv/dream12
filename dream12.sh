#! /bin/bash

node dataGenerator/generateData.js
node dataGenerator/setUpGame.js

rm ./html/result.html
open ./html/index.html

read -p "Whom do You want to bet : " userInput

node dataGenerator/game.js ${userInput}
open ./html/index.html