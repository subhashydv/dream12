#! /bin/bash

node fetchData.js
node generateHtml.js
open index.html

read -p "Whom do You want to bet : " userInput

node dream12.js ${userInput}

open index.html