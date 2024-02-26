const thanksBtn = document.getElementById('thanks-btn');
const popupContainer = document.getElementById('popup-container');

// Event listener for the "thanks" button
thanksBtn.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form submission behavior
    popupContainer.classList.toggle('hidden'); 
});

// Event listener for the "continue" button inside the popup
document.getElementById('continue-btn').addEventListener('click', () => {
    popupContainer.classList.add('hidden'); 
    window.location.href = "index.html"; // Redirect to index.html
});
