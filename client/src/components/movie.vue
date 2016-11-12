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

      <section class="quick-view-trailer" >
        <a :href="'http://www.youtube.com/watch?v=' + trailerSRC" class="quick-view-trailer-link" v-if="!trailer" @click.prevent=showTrailer>
          <img role="presentation" src="../assets/img/trailer.jpg">
        </a>
        <iframe class="quick-view-trailer-player" :src="'http://www.youtube.com/embed/' + trailerSRC " v-if="trailer"></iframe>
      </section>



      <div class="quick-view-info">
        <h2 class="quick-view-title">{{movie.title}}</h2>
        <h5 class=quick-view-subtitles>{{movie.original_title}} - {{movie.original_language}} - {{movie.release_date}} - <span class="movie-preview-note">{{movie.vote_average}}</span></h5>
        <div class="quick-view-subblock">
          <img :src="'http://image.tmdb.org/t/p/w500' + movie.poster_path" alt="poster" class="quick-view-poster">
          <div class="quick-view-description">
            <p class="quick-view-description-p">{{movie.overview}}</p>
          </div>
        </div>
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
        quickView: false,
        trailer: false,
        trailerSRC: ''
      }
    },
    methods: {
      showQuickView(id) {
        console.log(id);
        this.quickView = true;
        // Expand view,...

        fetch("/api/trailer", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({id: id})
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            return data;
          })
          .then(data => this.trailerSRC = data.youtube[0].source)
          .catch((e) => {
            console.log("ERROR: Movie trailer not received");
            console.log(e);
          })
      },
      showTrailer () {
        this.trailer = true;
      },
      closeQuickView() {
        this.quickView = false;
      }
    }

  }
</script>

<style>

h1, h2, h3 {
  margin: 10px;
}

img {
    max-width: 100%;
}

.movie-preview {
  padding: 10px 5px;
  background: #5e5f60;
  border-radius: 5px;
  width: 275px;
  color: #fff;
  text-align: center;
}

.quick-view-poster {
  height: 250px;
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
  width: 750px;
  background: #5e5f60;
  padding: 15px;
  overflow: hidden;
}

.quick-view-trailer {
  position: relative;
  max-width: 750px;
  min-height: 375px;
}

.quick-view-trailer-link {
  display: flex;
  position: relative;
  max-width: 750px;
  max-height: 375px;
}

.quick-view-trailer-link:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("../assets/img/play.svg") center center no-repeat;
  color: white;
}

.quick-view-trailer-link > img {
  width: 750px;
}

.quick-view-trailer-player {
  position: relative;
  min-width: 750px;
  min-height: 375px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.quick-view-info {
  margin-top: 10px;
  width: 100%;
  text-align: center;
}

.quick-view-subtitles {
  font-family: Montserrat;
  font-style: italic;
  border-bottom: 4px solid white;
  padding-bottom: 10px;
}

.quick-view-subblock {
  display: flex;
  flex-direction: row;
}

.quick-view-poster {

}

.quick-view-description {
  margin-left: 10px;
  padding: 5px;
  line-height: 1.5em;
}


</style>
