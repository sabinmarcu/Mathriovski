var express = require("express"),
	app = express.createServer()

app.configure(function(){
	app.use(express.static(__dirname + "/app"));
})

app.listen(process.env.PORT || 8080);
