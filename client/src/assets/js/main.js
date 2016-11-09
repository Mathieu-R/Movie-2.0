var movie = angular.module('movie', [
									]);

movie.service('trailer', ["$sce", function($sce) {

	var getTrailer = function(url) {
		var link = 'http://www.youtube.com/watch?v=' + url;
		var type = "video/mp4";
		return {src: link, type: type};
	}

	return {
		getTrailer: getTrailer
	}

}])

movie.controller('mainCtrl', function($scope, $http, $log, $sce, trailer){


	$scope.getPoster = function getPoster(poster) {
		return $sce.trustAsResourceUrl('http://image.tmdb.org/t/p/w500' + poster);
	}

	// $scope.getTrailer = function getTrailer(url) {
	// 	return $sce.trustAsResourceUrl('http://www.youtube.com/watch?v=' + url);
	// }

	$scope.testEnter = function testEnter(e) {
		if (e.keyCode == 13) $scope.searchMovie($scope.search);
	}

	$scope.topMovie = function topMovie() {

		$scope.loader = true;
		$scope.movies = {};

		$http.get('/top')
			.success(function(data) {
				$scope.movies = data.results;
			})
			.error(function(err) {
				$log.log("ERROR: Top Movies not received")
				$log.warn(err);
				$(".titre").text("La liste des meilleurs films n'a pu être trouvée !")
			})
			.then(function() {
				$scope.loader = false;
			})

	}

	$scope.theatersMovie = function theatersMovie() {

		$scope.loader = true;
		$scope.canvas = false;
		$scope.movies = {};
		$scope.movie = {};

		$http.get('/theaters')
			.success(function(data) {
				$scope.movies = data.results;
			})
			.error(function(err) {
				$log.log("ERROR: Film in theaters not received")
				$log.warn(err);
				$(".titre").text("La liste des films actuellement au cinéma n'a pu être trouvée !")
			})
			.then(function() {
				$scope.loader = false;
			})
	}

	$scope.searchMovie = function searchMovie(movie) {

		$scope.loader = true;
		$scope.canvas = false;
		$scope.movies = {};

		$http.post("/query", {search: movie})
			.success(function(data) {
				$scope.movies = data.results;
				// console.log(data.results);
			})
			.error(function(err) {
				$log.log("ERROR: Movie data not received")
				$log.warn(err);
				$(".titre").text("Film non trouvé !")
			})
			.then(function() {
				$scope.loader = false;
			})
	}

	$scope.getDetails = function getDetails(e, id) {

		$scope.canvas = false;
		$scope.genres = {};

		$http.post("/details", {id: id})
			.success(function(data) {
				$scope.details = data;
			})
			.error(function(err) {
				$log.log("ERROR: Movie genres not received")
				$log.warn(err);
			})
	}

	$scope.getTrailer = function getTrailer(id) {

		$scope.canvas = false;
		$scope.trailer = {};

		var movie = $("#" + id);
		var height = movie.outerHeight(); // Hauteur de la section .movie
		var width = movie.outerWidth(); // Largeur de la section .movie
		var top = movie.offset().top; // Récupère la position de la section .movie par rapport au top
		var left = movie.offset().left; // Récupère la position de la section .movie par rapport au left

		// console.log('height: ' + height, 'width: ' + width, 'top: ' + top, 'left: ' + left);

		$('.trailer').css({height: height, width: width, top: top, left: left}) // Ajout au css


		$http.post("/trailer", {id: id})
			.success(function(data) {
				$scope.trailer = data.youtube;
				// console.log(data);
			})
			.error(function(err) {
				$log.log("ERROR: Movie trailer not received")
				$log.warn(err);
				$(".titre").text("Trailer non trouvé !")
			})
			.then(function() {
				var url = $scope.trailer[0].source;
				$scope.config.sources[0] = trailer.getTrailer(url);
				$scope.showTrailer = true;
			})
	}
})
