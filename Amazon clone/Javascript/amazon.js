
 import {Cart} from '../Data/cart.js';
 import {products} from '../Data/products.js';

let productHtml = '';

products.forEach((product) => {
   productHtml += `
    <div class="product">
          <img class="socks"
            src="${product.image}"
            alt="socks"
          />
          <div class="product-text">
           ${product.name}
          </div>
          <div class="rating">
            <img src="images/ratings/rating-${product.rating.stars * 10}.png" />
            <div class="rating-number">${product.rating.count}</div>
          </div>
          <div class="price">$${(product.priceCents/100).toFixed(2)}</div>
          <div class="quantity">
            <select class="js-quantity-selector">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
            <div class="js-added2"></div>
          </div>
          <button class="add-to-cart js-add-to-cart" 
          data-product-id="${product.id}"
          data-product-name="${product.name}"
          data-product-image="${product.image}"
          data-product-price="${product.priceCents}"
          >Add to Cart</button>
        </div>`
} ) ;
 
document.querySelector('.js-main-product').innerHTML = productHtml;

document.querySelectorAll('.js-add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
       const productID  = button.dataset.productId;
       const productNAME = button.dataset.productName;
       const productImage = button.dataset.productImage;
       const productPrice = Number(button.dataset.productPrice)/100;
       const productselect = button.parentElement; //this productselect constain all the parent elements of the button to access the specific class. 
       const selectOption = productselect.querySelector('.js-quantity-selector');
       const Qu = Number(selectOption.value);
//this is the code for finding if there are any same elements or not and if not the increase the quantity and also if there is then increase just the quantity 
       let Matchingitem;
       Cart.forEach(item => {
        if(productID === item.iD){
         Matchingitem = item;
        }
       });

       if(Matchingitem){
        Matchingitem.Quantity += 1;
       }
       else{
         Cart.push({
        iD : productID,
        Name : productNAME,
        Quantity : Qu, 
        Image: productImage, 
        Price : productPrice
       });
       }
       localStorage.setItem('cart', JSON.stringify(Cart));
      let cartquantity = 0;
      Cart.forEach(item => {
        cartquantity += item.Quantity;
      })

document.querySelector('.js-cartquantity').innerHTML = cartquantity;
 //this is the code for added right in the main web page
   let que = '';
               que += ` <div class="js-added css-added">
          <img src="images/icons/checkmark.png"/>
          <p>Added</p>
          </div>` 
        productselect.querySelector('.js-added2').innerHTML = que;

         setTimeout(function(){
        productselect.querySelector('.js-added2').innerHTML = '';
       },1000);
       
      
  })
})


 
