function initReminderPanel() {
    const reminderSection = document.getElementById('reminders-section');
    const toggleButton = document.createElement('button');
    toggleButton.id = 'reminder-toggle';
    toggleButton.innerHTML = '<i class="fa fa-arrow-left"></i>';
    document.body.appendChild(toggleButton);

    toggleButton.addEventListener('click', function() {
        if (reminderSection.style.right === '0px') {
            reminderSection.style.right = '-250px';
            toggleButton.innerHTML = '<i class="fa fa-arrow-left"></i>';
        } else {
            reminderSection.style.right = '0px';
            toggleButton.innerHTML = '<i class="fa fa-arrow-right"></i>';
        }
    });
}

function initReminders() {
    var reminderModal = document.getElementById("reminder-modal");
    var reminderBtn = document.getElementById("add-reminder-btn");
    var reminderSpan = document.querySelector("#reminder-modal .close");
    var reminderCancelBtn = document.querySelector("#reminder-modal .cancel-btn");

    if (reminderBtn) {
        reminderBtn.onclick = function () {
            reminderModal.style.display = "block";
        };
    }

    if (reminderSpan) {
        reminderSpan.onclick = function () {
            reminderModal.style.display = "none";
        };
    }

    if (reminderCancelBtn) {
        reminderCancelBtn.onclick = function () {
            reminderModal.style.display = "none";
        };
    }

    window.onclick = function (event) {
        if (event.target == reminderModal) {
            reminderModal.style.display = "none";
        }
    };

    var reminderForm = document.getElementById("reminder-form");
    if (reminderForm) {
        reminderForm.onsubmit = function (event) {
            event.preventDefault();

            var dueDate = document.getElementById("reminder-date").value;
            var description = document.getElementById("reminder-description").value;
            var amount = parseFloat(document.getElementById("reminder-amount").value);
            var dateObj = new Date(dueDate);
            var formattedDate = dateObj.getDate() + " " + dateObj.toLocaleString('default', { month: 'short' });
            var formattedAmount = amount >= 0 ? `+${amount.toFixed(2)}` : `${amount.toFixed(2)}`;
            var table = document.getElementById("reminders-table");
            var row = table.insertRow(-1);
            row.innerHTML = `
                <td>${formattedDate}</td>
                <td>${description}</td>
                <td class="${amount >= 0 ? 'income-text' : 'expense-text'}">${formattedAmount}</td>
            `;
            var reminders = JSON.parse(localStorage.getItem('reminders')) || [];
            reminders.push({ dueDate: formattedDate, description, amount: formattedAmount });
            localStorage.setItem('reminders', JSON.stringify(reminders));
            reminderModal.style.display = "none";
            reminderForm.reset();
        };
    }

    var reminders = JSON.parse(localStorage.getItem('reminders')) || [];
    var table = document.getElementById("reminders-table");
    if (table) {
        reminders.forEach(reminder => {
            var row = table.insertRow(-1);
            row.innerHTML = `
                <td>${reminder.dueDate}</td>
                <td>${reminder.description}</td>
                <td class="${parseFloat(reminder.amount) >= 0 ? 'income-text' : 'expense-text'}">${reminder.amount}</td>
            `;
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initReminders();
    initReminderPanel();
});