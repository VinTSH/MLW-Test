export function createBudgetElement(budget) {
    const budgetElement = document.createElement('div');
    budgetElement.classList.add('budget-item');

    budgetElement.innerHTML = `
        <h3>${budget.category}</h3>
        <p>Amount: $${budget.amount}</p>
        <p>Date: ${budget.date}</p>
        <p>Description: ${budget.description}</p>
    `;

    return budgetElement;
}

export function initializeBudgetDisplay() {
    const budgetListContainer = document.getElementById('budget-list-container');
    budgetListContainer.innerHTML = ''; // Clear any existing content

    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    let totalBudget = 0;

    // Display each item in the cart
    for (let itemType in cart) {
        if (cart.hasOwnProperty(itemType)) {
            cart[itemType].forEach(item => {
                const budgetElement = document.createElement('div');
                budgetElement.classList.add('budget-item');
                const amount = item.pricing || item.fees || item.price || 0;
                budgetElement.innerHTML = `
                    <h3>${item.name} (${itemType})</h3>
                    <p>Amount: $${amount}</p>
                `;
                budgetListContainer.appendChild(budgetElement);
                totalBudget += amount;
            });
        }
    }

    // Display total budget
    const totalBudgetElement = document.createElement('p');
    totalBudgetElement.textContent = `Total Budget: $${totalBudget}`;
    budgetListContainer.appendChild(totalBudgetElement);

    // Set alert limit at 20000 for prototype usage
    if (totalBudget > 20000) {
        alert('Warning! The budget has exceeded $20000');
    }
}