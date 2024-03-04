// addexpense.js

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();

    const amount = document.getElementById('expenseAmount').value;
    const description = document.getElementById('expenseName').value;
    const category = document.getElementById('expenseCategory').value;

    const expense_obj = {
        amount,
        description,
        category
    };

    axios.post('http://localhost:8000/expense/add-expense', expense_obj)
        .then(response => {
            console.log('Expense added successfully:', response.data);
            displayExpense(response.data);  // Assuming the server sends back the created expense
        })
        .catch(error => {
            handleErrorResponse(error);
        });

    // Clear input fields after submission
    document.getElementById('expenseAmount').value = '';
    document.getElementById('expenseName').value = '';
    document.getElementById('expenseCategory').value = '';
}

// Function to handle error response
function handleErrorResponse(error) {
    if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = error.response.data.errors.map(errorItem => errorItem.message).join(', ');
        alert(`Error adding expense: ${errorMessages}`);
    } else {
        console.error('Error adding expense:', error);
        alert('An error occurred while adding the expense. Please try again later.');
    }
}

// Function to display expense
function displayExpense(expense_obj) {
    const expensesList = document.getElementById('expenseList');
    const listItem = document.createElement('li');
    listItem.className = 'expense-item';  // Add a class for styling if needed
    
    // Display expense details
    listItem.textContent = `Amount: ${expense_obj.amount}, Description: ${expense_obj.description}, Category: ${expense_obj.category}`;

    // Add delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        deleteExpense(expense_obj, listItem);
    };
    listItem.appendChild(deleteButton);

    // Add edit button
    // const editButton = document.createElement('button');
    // editButton.textContent = 'Edit';
    // editButton.onclick = function() {
    //     editExpense(expense_obj, listItem);
    // };
    // listItem.appendChild(editButton);

    // expensesList.appendChild(listItem);
}

// Function to delete expense
function deleteExpense(expense_obj, listItem) {
    axios.delete(`http://localhost:8000/delete-expense/${expense_obj.id}`)
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
    axios.get('http://localhost:8000/expense/get-expense')
        .then(response => {
            for (let i = 0; i < response.data.allexpenses.length; i++) {
                displayExpense(response.data.allexpenses[i]);
            }
        })
        .catch(error => {
            console.error('Error fetching Expenses:', error);
        });
});

// Attach form submission handler to the form
const expenseForm = document.getElementById('expenseForm');
expenseForm.addEventListener('submit', handleFormSubmit);
