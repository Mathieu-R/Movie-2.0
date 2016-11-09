<template>
  <div>
    <header class="header">
			<nav class="menu">
				<ul>
					<li><a href="">Home</a></li>
					<li><a @click="topMovie" href="#">Top</a></li>
					<li @click="theatersMovie"><a href="#">Films actuellements au cinéma</a></li>
					<li id="fixChamps"><input type=text v-model=search class="search" placeholder="Recherche..." @click.prevent="searchMovie"></li>
				</ul>
			</nav>
		</header>
  </div>
</template>

<script>
  export default {
    data: {
      return {
        search: ''
      }
    },
    methods: {
      topMovie() {
        fetch('/top')
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
      },

      theatersMovie() {
        fetch('/theaters')
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
      },

      searchMovie() {
        fetch("/query", {
          method: POST,
          search: movie
        })
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
    }

  }
</script>

<style>

</style>
