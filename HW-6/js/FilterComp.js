Vue.component('filterComp', {
  data() {
    return {
      userSearch: '',
    }
  },

  methods: {

  },

  template: `
<!--      <div>-->
          <form action="#" class="search-form" @submit.prevent>
              <input type="text" class="search-field" v-model="userSearch">
              <button class="btn-search" type="submit" @click="$root.$refs.products.filter(userSearch)">
                  <i class="fas fa-search"></i>
              </button>
          </form>
<!--      </div>-->
  `

});