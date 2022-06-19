import db from '../../datastore';

export default {
  namespaced: true, //uncomment if want to use like this.$store.dispatch('settings/updateMenuActiveness', menu)
  state: {
    menu: [
      // {
      //   name: "case",
      //   title: "Text Case",
      //   isActive: true,
      // },
      // {
      //   name: "mutator",
      //   title: "Duplication Mutator",
      //   isActive: true,
      // },
      // {
      //   name: "query",
      //   title: "Query Builder",
      //   isActive: true, 
      // }
    ],
  },
  mutations: {
    SET_MENU(state, menu){
      state.menu = menu;
    },
    SET_MENU_ACTIVENESS(state, menu){
      state.menu.find((menuItem) => menuItem.name === menu.name).is_active = menu.is_active;
    }
  },
  actions: {
    setMenus({ commit }){
      let menu = [];

      db.all("SELECT * FROM menu", [], (err, rows) => {
        if(err) return console.log(err.message);
        rows.forEach((row) => {
          menu.push(row);
        })
      })

      commit('SET_MENU', menu);
    },
    updateMenuActiveness({ commit }, menu){
      db.run("UPDATE menu SET is_active = ? WHERE name = ?", 
      [menu.is_active, menu.name], 
      (err, rows) => {
        if(err) return console.log(err.message);

        commit('SET_MENU_ACTIVENESS', menu);
      })
    }
  },
  getters: {
    activeMenus: state => state.menu.filter((menu) => menu.is_active === 1),
    allMenus: state => state.menu,
  }
}