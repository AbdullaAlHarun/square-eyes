document.addEventListener('DOMContentLoaded', function(){
    // Extract movie ID from URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const movieId = urlParams.get('id');

    // Fetch movie details using the movie ID
    fetchMovieDetails(movieId);

    async function fetchMovieDetails(id) {
        try {
            const response = await fetch(`https://api.noroff.dev/api/v1/square-eyes/${id}`);
            const movie = await response.json();
            displayMovieDetails(movie);
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    }

    function displayMovieDetails(movie) {
        // Update DOM elements with movie details
        document.getElementById('title').textContent = movie.title;
        document.getElementById('genre').textContent = movie.genre;
        document.getElementById('description').textContent = movie.description;
        document.getElementById('rating').textContent = movie.rating;
        document.getElementById('released').textContent = movie.released;
        document.getElementById('price').textContent = movie.price;
        document.getElementById('discountedPrice').textContent = movie.discountedPrice;

        // Set the src attribute of the image tag with the movie image URL
        document.getElementById('image').src = movie.image;
    }
});