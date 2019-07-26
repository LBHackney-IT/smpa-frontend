import store from '../store';

export const getDocumentSizes = {
  data () {
    return {
      documentSizes: undefined,
    }
  },
  created () {
    this.returnDocumentSizes();
  },
  methods: {
    returnDocumentSizes () {
      if (!store.state.state.documentSizes) {
        this.$store.dispatch('getDocumentSizes').then(() => {
          this.documentSizes = store.state.state.documentSizes;
        })
      } else {
        this.documentSizes = store.state.state.documentSizes;
      }
    }
  }
}