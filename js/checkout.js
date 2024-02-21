document.addEventListener('DOMContentLoaded', function(){
    // Fetch basket items from local storage
    let basket = JSON.parse(localStorage.getItem('basket')) || [];
    console.log('Basket:', basket); // Log the basket array

    // Fetch details of all items in the basket
    fetchBasketItems(basket);

    async function fetchBasketItems(basket) {
        try {
            if (basket.length === 0) {
                // If basket is empty, display a message
                document.getElementById('basket-items').textContent = 'Your basket is empty';
                return;
            }

            const basketItemsContainer = document.getElementById('basket-items');
            let totalPrice = 0;

            // Clear previous content
            basketItemsContainer.innerHTML = '';

            // Loop through each item in the basket
            for (let i = 0; i < basket.length; i++) {
                const productId = basket[i];
                console.log('Fetching details for product ID:', productId);

                // Fetch details of the item from the API
                const response = await fetch(`https://api.noroff.dev/api/v1/square-eyes/${productId}`);
                const movie = await response.json();
                console.log('Received movie details:', movie);

                // Check if the response contains a valid movie
                if (movie && movie.title) {
                    // Calculate item price
                    const itemPrice = parseFloat(movie.discountedPrice || movie.price);
                    totalPrice += itemPrice;

                    // Create HTML for the basket item
                    const itemHTML = `
                        <div class="basket-item">
                            <img src="${movie.image}" alt="${movie.title}" class="basket-item-img">
                            <div class="basket-item-details">
                                <h2>${movie.title}</h2>
                                <p><strong>Price:</strong> $${itemPrice.toFixed(2)}</p>
                            </div>
                        </div>
                    `;
                    basketItemsContainer.innerHTML += itemHTML;
                } else {
                    console.error('Invalid movie data received:', movie);
                }
            }

            // Display total price
            const totalPriceContainer = document.getElementById('total-price');
            totalPriceContainer.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
        } catch (error) {
            console.error('Error fetching basket items:', error);
        }
    }
});