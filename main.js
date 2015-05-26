var path = require("path");

var Sealious = require("sealious");


var mode = process.argv[2]==undefined? "local": "distibuted";
var layer_name = process.argv[3];


Sealious.init(mode, layer_name);

var www_server = Sealious.ChipManager.get_chip("channel", "www_server");

var firma = new Sealious.ChipTypes.ResourceType("firma", {
	fields:[
		{name: "nazwa", type: "text", required: "true", params:{max_length:6}},
		{name: "logo", type: "text", required: "true"}
	]
});

var stoisko = new Sealious.ChipTypes.ResourceType("stoisko", {
	fields: [
		{name: "nazwa", type: "text", required: "true"},
		{name: "kolor", type: "color", required: "true"},
		{name: "firma", type: "reference", required: false, params:{allowed_types:["firma"]}}		
	]
});

var form_entry = new Sealious.ChipTypes.ResourceType("form_entry", {
	fields:[
		{name: "first-name", type: "text", required: true, params: {max_length: 5}},
		{name: "last-name", type: "text", required: true},
		{name: "PESEL", type: "text", required: true},
		{name: "favorite-color", type: "color"},
		{name: "stoisko", type: "reference", required: true, params:{allowed_types:["stoisko"]}}		
	]
});	

var no_html = new Sealious.ChipTypes.ResourceType("no_html", {
	fields: [
		{name: "text", type: "text", required: true, params: {strip_html: true}}
	]
});	

var date = new Sealious.ChipTypes.ResourceType("date", {
	fields: [
		{name: "date", type: "date", required: false},
		{name: "datetime", type: "datetime", required: true}		
	]
});

var simple_file = new Sealious.ChipTypes.ResourceType("simple_file", {
	fields: [
		{name: "plik", type: "file"},
		{name: "opis", type: "text"},
	]
});


var rest = Sealious.ChipManager.get_chip("channel", "rest");
rest.set_url_base("/api/v1");

www_server.static_route(path.resolve( __dirname, "./public"), "");

Sealious.start();

