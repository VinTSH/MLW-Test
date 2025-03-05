import { updateCartDisplay } from './cart.js';
import { initializeVenueSearch } from './venues.js';
import { initializeLawyerSearch } from './lawyers.js';
import { initializeServiceSearch } from './services.js';
import { initializeTravelSearch } from './travel.js';
import { initializeBudgetDisplay } from './budget.js';
import { displayProfile, initializeRegistrationPage, initializeLoginPage } from './auth.js';

document.addEventListener('DOMContentLoaded', function () {
    // Initialize cart display on all pages
    updateCartDisplay();

    // Check if on the register page
    if (document.getElementById('register-form')) {
        initializeRegistrationPage();
    }

    // Check if on the login page
    if (document.getElementById('login-form')) {
        initializeLoginPage();
    }

    // If logged in, show profile instead of login
    if (loggedInUser) {
        displayProfile();
    }

    // Initialize Venue Search (if on venues.html)
    if (document.getElementById('venue-search-input')) {
        initializeVenueSearch();
    }

    // Initialize Lawyer Search (if on lawyers.html)
    if (document.getElementById('lawyer-search-input')) {
        initializeLawyerSearch();
    }

    // Initialize Service Search (if on services.html)
    if (document.getElementById('service-search-input')) {
        initializeServiceSearch();
    }

    // Initialize Travel Search (if on travel.html)
    if (document.getElementById('travel-list-container')) {
        initializeTravelSearch();
    }

    // Initialize Budget Display (if on budget.html)
    if (document.getElementById('budget-list-container')) {
        initializeBudgetDisplay();
    }
});