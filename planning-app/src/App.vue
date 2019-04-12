<template>
  <div id="app" class="govuk-template__body">
    <Header msg="Header"/>
    <div class="govuk-width-container main-content-wrapper">
      <div class="govuk-phase-banner">
        <p class="govuk-phase-banner__content"><strong class="govuk-tag govuk-phase-banner__content__tag ">
        beta
      </strong>
          <span class="govuk-phase-banner__text">
            This is a new service – your
            <a class="govuk-link" href="#">feedback</a> will help us to improve it.
          </span>
        </p>
      </div>
      <main class="govuk-main-wrapper " id="main-content" role="main">
        <router-view></router-view>
      </main>
    </div>

    <Footer msg="Footer"/>
  </div>
</template>

<style>
  @import "https://unpkg.com/leaflet@1.3.4/dist/leaflet.css";
</style>

<script>
  import Header from './components/Header.vue'
  import Footer from './components/Footer.vue'
  // import { initAll } from 'govuk-frontend';

  const el = document.body;
  el.classList.add('js-enabled');
  // setTimeout(() =>{

  //   initAll();
  // },1000)

  export default {
    name: 'app',
    components: {
      Header,
      Footer
    }
  }
</script>

