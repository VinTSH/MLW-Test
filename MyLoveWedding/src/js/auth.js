let loggedInUser = null; // Store logged-in user (simulated)

export function displayProfile() {
    const main = document.querySelector('main');
    document.querySelector('header nav').innerHTML = `
        <ul>
            <li><a href="home.html">Home</a></li>
            <li><a href="venues.html">Venues</a></li>
            <li><a href="lawyers.html">Lawyers</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="travel.html">Travel</a></li>
            <li><a href="budget.html">Budget</a></li>
            <li><a href="profile.html">Profile</a></li>
        </ul>
    `;
    main.innerHTML = `
        <section id="profile">
            <h2>Your Profile</h2>
            <form id="edit-profile-form">
                <label for="new-username">New Username:</label>
                <input type="text" id="new-username" name="new-username" placeholder="${loggedInUser.username}"><br><br>

                <label for="new-password">New Password:</label>
                <input type="password" id="new-password" name="new-password"><br><br>

                <label for="new-email">New Email:</label>
                <input type="email" id="new-email" name="new-email" placeholder="${loggedInUser.email}"><br><br>

                <button type="submit" id="update-profile-button">Update Profile</button>
            </form>
            <button id="logout-button">Logout</button>
        </section>
    `;

    document.getElementById('logout-button').addEventListener('click', function () {
        loggedInUser = null;
        alert('Logged Out!');
        window.location.href = "index.html";
    });

    const updateProfileButton = document.getElementById('update-profile-button');
    updateProfileButton.addEventListener('click', function (event) {
        event.preventDefault();

        const newUsernameInput = document.getElementById('new-username');
        const newPasswordInput = document.getElementById('new-password');
        const newEmailInput = document.getElementById('new-email');

        const newUsername = newUsernameInput.value;
        const newPassword = newPasswordInput.value;
        const newEmail = newEmailInput.value;

        const storedUser = localStorage.getItem('user');

        if (storedUser) {
            const user = JSON.parse(storedUser);

            if (newUsername !== "") {
                loggedInUser.username = newUsername;
                user.username = newUsername;
            }

            if (newPassword !== "") {
                user.password = newPassword;
            }

            if (newEmail !== "") {
                loggedInUser.email = newEmail;
                user.email = newEmail;
            }

            localStorage.setItem('user', JSON.stringify(user));
        }

        if (newUsername || newPassword || newEmail) {
            displayProfile(); // Re-render profile with updated info
            alert("Profile Updated!");
        } else {
            alert("No changes were made.");
        }
    });
}

export function initializeRegistrationPage() {
    const registerForm = document.getElementById('register-form');
    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const usernameInput = document.getElementById('new-username');
        const passwordInput = document.getElementById('new-password');
        const emailInput = document.getElementById('email');

        const username = usernameInput.value;
        const password = passwordInput.value;
        const email = emailInput.value;

        const user = {
            username: username,
            password: password,
            email: email
        };

        localStorage.setItem('user', JSON.stringify(user));
        alert('Registration Successful! Please log in.');
        window.location.href = 'index.html';
    });
}

export function initializeLoginPage() {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const username = usernameInput.value;
        const password = passwordInput.value;

        const storedUser = localStorage.getItem('user');

        if (storedUser) {
            const user = JSON.parse(storedUser);

            if (username === user.username && password === user.password) {
                document.querySelector('header nav').innerHTML = `
                    <ul>
                        <li><a href="home.html">Home</a></li>
                        <li><a href="venues.html">Venues</a></li>
                        <li><a href="lawyers.html">Lawyers</a></li>
                        <li><a href="services.html">Services</a></li>
                        <li><a href="travel.html">Travel</a></li>
                        <li><a href="budget.html">Budget</a></li>
                        <li><a href="profile.html">Profile</a></li>
                    </ul>
                `;
                loggedInUser = { username: username, email: user.email };
                alert('Login Successful!');
                window.location.href = 'home.html';
            } else {
                alert('Invalid username or password!');
            }
        } else {
            alert('User not found. Please register.');
        }
    });
}