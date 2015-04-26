var path = require("path");

var Sealious = require("sealious");


var mode = process.argv[2]==undefined? "local": "distibuted";
var layer_name = process.argv[3];


var app = new Sealious.App(path.resolve(__dirname, "./package.json"), mode, layer_name);

var www_server = app.ChipManager.get_chip("channel", "www_server");

var firma = new Sealious.ChipTypes.ResourceType("firma");

firma.add_fields([
	{name: "nazwa", type: "text", required: "true", params:{max_length:6}},
	{name: "logo", type: "text", required: "true"}
]);


var stoisko = new Sealious.ChipTypes.ResourceType("stoisko");

stoisko.add_fields([
	{name: "nazwa", type: "text", required: "true"},
	{name: "kolor", type: "color", required: "true"},
	{name: "firma", type: "reference", required: false, params:{allowed_types:["firma"]}}
]);

var form_entry = new Sealious.ChipTypes.ResourceType("form_entry");	

form_entry.add_fields([
	{name: "first-name", type: "text", required: true, params: {max_length: 5}},
	{name: "last-name", type: "text", required: true},
	{name: "PESEL", type: "text", required: true},
	{name: "favorite-color", type: "color"},
	{name: "stoisko", type: "reference", required: true, params:{allowed_types:["stoisko"]}}
])

var no_html = new Sealious.ChipTypes.ResourceType("no_html");	

no_html.add_fields([
	{name: "text", type: "text", required: true, params: {strip_html: true}},
])

var rest = app.ChipManager.get_chip("channel", "rest");

rest.add_path("/api/v1/form_entry", "form_entry");
rest.add_path("/api/v1/stoiska", "stoisko");
rest.add_path("/api/v1/firmy", "firma");
rest.add_path("/api/v1/no_html", "no_html");

www_server.static_route(path.resolve( __dirname, "./public"), "");

app.start();

