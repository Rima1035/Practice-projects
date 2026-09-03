
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOption } from "../Data/deliveryOptions.js";
//here first we are storing the items of cart in the savedCart variable and then adding those values in checkoutCart so our all the data is present in checkoutcart.
const savedCart = localStorage.getItem("cart");
const checkoutCart = JSON.parse(savedCart);
let checkout = "";

//here we first imported the dayjs library and then today means it stores the present day date.
const today = dayjs();
//here that date is getting formatted in dddd MMMM D in that format and then the date is present in updatedates variable.
const updatedates = today.format("dddd MMMM D");

//we wanted to display the data present in the checkoutcart in the checkout page so for that we looped through the checkoutcart
checkoutCart.forEach((cartitems) => {
  //here first we want to display the dates based on the delivery options?
  let deliveryhtml = "";
  //we imported the deliveryOption cart which is present in other page and it consist of id's delivery days and also based on this price? after importing we looped in this to get the data.
  deliveryOption.forEach((options) => {
    // here storing the date based days ex: if deliveryDays is 7 then adding +7 to today's date and if 3 so on.
    const changedates = today
      .add(options.deliveryDays, "days")
      .format("dddd, MMMM D");
    //here we are storing the price based on the delivery days if 7 days then free if 3 days then delivery charges are $4.99 and if 1 day then $9.99
    const price =
      options.priceCent === 0
        ? "FREE Shipping"
        : `$${(options.priceCent / 100).toFixed(2)} - Shipping`;
    //here we wrote the html in the js and then adding then adding the stored values of changedates and also the price on the webpage.
    deliveryhtml += `  
      <div class="shipping-days">
                    <input
      type="radio"
      name="delivery-option${cartitems.iD}"
      class="delivery-option-radiobutton"
      data-delivery-id="${options.id}"
     ${options.id === "1" ? "checked" : ""}
    />
                    <div class="delivery-price">
                      <div class="day">${changedates}</div>
                      <div class="price">${price}</div>
                    </div>
                  </div>`;
  });
  //here adding the image of the product and also the name + quantity + price from the checkoutcart which is added in the amazon.html page.
  checkout += `
        <div class="product-items  js-product-items js-delete-items" data-product-id="${cartitems.iD}">
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
                  <div class="product-items-price">$${cartitems.Price.toFixed(2)}</div>
                  <div class="product-items-values">
                  <div class="js-cartvariety">  Quantity: ${cartitems.Quantity} </div>
                    <div class="update js-update">Update</div>
                    <div class="Delete js-delete"
                    data-product-id="${cartitems.iD}">Delete</div>
                  </div>
                </div>
                <div class="delivery-option">
                  <div class="deliver-heading">Choose a delivery option:</div>
                    ${deliveryhtml}
                </div>
              </div>
            </div>`;
});

document.querySelector(".js-product-items").innerHTML = checkout;

// this is the code for the delete button
document.querySelectorAll(".js-delete").forEach((deletebutton) => {
  deletebutton.addEventListener("click", () => {
    const productId = deletebutton.dataset.productId;
    const finalproductsummary = checkoutCart.filter(function (deletevalue) {
      if (productId === deletevalue.iD) {
        return false;
      } else {
        return true;
      }
    });
    checkoutCart.length = 0;
    checkoutCart.push(...finalproductsummary);

    // Save the updated Cart
    localStorage.setItem("cart", JSON.stringify(checkoutCart));
    const productElement = deletebutton.closest(".js-product-items");
    productElement.remove();
     UpdateOrderSummary();
  });
});
// this is the code for the checkout quantity values.
let cartvalues = 0;
checkoutCart.forEach((cartval) => {
  cartvalues += cartval.Quantity;
});

document.querySelector(".js-checkoutquantity").innerHTML =
  `Checkout(<a class="items" href="amazon.html">${cartvalues} items</a>)`;

let radiobuttonId;
//Here this code is for the update in delivery dates
document
  .querySelectorAll(".delivery-option-radiobutton")
  .forEach((radiobutton) => {
    radiobutton.addEventListener("click", () => {
      radiobuttonId = radiobutton.dataset.deliveryId;
      deliveryOption.forEach((deliveryid) => {
        if (radiobuttonId === deliveryid.id) {
          const deliverydays = today.add(deliveryid.deliveryDays, "days");
          const formatedates = deliverydays.format("dddd MMMM D");
          const product = radiobutton.closest(".js-product-items");
          product.querySelector(".js-delivery-dates").innerHTML =
            `Delivery dates: ${formatedates}`;
        }
      });
      UpdateOrderSummary();
    });
  });

