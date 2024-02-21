document.addEventListener('DOMContentLoaded', function(){
    fetchProduct('https://api.noroff.dev/api/v1/square-eyes');
    let products = document.querySelector('.products');
    let basketCount = document.getElementById('basket-count');
    let basket = JSON.parse(localStorage.getItem('basket')) || [];

    async function fetchProduct(url) {
        let data = await fetch(url);
        let response = await data.json();

        displayProducts(response);
        
        // Add event listeners to genre links
        document.querySelectorAll('.catagory ul li a').forEach(link => {
            link.addEventListener('click', async function(e) {
                e.preventDefault();
                let genre = this.textContent.toLowerCase();
                let filteredMovies = response.filter(movie => movie.genre.toLowerCase() === genre);
                displayProducts(filteredMovies);
            });
        });

        // Add event listener to "Show All" link
        document.querySelector('.catagory ul li a').addEventListener('click', function(e) {
            e.preventDefault();
            displayProducts(response);
        });
    };

    // Display all movies from API in home page! 
    function displayProducts(productsArray) {
        products.innerHTML = '';
        for (let i = 0; i < productsArray.length; i++) {
            let description = productsArray[i].description;
            products.innerHTML += `
                <div class="product">
                    <a href="movie.html?id=${productsArray[i].id}" class="movie-link">
                        <img src="${productsArray[i].image}" alt="" class="product-img">
                    </a>
                    <div class="product-content">
                        <h2 class="product-title">${productsArray[i].title}</h2>
                        <h4 class="product-catagory">${productsArray[i].genre}</h4>
                        <p class="product-description">${description.length > 80 ? description.substring(0,80).concat('...more') : description}</p>
                        <div class="product-price-container">
                            <h3 class="product-price">$${productsArray[i].price}</h3>
                            <a href="#!" data-productId="${productsArray[i].id}" class="add-to-cart">Add To Cart</a>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    // Update basket count displayed in the navbar
    function updateBasketCount() {
        basketCount.textContent = basket.length;
    }

    // Call updateBasketCount initially to set the count correctly
    updateBasketCount();

    // Add event listener to basket icon to navigate to checkout page
    document.querySelector('.basket-icon').addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'checkout.html';
    });

    // Add event listener to add-to-cart buttons
    products.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            e.preventDefault();
            let productId = e.target.dataset.productId;
            addToBasket(productId);
        }
    });

    // Function to add item to the basket
    function addToBasket(productId) {
        if (!basket.includes(productId)) {
            basket.push(productId);
            localStorage.setItem('basket', JSON.stringify(basket));
            updateBasketCount();
        }
    }

    // Fetch and display products when the page loads
    fetchAndDisplayProducts('https://api.noroff.dev/api/v1/square-eyes');
});