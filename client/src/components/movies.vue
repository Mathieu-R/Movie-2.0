<template>
  <div class="movies">
    <movie v-for="movie in movies" class="movie"></movie>
  </div>
</template>

<script>

  import Movie from './components/movie'

  export default {
    components: {Movie},
    mounted: {
      fetch('/')
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

<style>
  .movies {
    display: inline-flex;
  }

  movie {
    margin: 15px;
  }
</style>
