// addexpense.js


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
window.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem('token');
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
        window.location.reload();
        localStorage.setItem("token", res.data.token);
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