//console.log(checkoutCart);
function itemstotalvalue(){
   let itemstotal = 0;

checkoutCart.forEach((orderSummary) => {
  const totalcost = orderSummary.Price * orderSummary.Quantity;
  itemstotal += totalcost;
});
return itemstotal
}


//this is the code for selecting shipping price
function calculateShipping() {
  let Shippingtotal = 0;
  
  checkoutCart.forEach((orderSummary) => {
    const productId = orderSummary.iD;

    const productElement = document.querySelector(
      `.js-product-items[data-product-id="${productId}"]`,
    );

    const RadioOptions = productElement.querySelector(
      ".delivery-option-radiobutton:checked",
    );

    const selectedradiobutton = Number(RadioOptions.dataset.deliveryId);

    deliveryOption.forEach((getid) => {
      if (selectedradiobutton === Number(getid.id)) {
        const shippingpricevalues = getid.priceCent / 100;

        Shippingtotal += shippingpricevalues;
      }
    });
  });

  return Shippingtotal;
}

//here in this function we are updating the whole cart or the order summary values from static to the dynamic
function UpdateOrderSummary(){
     const itemstotal =  itemstotalvalue();
     const Shippingtotal = calculateShipping();
const totalvaluesbeforetax = itemstotal + Shippingtotal;
const tax = 477/100;
const totalaftertax = totalvaluesbeforetax + tax;    

 document.querySelector(".js-item-price").innerHTML =
    `$${itemstotal.toFixed(2)}`;

  document.querySelector(".js-shipping-price").innerHTML =
    `$${Shippingtotal.toFixed(2)}`;

  document.querySelector(".js-before-tax").innerHTML =
    `$${totalvaluesbeforetax.toFixed(2)}`;

  document.querySelector(".js-tax").innerHTML =
    `$${tax.toFixed(2)}`;

  document.querySelector(".js-order-total").innerHTML =
    `$${totalaftertax.toFixed(2)}`;

}

let orderSummarypagehtml = "";

orderSummarypagehtml += `
   
            <div class="order-details">
              <div class="order-text">Order Summary</div>
              <div class="order-shipping-details">
                <div class="items-values">
                  <span class="item-text">Items (${cartvalues}):</span>
                  <span class="item-price js-item-price">$0.00</span>
                </div>
                <div class="shipping-details">
                  <span class="shipping-text">Shipping & handling</span>
                  <span class="shipping-price js-shipping-price">$0.00</span>
                  
                </div>
              </div>
              <div class="including-tax">
                <div class="tax">
                 <span class="before-tax">Total before Tax:</span>
                   <span class="tax-price1 js-before-tax">$0.00</span> 
                </div>
                <div class="tax-values">
                <span class="Estimated-tax">Estimated tax (10%):</span>
                   <span class="tax-price js-tax">$0.00</span> 
                  </div>
              </div>
              </div>
              <div class="final-total">
               <div class="Total">Order total:
                 <span class="total-price js-order-total">$0.00</span> 
            </div>
            <button class="place-your-order">Place your order</button>
            </div>
            </div>
          
`;

document.querySelector(".order-summary").innerHTML = orderSummarypagehtml;

UpdateOrderSummary();


let updatequantityvariety = '';

updatequantityvariety = `<select class="js-quantity-selector">
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
            </select>` 

//Making the update button in the checkout page interactive 
document.querySelectorAll('.js-update').forEach((updatebutton) => {
     updatebutton.addEventListener('click', () => { 
       const selectedbutton = updatebutton.closest(".js-product-items");
    selectedbutton.querySelector('.js-cartvariety').innerHTML = `Quantity: ${updatequantityvariety}`;
   selectedbutton.querySelector('.js-update').innerHTML = `<button class="js-save">Save</button>`
     selectedbutton.querySelector(".js-save").addEventListener("click", () => {
      const selectedoption = selectedbutton.querySelector(
        ".js-quantity-selector"
      );

      const quantity = Number(selectedoption.value);

      selectedbutton.querySelector(".js-cartvariety").innerHTML =
        `Quantity: ${quantity}`;

      selectedbutton.querySelector(".js-update").innerHTML = "Update";
    });
  });
})