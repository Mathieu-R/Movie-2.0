const express = require("express"); // Routes
const http = require("http");
const app = express();
const server = http.createServer(app);
const path = require("path"); // Join path
const logger = require("morgan"); // Logger
const parser = require("body-parser"); // Parse in JSON
const router = express.Router(); // Router (express 4.0)
const movie = require("moviedb")("bf1be22f2492cf5e3853650decfbedc3");

const port = 8080;

app.use(express.static("../client")); // Définition de la racine
app.use(parser.json()); // Parse JSON
app.use(parser.urlencoded({ extended: true }));
app.use(logger("dev")); // log
app.use("/", router); // Chemin de base

router.get("/", (req,res) => { 
	// SSR
});

router.get("/top", (req, res) => {
	 movie.miscPopularMovies({language: 'fr'}, (err, data) => {
	 	if (err) console.log("ERROR: Movie not found")
        else res.send(data)
    })
})

router.get("/theaters", (req, res) => {
	 movie.miscNowPlayingMovies({language: 'fr'}, (err, data) => {
	 	if (err) console.log("ERROR: Movie not found")
        else res.send(data)
    })
})

router.post("/query", (req, res) => {
	const query = req.body.search;
	movie.searchMovie({query: query, language: 'fr'}, (err, data) => {
		if (err) console.log("ERROR: Movie not found");
		else res.json(data);
	})
})

router.post("/details", (req, res) => {
	const id = req.body.id;
	movie.movieInfo({id: id, language: 'fr'}, (err, data) => {
		if (err) console.log("ERROR: Movie details not found")
        else res.send(data.genres)
    })
})

router.post("/trailer", (req, res) => {
	const id = req.body.id;
	movie.movieTrailers({id: id, language: 'fr'}, (err, data) => {
	 	if (err) console.log("ERROR: Movie not found")
	    else res.send(data)
	})
})

app.on("error", (error) => { // Erreur
  console.log("Error :" + error.message);
  console.log(error.stack);
});

server.on("error", (error) => { // Erreur
    console.log("Error :" + error.message);
    console.log(error.stack);
});

server.listen(port, () => { // Ecoute sur le port 8080
  console.log(`Server running on port ${port}`);
});
