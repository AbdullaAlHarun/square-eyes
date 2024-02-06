document.addEventListener('DOMContentLoaded', function(){
    let products = document.querySelector('.products');
    async function fetchProduct(url) {
        let data = await fetch(url);
        let response = await data.json();

        for (let i = 0; i <response.length; i++){
            let description = response[i].description;
            products.innerHTML += `
        <div class="product">
            <img src="${response[i].image}" alt="" class="product-img">
           <div class="product-content">
                <h2 class="product-title">${response[i].title}</h2>
                <h4 class="product-catagory">${response[i].genre}</h4>
                <p class="product-description">${description.length > 80 ? description.substring(0,80).concat('...more') : description}</p>
                <div class="product-price-container">
                    <h3 class="product-price">$${response[i].price}</h3>
                    <a href="#!"  data-productId="${response[i].id}" class="add-to-cart">Add To Cart</a>
                </div>
           </div>
        </div>
        `;
        }
        
        
    };
    fetchProduct('https://api.noroff.dev/api/v1/square-eyes');
});