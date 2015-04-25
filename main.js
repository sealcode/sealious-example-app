var path = require("path");

var Sealious = require("sealious");


var mode = process.argv[2]==undefined? "local": "distibuted";
var layer_name = process.argv[3];


var app = new Sealious.App(path.resolve(__dirname, "./package.json"), mode, layer_name);

var www_server = app.ChipManager.get_chip("channel", "www_server");

var stoisko = new Sealious.ChipTypes.ResourceType("stoisko");

stoisko.add_fields([
	{name: "nazwa", type: "text", required: "true"},
	{name: "kolor", type: "color", required: "true"}
]);

var form_entry = new Sealious.ChipTypes.ResourceType("form_entry");	

form_entry.add_fields([
	{name: "first-name", type: "text", required: true, params: {max_length: 5}},
	{name: "last-name", type: "text", required: true},
	{name: "PESEL", type: "text", required: true},
	{name: "favorite-color", type: "color"},
	{name: "stoisko", type: "reference", params:{allowed_types:["stoisko"]}}
])

/*
form_entry.add_references([
   { name: "stoisko",
     allowed_types: ["stoisko"]
	}
]);
*/

var rest = app.ChipManager.get_chip("channel", "rest");

rest.add_path("/api/v1/form_entry", "form_entry");

www_server.static_route(path.resolve( __dirname, "./public"), "");

app.start();

