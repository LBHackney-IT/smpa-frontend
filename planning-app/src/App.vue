<template>
  <div id="app">
    <Header msg="Header"/>
    <router-view></router-view>
    <Footer msg="Footer"/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'app',
  components: {
    Header,
    Footer
  }
}
</script>

