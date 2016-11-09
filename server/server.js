var http = require("http");
var express = require("express"); // Routes
var app = express();
var server = http.createServer(app);
var path = require("path"); // Join path
var logger = require("morgan"); // Logger
var parser = require("body-parser"); // Parse in JSON
var router = express.Router(); // Router (express 4.0)
var movie = require("moviedb")("bf1be22f2492cf5e3853650decfbedc3");


app.use(express.static("../client")); // Définition de la racine
app.use(parser.json()); // Parse JSON
app.use(parser.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(logger("dev")); // log
app.use("/", router); // Chemin de base

router.get("/", function (req,res) { 
  res.status(200);
  res.set({"content-type": "text/html; charset=utf-8"});
  res.sendFile("index.html", {root: path.join(__dirname, "../client")});
});

router.get("/top", function(req, res) {
	 movie.miscPopularMovies({language: 'fr'}, function(err, data){
	 	if (err) console.log("ERROR: Movie not found")
        else res.send(data)
    })
})

router.get("/theaters", function(req, res) {
	 movie.miscNowPlayingMovies({language: 'fr'}, function(err, data){
	 	if (err) console.log("ERROR: Movie not found")
        else res.send(data)
    })
})

router.post("/query", function(req, res) {
	var query = req.body.search;
	movie.searchMovie({query: query, language: 'fr'}, function(err, data) {
		if (err) console.log("ERROR: Movie not found");
		else res.json(data);
	})
})

router.post("/details", function(req, res) {
	var id = req.body.id;
	movie.movieInfo({id: id, language: 'fr'}, function(err, data){
		if (err) console.log("ERROR: Movie details not found")
        else res.send(data.genres)
    })
})

router.post("/trailer", function(req, res) {
	var id = req.body.id;
	movie.movieTrailers({id: id, language: 'fr'}, function(err, data){
	 	if (err) console.log("ERROR: Movie not found")
	    else res.send(data)
	})
})

app.on("error", function(error) { // Erreur
  console.log("Error :" + error.message);
  console.log(error.stack);
});

server.on("error", function(error) { // Erreur
    console.log("Error :" + error.message);
    console.log(error.stack);
});

server.listen(8081, function() { // Ecoute sur le port 8080
  console.log("Server running on port 8081");
});
