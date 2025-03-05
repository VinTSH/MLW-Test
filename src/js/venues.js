import { loadJSONData, displayList } from './fetch.js';
import { addToCart } from './cart.js';

function createVenueElement(venue) {
    const venueElement = document.createElement('div');
    venueElement.classList.add('venue-item');

    venueElement.innerHTML = `
        <h3>${venue.name}</h3>
        <p>Location: ${venue.location}</p>
        <p>Capacity: ${venue.capacity}</p>
        <p>Price: ${venue.pricing}</p>
        <button class="add-to-cart-button" data-venue-id="${venue.id}">Add to Cart</button>
    `;

    venueElement.querySelector('.add-to-cart-button').addEventListener('click', function () {
        addToCart('venue', venue);
    });

    return venueElement;
}

export function initializeVenueSearch() {
    const searchInput = document.getElementById('venue-search-input');
    const venueListContainer = document.getElementById('venue-list-container');

    loadJSONData('data/venues.json', venues => {
        displayList(venues, 'venue-list-container', createVenueElement);

        searchInput.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();
            const filteredVenues = venues.filter(venue =>
                venue.name.toLowerCase().includes(searchTerm) ||
                venue.location.toLowerCase().includes(searchTerm)
            );
            displayList(filteredVenues, 'venue-list-container', createVenueElement);
        });
    });
}