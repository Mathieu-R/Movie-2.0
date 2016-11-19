<template>
  <div>

    <section class="movie-preview" :id="movie.id">
      <a href="#" class="movie-preview-link" >
        <img :src="'http://image.tmdb.org/t/p/w500' + movie.poster_path" alt="movie-poster" class="movie-preview-poster" @click.prevent="showQuickView(movie.id)">
      </a>
      <h3 class="movie-preview-title">{{ movie.original_title }}</h3>
      <span class="movie-preview-note">
        {{ movie.vote_average }}
      </span>
    </section>

    <transition name="zoom" v-on:before-enter="beforeEnter">
    <div class="quick-view" v-show="quickView">

      <div class="close" @click="closeQuickView">X</div>
      <div class="quick-view-trailer-wrapper">
        <section class="quick-view-trailer" >
          <a :href="'http://www.youtube.com/watch?v=' + trailerSRC" class="quick-view-trailer-link" v-if="!trailer" @click.prevent=showTrailer>
            <img role="presentation" src="../assets/img/trailer.jpg">
          </a>
          <iframe class="quick-view-trailer-player" :src="'http://www.youtube.com/embed/' + trailerSRC " v-if="trailer"></iframe>
        </section>
      </div>

      <div class="quick-view-info">
        <h2 class="quick-view-title">{{movie.title}}</h2>
        <h5 class=quick-view-subtitles>{{movie.original_title}} - {{movie.original_language}} - {{movie.release_date}} - <span class="movie-preview-note">{{movie.vote_average}}</span></h5>
        <div class="quick-view-subblock">
          <!--<img :src="'http://image.tmdb.org/t/p/w500' + movie.poster_path" alt="poster" class="quick-view-poster">-->
          <div class="quick-view-description">
            <p class="quick-view-description-p">{{movie.overview}}</p>
          </div>
        </div>
      </div>

    </div>
    </transition>

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
      beforeEnter(el) {
        const preview = document.getElementById(this.movie.id);
        const previewBCR = preview.getBoundingClientRect();

        const offsetTop = preview.offsetTop;
        const offsetView = previewBCR.top;
        const deplacement = offsetTop - offsetView - 55;

        console.log(offsetTop, offsetView);
        console.log(deplacement);

        el.style.transform = `translateY(${deplacement}px)`;

      },
      showQuickView(id) {

        document.body.style.overflow = 'hidden';
        document.body.classList.add('zooming');

        this.quickView = true;

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
        document.body.style.overflow = 'scroll';
        document.body.classList.remove('zooming');
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

body.zooming::before {
  opacity: 1;
  pointer-events: auto;
  z-index: 8;
}

body::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  opacity: 0;
  transition: opacity .2s linear;
  pointer-events: none;
}

.quick-view {
  position: absolute;
  top: 75px;
  left: 50px;
  right: 50px;
  bottom: 50px;
  height: 100%;
  background: #1e2328;
  padding: 15px;
  overflow: hidden;
  border-radius: 10px;
  opacity: 1;
  transform: scale(1);
  will-change: transform, opacity;
  z-index: 10;
  overflow: auto;
}

.zoom-enter, .zoom-leave-active {
  opacity: 0;
  transform: scale(0.5);
}

.zoom-enter-active, .zoom-leave-active {
  transition: opacity .2s linear, transform .5s cubic-bezier(0, 0, 0.3, 1);
}

.close {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 4vh;
  cursor: pointer;
}

.quick-view-trailer-wrapper {
  width: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
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
  max-height: 100%;
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
}

.quick-view-poster {

}

.quick-view-description {
  margin-left: 10px;
  padding: 5px;
  line-height: 1.5em;
}


</style>
