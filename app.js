document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('Expense-form');
    const expenseList = document.getElementById('expense-list');
    const totalAmount = document.getElementById('total-amount');

    let expenses = [];

    expenseForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const expenseNameInput = document.getElementById('expense-name');
        const expenseAmountInput = document.getElementById('expense-amount');
        const expenseDateInput = document.getElementById('expense-date');

        const expenseName = expenseNameInput.value;
        const expenseAmount = parseFloat(expenseAmountInput.value);
        const expenseDate = expenseDateInput.value;

        if (expenseName && !isNaN(expenseAmount) && expenseDate) {
            const expense = {
                name: expenseName,
                amount: expenseAmount,
                date: expenseDate
            };

            expenses.push(expense);
            addExpenseToDOM(expense);
            updateTotalAmount();
            expenseForm.reset();
        } else {
            alert('Please fill out all fields correctly.');
        }
    });

    function addExpenseToDOM(expense) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>{expense.name}</td>
            <td>{expense.amount}</td>
            <td>{expense.date}</td>
            <td><button class="delete-btn">Delete</button></td>
        `;
        expenseList.appendChild(row);

        row.querySelector('.delete-btn').addEventListener('click', function() {
            const index = expenses.indexOf(expense);
            expenses.splice(index, 1);
            row.remove();
            updateTotalAmount();
        });
    }

    function updateTotalAmount() {
        const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);
        totalAmount.textContent = total.toFixed(2);
    }
});
