import { loadJSONData, displayList } from './fetch.js';
import { addToCart } from './cart.js';

function createServiceElement(service) {
    const serviceElement = document.createElement('div');
    serviceElement.classList.add('service-item');

    serviceElement.innerHTML = `
        <h3>${service.name}</h3>
        <p>Service: ${service.type}</p>
        <p>Pricing: ${service.pricing}</p>
        <button class="add-to-cart-button" data-service-id="${service.id}">Add to Cart</button>
    `;

    serviceElement.querySelector('.add-to-cart-button').addEventListener('click', function () {
        addToCart('service', service);
    });

    return serviceElement;
}

export function initializeServiceSearch() {
    const searchInput = document.getElementById('service-search-input');
    const serviceListContainer = document.getElementById('service-list-container');

    loadJSONData('data/services.json', services => {
        displayList(services, 'service-list-container', createServiceElement);

        searchInput.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();
            const filteredServices = services.filter(service =>
                service.name.toLowerCase().includes(searchTerm) ||
                service.type.toLowerCase().includes(searchTerm)
            );
            displayList(filteredServices, 'service-list-container', createServiceElement);
        });
    });
}