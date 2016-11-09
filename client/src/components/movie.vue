<template>
  <div>
    <a href="#" class="movie-trigger" @click.prevent="quickView(movie.id)">
		  <img :src="'http://image.tmdb.org/t/p/w500' + movie.poster_path" alt="movie-preview" class="movie-poster">
    </a>

    <div class="quick-view" v-if="quickView">

      <a href="#" class="quick-view-close">X</a>

  		<img :src="'http://image.tmdb.org/t/p/w500' + movie.poster_path" alt="poster" class="quick-view-poster">

      <div class="quick-view-info">
        <h2>{{movie.title}}</h2>
        <h3 class=quick-view-title>{{movie.original_title}} - {{movie.original_language}} - {{movie.release_date}}</h3>
        <p class="quick-view-note"></p>
        <!--<ul class="quick-view-genres">
          <li v-for="genre in genres">#{{genre.name}}</li>
        </ul>-->
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
    props: {
      movie: Object
    },
    data () {
      return {
        quickView: true
      }
    },
    methods: {
      quickView(id) {
        // Expand view,...

        fetch("/api/trailer", {
          method: "POST",
          body: {id: id}
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            return data;
          })
          .then(data => this.movies = data.results)
          .catch((e) => {
            console.log("ERROR: Movie trailer not received");
            console.log(e);
          })
          //.then(_ => this.quickView = true);
      }
    }

  }
</script>

<style>

.movie-poster {
  height: 500px;
}

.quick-view-poster {
  height: 500px;
}

</style>
