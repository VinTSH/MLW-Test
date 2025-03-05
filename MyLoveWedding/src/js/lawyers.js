import { loadJSONData, displayList } from './fetch.js';
import { addToCart } from './cart.js';

function createLawyerElement(lawyer) {
    const lawyerElement = document.createElement('div');
    lawyerElement.classList.add('lawyer-item');

    lawyerElement.innerHTML = `
        <h3>${lawyer.name}</h3>
        <p>Specialization: ${lawyer.specialization}</p>
        <p>Fees: ${lawyer.fees}</p>
        <button class="add-to-cart-button" data-lawyer-id="${lawyer.id}">Add to Cart</button>
    `;

    lawyerElement.querySelector('.add-to-cart-button').addEventListener('click', function () {
        addToCart('lawyer', lawyer);
    });

    return lawyerElement;
}

export function initializeLawyerSearch() {
    const searchInput = document.getElementById('lawyer-search-input');
    const lawyerListContainer = document.getElementById('lawyer-list-container');

    loadJSONData('data/lawyers.json', lawyers => {
        displayList(lawyers, 'lawyer-list-container', createLawyerElement);

        searchInput.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();
            const filteredLawyers = lawyers.filter(lawyer =>
                lawyer.name.toLowerCase().includes(searchTerm) ||
                lawyer.specialization.toLowerCase().includes(searchTerm)
            );
            displayList(filteredLawyers, 'lawyer-list-container', createLawyerElement);
        });
    });
}