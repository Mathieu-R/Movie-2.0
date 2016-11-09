<template>
  <div class="movies">
    <movie :movie="movie" v-for="movie in movies" class="movie"></movie>
  </div>
</template>

<script>

  import Movie from './movie'

  export default {
    props: {
      movies: Array
    },
    components: { Movie },
  }

</script>

<style>
  .movies {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .movie {
    margin: 15px;
    flex: 1 0 auto;
    width: 25%;
    border-radius: 4px;
    opacity: 1;
    transition: .2s opacity linear;
  }

  .movie:hover {
    opacity: 0.7;
  }
</style>
