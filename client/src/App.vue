<template>
  <div class="main">
    <header></header>
    <movies></movies>
  </div>
</template>

<script>
import Header from './components/header'
import Movies from './components/movies'

export default {
  name: 'movie',
  components: { Header, Movies }
}
</script>

<style>
  main {

  }
</style>
