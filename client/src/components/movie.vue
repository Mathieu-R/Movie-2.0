<template>
  <div>
    <a href="#" class="movie-trigger">
		  <img :src="'http://image.tmdb.org/t/p/w500' + movie.poster_path" alt="movie-preview">
    </a>

    <div class="quick-view">

      <a href="#" class="quick-view-close">X</a>

  		<img :src="{{getPoster(movie.poster_path)}}" alt="poster" class="quick-view-poster">

      <div class="quick-view-info">
        <h2>{{movie.title}}</h2>
        <h3 class=quick-view-title>{{movie.original_title}} - {{movie.original_language}} - {{movie.release_date | date: 'dd/MM/yyyy'}}</h3>
        <p class="quick-view-note"></p>
        <ul class="quick-view-genres">
          <li v-for="genre in genres">#{{genre.name}}</li>
        </ul>
        <p class="quick-view-description">{{movie.overview}}</p>
        <section class="quick-view-trailer" >
          <a :href="'http://www.youtube.com/watch?v=' + movie.trailer"></a>
        </section>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    methods: {
      quickView() {
        // Expand view,...

        fetch("/trailer", {
          method: POST,
          id: id
        })
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
    }

  }
</script>

<style>

</style>
