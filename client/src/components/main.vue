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
    <movies :movies="movies"></movies>
  </div>
</template>

<script>
  import movies from "./movies"

  export default {
    data() {
      return {
        search: '',
        movies: []
      }
    },
    components: { movies },
    methods: {
      topMovie () {
        fetch('/api/top')
          .then((response) => {
            console.log(response.json());
          })
          .then((data) => {
            console.log(data);
          })
          .catch(e => {
            console.log("ERROR: Top movies not received");
            console.log(e);
          })
      },

      theatersMovie () {
        fetch('/api/theaters')
          .then((response) => {
            console.log(response.json());
          })
          .then((data) => {
            $(".titre").text("La liste des films actuellement au cinéma n'a pu être trouvée !")
          })
          .catch((e) => {
            console.log("ERROR: Film in theaters not received")
            console.log(e);
          })
      },

      searchMovie () {
        fetch("/api/query", {
          method: POST,
          body: {search: this.search}
        })
          .then((response) => {
            console.log(response.json())
          })
          .then((data) => {
            console.log(data)
          })
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
          console.log(response.json())
        })
        .then((data) => {
          console.log(data)
        })
        .catch((e) => {
          throw new Error(e);
        })
    }

  }
</script>

<style scoped>
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

  .menu > ul > li > a {
    text-decoration: none;
    color: black;
  }

  #fixChamps {
    align-items: center;
  }
</style>
