const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    products: [],
    imgCatalog: 'https://placehold.it/200x150',
    cartUrl: '/getBasket.json',
    imgCart: 'https://placehold.it/50x100',
    cart: [],
    filtered: [],
    searchLine: '',
    isVisibleCart: false,
  },
  methods: {
    getJson(url){
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        }),
    },

    filterGoods() {
      let regExp = new RegExp(this.searchLine, 'i');
      this.filtered = this.products.filter(product => regExp.test(product.product_name));
      this.products.forEach(el => {
        const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
        if(!this.filtered.includes(el)){
          block.classList.add('invisible');
        } else {
          block.classList.remove('invisible');
        }
      });
    },

    addProduct(product){
      this.getJson(`${API}/addToBasket.json`)
        .then(data => {
          if(data.result === 1){
            let find = this.cart.find(item => item.id_product === product.id_product);
            if(find) {
              find.quantity++;
            } else {
              let obj = {...product};
              obj.quantity = 1;
              this.cart.push(obj);
            }
          } else {
            alert('Error');
          }
        });
      // console.log(this.cart);
    },

    removeProduct(product){
      this.getJson(`${API}/deleteFromBasket.json`)
        .then(data => {
          if(data.result === 1){
            let find = this.cart.find(item => item.id_product === product.id_product);
            if(find.quantity > 1) {
              find.quantity--;
            } else
              this.cart.splice(this.cart.indexOf(find), 1);
          } else {
            alert('Error');
          }
        });
      // console.log(this.cart);
    },
  },
  
  mounted(){
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for(let el of data){
          this.products.push(el);
        }
      });

    this.getJson(`${API + this.cartUrl}`)
      .then(data => {
        for(let el of data.contents){
          this.cart.push(el);
        }
      });
  },
});
