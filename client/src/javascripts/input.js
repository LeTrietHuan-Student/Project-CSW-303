
// Modal handling
var modal = document.getElementById("income-modal");
var btn = document.getElementById("add-income-btn");
var span = document.getElementsByClassName("close")[0];
var cancelBtn = document.querySelector(".cancel-btn");

btn.onclick = function () {
    modal.style.display = "block";
};

span.onclick = function () {
    modal.style.display = "none";
};

cancelBtn.onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// Form submission
var form = document.getElementById("income-form");
form.onsubmit = function (event) {
    event.preventDefault();

    var category = document.getElementById("category").value;
    var value = parseFloat(document.getElementById("value").value);
    var refund = document.getElementById("refund").checked;
    var account = document.getElementById("account").value;
    var checked = document.getElementById("checked").checked;
    var date = document.getElementById("date").value;
    var time = document.getElementById("time").value;
    var from = document.getElementById("from").value;
    var notes = document.getElementById("notes").value;

    // Log data (replace with actual save logic)
    console.log({
        Category: category,
        Value: value,
        "Is Refund": refund,
        Account: account,
        Checked: checked,
        Date: date,
        Time: time,
        From: from,
        Notes: notes
    });

    // Update total (for demonstration; adjust as needed)
    document.getElementById("total").textContent = `Total: $${value.toFixed(2)}`;

    // Handle "Save > +" button (keep modal open and reset form)
    if (event.submitter.classList.contains("save-add-btn")) {
        form.reset();
        document.getElementById("checked").checked = true; // Reset to default
        document.getElementById("date").value = "2025-04-28"; // Reset to default
        document.getElementById("time").value = "21:31"; // Reset to default
        document.getElementById("total").textContent = "Total: $0.00";
    } else {
        modal.style.display = "none";
        form.reset();
    }
};
            