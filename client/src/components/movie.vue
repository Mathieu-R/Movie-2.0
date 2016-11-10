<template>
  <div>

    <section class="movie-preview">
      <a href="#" class="movie-preview-link" @click.prevent="showQuickView(movie.id)">
        <img :src="'http://image.tmdb.org/t/p/w500' + movie.poster_path" alt="movie-preview-poster" class="movie-poster">
      </a>
      <h3 class="movie-preview-title">{{ movie.original_title }}</h3>
      <div class="movie-preview-note">
        {{ movie.note_average }}
      </div>
    </section>

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
        quickView: false
      }
    },
    methods: {
      showQuickView(id) {
        this.quickView = false;
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
      }
    }

  }
</script>

<style>

.movie-preview {
  padding: 5px;
  background: gray;
  border-radius: 5px;
  width: 275px;
  color: #fff;
  text-align: center;
}

.movie-poster {
  height: 400px;
}

.quick-view-poster {
  height: 500px;
}

.movie-preview-poster {
    opacity: 1;
    transition: .2s opacity linear;
}

.movie-preview-poster:hover {
  opacity: 0.7;
}

</style>
