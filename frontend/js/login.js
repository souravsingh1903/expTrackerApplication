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
            console.log('Response data:', response.data);
            localStorage.setItem('token', response.data.token);
            window.location.href = "../html/expense.html"; // Redirect after successful login
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    // Optional: Clear input fields after submission
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}
