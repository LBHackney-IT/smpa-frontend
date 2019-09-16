<template>
  <header class="govuk-header " role="banner" data-module="header">
    <div class="govuk-header__container govuk-width-container">
      <div class="govuk-header__logo">
        <a href="/" class="govuk-header__link govuk-header__link--homepage">
            Submit my planning application
        </a>
      </div>
      <div class="govuk-header__content">
        
        <button type="button" role="button" class="govuk-header__menu-button js-header-toggle" aria-controls="navigation" aria-label="Show or hide Top Level Navigation">Menu</button>
        <nav>
          <ul id="navigation" class="govuk-header__navigation " aria-label="Top Level Navigation">

            <li class="govuk-header__navigation-item govuk-header__navigation-item--active">
              <a class="govuk-header__link" href="/">
                Home
              </a>
            </li>
            <li class="govuk-header__navigation-item" v-if="this.isUserAuthenticated">
              <a class="govuk-header__link" href="/account">
                Account
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