var Sealious = require("sealious");

var app = new Sealious.App(__dirname+"/package.json");

app.config({/*konfiguracja*/});

app.start();