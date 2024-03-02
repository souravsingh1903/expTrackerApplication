function signUp(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const signUpData = {
        name,
        email,
        password
    };

    axios.post("http://localhost:8000/user/sign-up", signUpData)
        .then(response => {
            console.log(response);
        })
        .catch((error) => {
            console.error(error);
        });

    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';

    loginForm();
}

function loginForm() {
    const mainContainer = document.querySelector('.main-container');
    mainContainer.innerHTML = '';

    mainContainer.innerHTML = `
        <div class='login-container'>
            <h2>Login</h2>
            <form id="loginForm" onsubmit="login(event)">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required>

                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>

                <button type="submit" class="submit-btn">Login</button><br>
                <button type="button" class="submit-btn" onclick="signUpForm()">Sign Up</button>
            </form>
        </div>`;
}

function signUpForm() {
    const mainContainer = document.querySelector('.main-container');
    mainContainer.innerHTML = '';

    mainContainer.innerHTML = `
        <div class='signup-container'>
            <h2>Sign Up</h2>
            <form id="signupForm" onsubmit="signUp(event)">
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="text" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button type="submit" class="submit-btn">Sign Up</button><br>
                <button type="button" class="submit-btn" onclick="loginForm()">Existing User Or Login</button>
            </form>
        </div>`;
}

function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const loginData = {
        username,
        password
    };

    axios.post("http://localhost:8000/user/login", loginData)
        .then(response => {
            console.log(response.data); // Logging the response data
        })
        .catch((error) => {
            console.error(error);
        });

        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
}
