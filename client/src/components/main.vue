<template>
  <div>
    <header class="header">
			<nav class="menu">
				<ul>
					<li><a @click="topMovie" href="#">Top</a></li>
					<li @click="theatersMovie"><a href="#">Films actuellements au cinéma</a></li>
					<li id="fixChamps"><input type=text v-model=search class="search" placeholder="Recherche..." @click.prevent="searchMovie"></li>
				</ul>
			</nav>
		</header>
    <section class="loading-wrapper" v-show=loading>
        <div class="loading"></div>Fetching...
    </section>
    <movies :movies="movies">
    </movies>
  </div>
</template>

<script>
  import movies from "./movies"

  export default {
    data() {
      return {
        search: '',
        movies: [],
        loading: true
      }
    },
    components: { movies },
    methods: {
      topMovie () {
        fetch('/api/top')
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            return data;
          })
          .then(data => this.movies = data.results)
          .catch(e => {
            console.log("ERROR: Top movies not received");
            console.log(e);
          })
      },

      theatersMovie () {
        fetch('/api/theaters')
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            return data;
          })
          .then(data => this.movies = data.results)
          .catch((e) => {
            console.log("ERROR: Film in theaters not received")
            console.log(e);
          })
      },

      searchMovie () {
        fetch("/api/query", {
          method: "POST",
          body: {search: this.search}
        })
          .then((response) => {
            return response.json()
          })
          .then((data) => {
            return data
          })
          .then(data => this.movies = data.results)
          .catch((e) => {
            console.log("ERROR: Movie data not received")
            console.log(e);
          })
          .then(function() {
            this.search = "";
          })
      }
    },
    mounted () {
      //this.topMovies;
      fetch("/api/top")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          return data;
        })
        .then(data => this.movies = data.results)
        .catch((e) => {
          throw new Error(e);
        })
        .then(() => this.loading = false);
    }

  }
</script>

<style lang="scss">

  .loading-wrapper {
    font-family: Roboto;
    font-size: 3em;
    font-weight: bold;
    color: #afafaf;

    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .loading {
    position: relative;
    right: 20px;
    width: 6px;
    height: 0.7em;
    background: rgba(255, 255, 255, 0.1);
    animation: pulse 750ms infinite;
    animation-delay: 250ms;
  }

  .loading:before, .loading:after {
    content: '';
    position: absolute;
    display: block;
    height: 0.5em;
    width: 6px;
    background: rgba(255, 255, 255, 0.2);
    top: 50%;
    transform: translateY(-50%);
    animation: pulse 750ms infinite;
  }

  .loading:before {
    left: -12px;
  }

  .loading:after {
    left: 12px;
    animation-delay: 500ms;
  }

  @keyframes pulse {
    50% {background: gray;}
  }

  header {
    font-size: 1.5em;
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    background: #f1c40f;
  }

  .menu > ul {
    list-style: none;
    display: flex;
  }

  .menu > ul > li {
    padding: 0 20px;
    opacity: 0.5;
  }

  a {
    text-decoration: none;
    color: black;
  }

  #fixChamps {
    align-items: center;
  }

  .search {
    border-radius: 10px;
    border: none;
    outline: none;
    height: 25px;
    padding-left: 10px;
    font-family: Roboto;
    font-size: 0.7em;
  }
</style>
