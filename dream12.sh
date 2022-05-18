#! /bin/bash

node src/generateData.js
node src/setUpGame.js

rm ./html/result.html
open ./html/index.html

read -p "Whom do You want to bet : " userInput

node src/game.js ${userInput}
open ./html/index.html