import {Cart} from '../Data/cart.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOption} from '../Data/deliveryOptions.js';

const today = dayjs();
const updatedates = today.format('DD MM YYYY');

const savedCart = localStorage.getItem('cart');
const checkoutCart = JSON.parse(savedCart);

let checkout = ''; 

checkoutCart.forEach((cartitems)=> {
  checkout += `
      <div class="product-items  js-product-items js-delete-items ">
            <div class="product-items-section1">
              Delivery date: 
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
                <div class="product-items-price">$${(cartitems.Price).toFixed(2)}</div>
                <div class="product-items-values">
                  Quantity: ${cartitems.Quantity}
                  <div class="update">Update</div>
                  <div class="Delete js-delete"
                  data-product-id="${cartitems.iD}">Delete</div>
                </div>
              </div>
              <div class="delivery-option">
                <div class="deliver-heading">Choose a delivery option:</div>
                <div class="shipping-days">
                  <input type="radio" name="delivery-option${cartitems.iD}" class="delivery-option-radiobutton" data-delivery-id="1"/>
                  <div class="delivery-price">
                    <div class="day">Tuesday, June 21</div>
                    <div class="price">FREE Shipping</div>
                  </div>
                </div>
                <div class="shipping-days">
                  <input type="radio" name="delivery-option${cartitems.iD}"  class="delivery-option-radiobutton" data-delivery-id="2"/>
                  <div class="delivery-price">
                    <div class="day">Wednesday, June 15</div>
                    <div class="price">$4.99 - Shipping</div>
                  </div>
                </div>

                <div class="shipping-days">
                  <input type="radio" name="delivery-option${cartitems.iD}" class="delivery-option-radiobutton" data-delivery-id="3"/>
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

// this is the code for the delete button  
document.querySelectorAll('.js-delete').forEach(deletebutton => {
  deletebutton.addEventListener('click', ()=>{
    const productId = deletebutton.dataset.productId;
    const finalproductsummary = checkoutCart.filter(function(deletevalue){
        if(productId === deletevalue.iD){
          return false;
        }
        else{
          return true;
        }
    });
    checkoutCart.length = 0;
    checkoutCart.push(...finalproductsummary);

    // Save the updated Cart
    localStorage.setItem('cart', JSON.stringify(checkoutCart));
    const productElement = deletebutton.closest('.js-product-items');
    productElement.remove();
  })
}) 
// this is the code for the checkout quantity values.
let cartvalues = 0;
checkoutCart.forEach(cartval=> {
 cartvalues += cartval.Quantity;
});

document.querySelector('.js-checkoutquantity').innerHTML = `Checkout(<a class="items" href="amazon.html">${cartvalues} items</a>)`;
 
const addingdeliveryoptions = '';
//Here this code is for the update in delivery dates
document.querySelectorAll('.delivery-option-radiobutton').forEach(radiobutton => {
  radiobutton.addEventListener('click', () => {
    const radiobuttonId = radiobutton.dataset.deliveryId;
   deliveryOption.forEach(deliveryid => {
    if(radiobuttonId === deliveryid.id){
      const deliverydays = today.add(deliveryid.deliveryDays, 'days');
      const formatedates = deliverydays.format('dddd MMMM D');
    }
   })
  });
});