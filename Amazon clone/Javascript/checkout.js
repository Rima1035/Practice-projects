import { Cart } from "../Data/cart.js";
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
      ${options.id === "3" ? "checked" : ""}
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
                    Quantity: ${cartitems.Quantity}
                    <div class="update">Update</div>
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
    });
  });

//console.log(checkoutCart);
let itemstotal = 0;

checkoutCart.forEach((orderSummary) => {
  const totalcost = orderSummary.Price * orderSummary.Quantity;
  itemstotal += totalcost;
});

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

let Shippingtotal = calculateShipping();

console.log(Shippingtotal.toFixed(2));

console.log(itemstotal.toFixed(2));
