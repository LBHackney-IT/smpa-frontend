<template>
  <header class="govuk-header " role="banner" data-module="header">
    <div class="govuk-header__container govuk-width-container">
      <div class="govuk-header__logo">
        <a href="/" class="govuk-header__link govuk-header__link--homepage">
          <img class="hackney-logo" src="../assets/img/hackney_logo.png" alt="Hackney council logo." />
        </a>
      </div>

      <div class="govuk-header__content">
        <a href="/" class="govuk-header__link govuk-header__link--service-name">
          Submit my planning application
        </a>
        
        <button type="button" role="button" class="govuk-header__menu-button js-header-toggle" aria-controls="navigation" aria-label="Show or hide Top Level Navigation">Menu</button>
        <nav>
          <ul id="navigation" class="govuk-header__navigation " aria-label="Top Level Navigation">
            <li class="govuk-header__navigation-item" v-if="this.isUserAuthenticated">
              <a class="govuk-header__link" href="/account">
                Account
              </a>
            </li>
            <li class="govuk-header__navigation-item" v-if="!this.isUserAuthenticated">
              <a class="govuk-header__link" href="/sign-in">
                Sign in
              </a>
            </li>
            <li class="govuk-header__navigation-item" v-if="this.isUserAuthenticated">
              <a class="govuk-header__link" href="/sign-out">
                Sign out
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="hackney-brand__lines">
      <div class="hackney-brand__lines--DarkGreen"></div>
      <div class="hackney-brand__lines--GreenLine"></div>
      <div class="hackney-brand__lines--LightGreen"></div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
    }
  },
  computed: {
    isUserAuthenticated() {
      return this.$store.state.state.isAuthenticated;
    }
  }
}
</script>