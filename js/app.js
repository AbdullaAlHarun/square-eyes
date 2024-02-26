// Function to fetch movie data from API
let products = document.querySelector('.products');

async function fetchMovies() {
    try {
        const response = await fetch('https://api.noroff.dev/api/v1/square-eyes');
        const data = await response.json();
        displayMovies(data); // Display movies after fetching
        // Add event listeners to genre links
        document.querySelectorAll('.catagory ul li a').forEach(link => {
            link.addEventListener('click', async function (e) {
                e.preventDefault();
                let genre = this.textContent.toLowerCase();
                let filteredMovies = data.filter(movie => movie.genre.toLowerCase() === genre);
                displayMovies(filteredMovies);
            });
        });
        // Add event listener to "Show All" link
        document.querySelector('.catagory ul li a').addEventListener('click', function (e) {
            e.preventDefault();
            displayMovies(data);
        });
        return data;
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

// Function to display movies on the webpage
async function displayMovies(movies) {
    const moviesContainer = document.getElementById('movies');
    moviesContainer.innerHTML = ''; // Clear previous content
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.innerHTML = `
        <div class="product">
            <a href="movie.html?id=${movie.id}" class="movie-link">
                <img src="${movie.image}" class="product-img">
            </a>
            <div class="product-content">
                <h2 class="product-title">${movie.title}</h2>
                <h2 class="product-catagory">${movie.genre}</h2>
                <div class="product-price-container">  
                    <h3 class="product-price">Price: $${movie.price}</h3>
                    <button class="add-to-cart" onclick="addToCart('${movie.title}', ${movie.price})">Add to Cart</button>
                </div>
            </div>
        </div>
        `;
        moviesContainer.appendChild(movieElement);
    });
    updateSelectedItemCount(); // Update selected item count after displaying movies
}

// Function to add a product to the basket
function addToCart(name, price) {
    const item = { name, price };
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateSelectedItemCount();
}

// Function to update selected item count
function updateSelectedItemCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const selectedItemCountSpan = document.getElementById('selectedItemCount');
    selectedItemCountSpan.textContent = ` (${cart.length})`;
}

// Initialize the page
fetchMovies();

// Function to navigate to checkout page
function goToCheckout() {
    window.location.href = "checkout.html";
}
