import {Cart} from '../Data/cart.js';

const savedCart = localStorage.getItem('cart');
const checkoutCart = JSON.parse(savedCart);

let checkout = ''; 

checkoutCart.forEach((cartitems)=> {
  checkout += `
      <div class="product-items  js-product-items">
            <div class="product-items-section1">
              Delivery date: Tuesday, June 21
            </div>
            <div class="product-items-section2">
              <div class="product-item-img">
                <img
                  src="${cartitems.Image}"
                  alt="${cartitems.Name}"
                />
              </div>
              <div class="product-item-details">
                <div class="product-items-text">
                 ${cartitems.Name}
                </div>
                <div class="product-items-price">$${cartitems.Price}</div>
                <div class="product-items-values">
                  ${cartitems.Quantity}
                  <div class="update">Update</div>
                  <div class="Delete">Delete</div>
                </div>
              </div>
              <div class="delivery-option">
                <div class="deliver-heading">Choose a delivery option:</div>
                <div class="shipping-days">
                  <input type="radio" name="delivery-option" />
                  <div class="delivery-price">
                    <div class="day">Tuesday, June 21</div>
                    <div class="price">FREE Shipping</div>
                  </div>
                </div>
                <div class="shipping-days">
                  <input type="radio" name="delivery-option" />
                  <div class="delivery-price">
                    <div class="day">Wednesday, June 15</div>
                    <div class="price">$4.99 - Shipping</div>
                  </div>
                </div>

                <div class="shipping-days">
                  <input type="radio" name="delivery-option" />
                  <div class="delivery-price">
                    <div class="day">Monday, June 13</div>
                    <div class="price">$9.99 - Shipping</div>
                  </div>
                </div>
              </div>
            </div>
          </div>`
}); 

document.querySelector('.js-product-items').innerHTML = checkout;