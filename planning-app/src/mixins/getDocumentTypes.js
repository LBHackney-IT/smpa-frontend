import store from '../store';

export const getDocumentTypes = {
  data () {
    return {
      documentTypes: undefined,
    }
  },
  created () {
    this.returnDocumentTypes();
  },
  methods: {
    returnDocumentTypes () {
      if (!store.state.state.documentTypes) {
        this.$store.dispatch('getDocumentTypes').then(() => {
          this.documentTypes = store.state.state.documentTypes;
        })
      } else {
        this.documentTypes = store.state.state.documentTypes;
      }
    }
  }
}