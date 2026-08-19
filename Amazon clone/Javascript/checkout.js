import {Cart} from '../Data/cart.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOption} from '../Data/deliveryOptions.js';

const today = dayjs();
const updatedates = today.format('dddd MMMM D');

const savedCart = localStorage.getItem('cart');
const checkoutCart = JSON.parse(savedCart);

let checkout = ''; 

checkoutCart.forEach((cartitems)=> {
let  deliveryhtml = '';

   deliveryOption.forEach(options=> {
  
  const changedates = today.add(options.deliveryDays, 'days').format('dddd, MMMM D');
  const price = options.priceCent === 0
    ? 'FREE Shipping'
    : `$${(options.priceCent / 100).toFixed(2)} - Shipping`;

    deliveryhtml += `  
     <div class="shipping-days">
                  <input type="radio" name="delivery-option${cartitems.iD}" class="delivery-option-radiobutton" data-delivery-id='${options.id}'/>
                  <div class="delivery-price">
                    <div class="day">${changedates}</div>
                    <div class="price">${price}</div>
                  </div>
                </div>`;
})


  checkout += `
      <div class="product-items  js-product-items js-delete-items">
            <div class="product-items-section1 js-delivery-dates">Delivery dates : ${updatedates}</div>
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
                  ${ deliveryhtml}
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
 

//Here this code is for the update in delivery dates
document.querySelectorAll('.delivery-option-radiobutton').forEach(radiobutton => {
  radiobutton.addEventListener('click', () => {
    const radiobuttonId = radiobutton.dataset.deliveryId;
   deliveryOption.forEach(deliveryid => {
    if(radiobuttonId === deliveryid.id){
      const deliverydays = today.add(deliveryid.deliveryDays, 'days');
      const formatedates = deliverydays.format('dddd MMMM D');
      const product = radiobutton.closest('.js-product-items');
      product.querySelector('.js-delivery-dates').innerHTML = `Delivery dates: ${formatedates}`;
    }
   })
  });
});