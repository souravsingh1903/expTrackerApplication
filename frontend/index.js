function signUp(event){
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const signUp ={
        name,
        email,
        password
    }

    axios.post("http://localhost:8000/user/sign-up", signUp)
    .then(response =>{
        console.log(response);
    }).catch((e) => {
        console.log(e);
    })

    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
}