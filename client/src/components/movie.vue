<template>
  <div>

    <section class="movie-preview">
      <a href="#" class="movie-preview-link" >
        <img :src="'http://image.tmdb.org/t/p/w500' + movie.poster_path" alt="movie-poster" class="movie-preview-poster" @click.prevent="showQuickView(movie.id)">
      </a>
      <h3 class="movie-preview-title">{{ movie.original_title }}</h3>
      <span class="movie-preview-note">
        {{ movie.vote_average }}
      </span>
    </section>

    <div class="quick-view" v-if="quickView">

      <a href="#" class="quick-view-close" @click.prevent="closeQuickView">X</a>

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
        console.log("view");
        this.quickView = true;
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
      },
      closeQuickView() {
        this.quickView = false;
      }
    }

  }
</script>

<style>

.movie-preview {
  padding: 10px 5px;
  background: #afafaf;
  border-radius: 5px;
  width: 275px;
  color: #fff;
  text-align: center;
}

.quick-view-poster {
  height: 500px;
}

.movie-preview-poster {
  height: 400px;
  opacity: 1;
  transition: .2s opacity linear;
}

.movie-preview-poster:hover {
  opacity: 0.7;
}

.movie-preview-title {
  margin: 10px;
}

.movie-preview-note {
  border: 2px solid lightgray;
  padding: 2px 5px;
  border-radius: 5px;
  margin-bottom: 3px;
}

.quick-view {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f2dd82;
  padding: 15px;
  overflow: hidden;
}

.quick-view-close {
  position: absolute;
  top: 5px;
  right: 10px;
  font-size: 3vh;
  font-weight: bold;
  color: gray;
}

</style>
