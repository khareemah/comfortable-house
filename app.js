const productDOM = document.querySelector(".products-center");
const cartDOM = document.querySelector(".cartDOM");
const cart = [];
let buttonsDOM = [];
class Products {
  async getProducts() {
    try {
      const result = await fetch("products.json");
      const data = await result.json();
      let products = data.items;
      products = products.map(item => {
        const { price, title } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return { price, title, id, image };
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

class UI {
  displayProducts(products) {
    let result = "";
    products.forEach(item => {
      result += `
      <article class="product">
      <div class="img-container">
      <img
      src=${item.image}
      alt="product-image"
      class="product-img"
      />
      <button class="bag-btn" data-id=${item.id}>
      <i class="fa fa-shopping-cart"></i>
      add to bag
      </button>
      </div>
      <h3>${item.title}</h3>
      <h4>$${item.price}</h4>
      </article>
      `;
    });
    productDOM.innerHTML = result;
  }
  getBagBtns() {
    let buttons = [...document.querySelectorAll(".bag-btn")];
    buttonsDOM = buttons;
    for (let button of buttons) {
      let id = button.dataset.id;
      let inCart = cart.find(item => (item.id = id));
      if (inCart) {
        button.textContent = "In Cart";
        button.disabled = true;
      }
      button.addEventListener("click", function(e) {
        button.innerHTML = "In Cart";
        button.disabled = true;
      });
    }
  }
}

class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
}
document.addEventListener("DOMContentLoaded", function() {
  const products = new Products();
  const ui = new UI();
  products
    .getProducts()
    .then(products => {
      ui.displayProducts(products);
      Storage.saveProducts(products);
    })
    .then(() => ui.getBagBtns());
});
