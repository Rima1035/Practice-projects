 
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
          <div class="price">$${product.priceCent/100}</div>
          <div class="quantity">
            <select>
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
          </div>
          <button class="add-to-cart">Add to Cart</button>
        </div>`
} ) ;
  
console.log(productHtml);

document.querySelector('.js-main-product').innerHTML = productHtml;