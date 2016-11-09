<template>
  <div>
    <a href="#" class="movie-trigger" @click.prevent="quickView(movie.id)">
		  <img :src="'http://image.tmdb.org/t/p/w500' + movie.poster_path" alt="movie-preview">
    </a>

    <div class="quick-view">

      <a href="#" class="quick-view-close">X</a>

  		<img :src="'http://image.tmdb.org/t/p/w500' + movie.poster_path" alt="poster" class="quick-view-poster">

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
      quickView(id) {
        // Expand view,...

        fetch("/api/trailer", {
          method: POST,
          body: {id: id}
        })
          .then((response) => {
            console.log(response.json());
          })
          .then((data) => {
            console.log(data)
          })
          .catch((e) => {
            console.log("ERROR: Movie trailer not received");
            console.log(e);
          })
      }
    }

  }
</script>

<style>

</style>
