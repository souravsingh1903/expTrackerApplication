// addexpense.j

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();

    const date = document.getElementById('expenseDate').value;
    const name = document.getElementById('expenseName').value;
    const amount = document.getElementById('expenseAmount').value;
    const category = document.getElementById('expenseCategory').value;

    const expense_obj = {
        date,
        name,
        amount,
        category,
    };
    const token = localStorage.getItem('token');
    axios.post('http://localhost:8000/expense/addExpense', expense_obj , { headers : {Authorization : token}})
        .then(response => {
            console.log('Expense added successfully:', response.data);
            displayExpense(response.data);  // Assuming the server sends back the created expense
        })
        .catch(error => {
            console.error('Error adding expense:', error);
        });

    // Clear input fields after submission
    document.getElementById('expenseDate').value = '';
    document.getElementById('expenseAmount').value = '';
    document.getElementById('expenseName').value = '';
    document.getElementById('expenseCategory').value = '';
}




// Function to display expense
function displayExpense(expense_obj) {
    const expensesList = document.getElementById('expenseList');
    const listItem = document.createElement('li');
    listItem.className = 'expense-item';  // Add a class for styling if needed
    
    // Display expense details
    listItem.innerHTML = `<strong>Date:</strong> ${expense_obj.date}, <strong>Name:</strong> ${expense_obj.name}, <strong>Amount</strong>: ${expense_obj.amount}, <strong>Category</strong>: ${expense_obj.category}`;

    // Add delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        deleteExpense(expense_obj, listItem);
    };
    listItem.appendChild(deleteButton);

     expensesList.appendChild(listItem);
}

// Function to delete expense
function deleteExpense(expense_obj, listItem) {
    
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:8000/expense/delete-expense/${expense_obj.id}` , { headers : {Authorization : token}})
        .then(response => {
            removeExpenseFromScreen(listItem);
            console.log('Expense deleted successfully:', response.data);
        })
        .catch(error => {
            console.error('Error deleting Expense:', error);
        });
}

function removeExpenseFromScreen(listItem) {
    const expensesList = document.getElementById('expenseList');
    expensesList.removeChild(listItem);
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
window.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem('token');
    let parsedToken = parseJwt(token);
    console.log(parsedToken);
        let ispremium = parsedToken.isPremiumUser;
        if(ispremium)
        {
            showPremiumMessage();
            showLeaderBoard();
           
        }
    axios.get('http://localhost:8000/expense/get-expense', { headers : {Authorization : token}})
        .then(response => {
            for (let i = 0; i < response.data.length; i++) {

                displayExpense(response.data[i]);
            }
        })
        .catch(error => {
            console.error('Error fetching Expenses:', error);
        });
});

// Attach form submission handler to the form
const expenseForm = document.getElementById('expenseForm');
expenseForm.addEventListener('submit', handleFormSubmit);


function showPremiumMessage(){
    document.getElementById('premiumBtn').style = 'display: none;';
        document.getElementById('message').innerHTML = "You are a premium user!";
}
async function buyPremium(e) {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:8000/purchase/premium", {
      headers: { Authorization: token },
    });
    //console.log(res);
    var options = {
      key: res.data.key_id, // Enter the Key ID generated from the Dashboard
      order_id: res.data.order, // For one time payment
      // This handler function will handle the success payment
      handler: async function (response) {
        console.log(response);
        const res = await axios.post(
          "http://localhost:8000/purchase/updateTransactionStatus",
          {
            order_id: options.order_id,
            payment_id: response.razorpay_payment_id,
          },
          { headers: { Authorization: token } }
        );
  
        //console.log(res);
        alert("Welcome to our Premium Membership");
        document.getElementById('premiumBtn').style = 'display: none;';
        document.getElementById('message').innerHTML = "You are a premium user!";
         localStorage.setItem("token", res.data.token);
        showLeaderBoard();

      },
    };
    const rzp1 = new Razorpay(options);
    rzp1.on("payment.failed", async function (response) {
      alert("failed");
      console.log(response.error);
      const res = await axios.post(
        "http://localhost:8000/purchase/failed",
        {
          order_id: options.order_id,
          payment_id: response.error.metadata.payment_id,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res);
    });
    rzp1.open();
    e.preventDefault();
  }
  function showLeaderBoard() {
    const leaderboard_btn = document.createElement('input');
    leaderboard_btn.type = 'button';
    leaderboard_btn.className = 'leaderboard-btn';
    leaderboard_btn.value = 'Show Leaderboard';
    leaderboard_btn.style.backgroundColor = '#2ecc71';
    leaderboard_btn.style.color = 'white';
    leaderboard_btn.style.padding = '10px 20px';
    leaderboard_btn.style.borderRadius = '5px';
    leaderboard_btn.style.border = 'none';
    leaderboard_btn.style.cursor = 'pointer';
    leaderboard_btn.style.fontSize = '16px';

    leaderboard_btn.onclick = async () => {
        const token = localStorage.getItem("token");
        try {
            const userLeaderBoard = await axios.get("http://localhost:8000/premium/showleaderboard", {
                headers: { Authorization: token }
            });
            console.log(userLeaderBoard);

            const leaderBoardElem = document.getElementsByClassName('leaderboard')[0]; // Select the first element
            if (leaderBoardElem) {
                leaderBoardElem.innerHTML = `<h1>Leader Board</h1>`; // Clear previous content
                userLeaderBoard.data.forEach((userDetails) => {
                    leaderBoardElem.innerHTML += `<li> Name - ${userDetails.name} Total Expense - ${userDetails.total_cost}</li>`;
                });
            } else {
                console.error("Leaderboard element not found.");
            }
        } catch (error) {
            console.error("Error fetching leaderboard:", error);
        }
    };
    document.getElementById('expenseForm').appendChild(leaderboard_btn);
}


