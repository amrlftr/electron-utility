export default {
  // namespaced: true, //uncomment if want to use like this.$store.dispatch('settings/updateMenuActiveness', menu)
  state: {
    menu: [{
        name: "case",
        title: "Text Case",
        isActive: true,
      },
      {
        name: "mutator",
        title: "Duplication Mutator",
        isActive: true,
      },
      {
        name: "query",
        title: "Query Builder",
        isActive: false,
      }
    ]
  },
  mutations: {
    SET_MENU_ACTIVENESS(state, targetMenu){
      //find the targeted menu and set it's isActive to the inverse of itself
      state.menu.find((menu) => menu.name === targetMenu.name).isActive = !targetMenu.isActive
    }
  },
  actions: {
    updateMenuActiveness({ commit }, menu){
      commit('SET_MENU_ACTIVENESS', menu)
    }
  },
  getters: {
    activeMenus: state => {
      return state.menu.filter((menu) => menu.isActive === true)
    }
  }
}