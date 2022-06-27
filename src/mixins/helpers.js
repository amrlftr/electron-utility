export default {
  mounted() {
    //console.log('mounted')
  },
  methods: {
    clearObject(object) {
      for (let key in object) {
        // eslint-disable-next-line no-prototype-builtins
        if (object.hasOwnProperty(key)) {
          if (typeof object[key] === 'string') {
            if (isNaN(Number(object[key])))
              object[key] = '';
            else
              object[key] = null;
          } else if (object[key] instanceof Array) {
            object[key] = [];
          } else if (typeof object[key] === 'number' || typeof object[key] === 'boolean') {
            object[key] = null;
          }
        }
      }
    },
  }
}
