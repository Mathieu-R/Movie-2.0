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
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .movie {
    margin: 15px;
  }


</style>
