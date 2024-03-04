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