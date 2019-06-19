export const getRouteAppId = {
  data () {
    return {
      applicationId: undefined,
    }
  },
  created () {
    this.getRouteData();
  },
  watch: {
    '$route': 'getRouteData'
  },
  methods: {
    getRouteData () {
      this.applicationId = this.$route.params.applicationId;
    }
  }
}