import { loadJSONData, displayList } from './fetch.js';
import { addToCart } from './cart.js';

function createTravelElement(travel) {
    const travelElement = document.createElement('div');
    travelElement.classList.add('travel-item');

    travelElement.innerHTML = `
        <h3>${travel.airline} - ${travel.departureCity} to ${travel.arrivalCity}</h3>
        <p>Departure Date: ${travel.departureDate}</p>
        <p>Return Date: ${travel.returnDate}</p>
        <p>Price: $${travel.price}</p>
        <p>Hotel: ${travel.hotel.name} - ${travel.hotel.location} ($${travel.hotel.pricePerNight}/night)</p>
        <button class="add-to-cart-button" data-travel-id="${travel.id}">Add to Cart</button>
    `;

    travelElement.querySelector('.add-to-cart-button').addEventListener('click', function () {
        addToCart('travel', travel);
    });

    return travelElement;
}

export function initializeTravelSearch() {
    const travelListContainer = document.getElementById('travel-list-container');

    loadJSONData('data/travel.json', travels => {
        displayList(travels, 'travel-list-container', createTravelElement);
    });
}