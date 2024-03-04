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
}
