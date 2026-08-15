/* MediMate Smart Medication System */


/* Data */

// Demo users
let users = [
    {
        name: "Admin",
        email: "admin@medimate.com",
        password: "admin123",
        role: "admin"
    }
];


// Medicine data
let medicines = [
    {
        id: 1,
        name: "Napa",
        dosage: "500mg",
        time: "10:00",
        frequency: "2 times",
        stock: 10,
        status: "Pending"
    }
];


// Prescription data
let prescriptions = [];


// Current user
let currentUser = null;


/* Login Modal */

function showLogin() {

    document.getElementById("loginModal").style.display = "flex";

}


function closeLogin() {

    document.getElementById("loginModal").style.display = "none";

}


function switchToRegister() {

    closeLogin();

    showRegister();

}


/* Register */

function showRegister() {

    document.getElementById("registerModal").style.display = "flex";

}


function closeRegister() {

    document.getElementById("registerModal").style.display = "none";

}


function switchToLogin() {

    closeRegister();

    showLogin();

}


function register() {

    let name =
        document.getElementById("registerName").value;

    let email =
        document.getElementById("registerEmail").value;

    let password =
        document.getElementById("registerPassword").value;

    let confirmPassword =
        document.getElementById("confirmPassword").value;

    let message =
        document.getElementById("registerMessage");


    if (
        name === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
    ) {

        message.innerText =
            "Please fill all fields.";

        message.style.color = "red";

        return;
    }


    if (password !== confirmPassword) {

        message.innerText =
            "Passwords do not match.";

        message.style.color = "red";

        return;
    }


    users.push({
        name: name,
        email: email,
        password: password,
        role: "user"
    });


    message.innerText =
        "Registration successful!";

    message.style.color = "green";


    setTimeout(function() {

        closeRegister();

        showLogin();

    }, 1000);

}


/* Login */

function login() {

    let email =
        document.getElementById("loginEmail").value;

    let password =
        document.getElementById("loginPassword").value;

    let message =
        document.getElementById("loginMessage");


    let foundUser = users.find(function(user) {

        return user.email === email &&
               user.password === password;

    });


    if (foundUser) {

        currentUser = foundUser;

        message.innerText =
            "Login successful!";

        message.style.color = "green";


        setTimeout(function() {

            closeLogin();

            document.querySelector(".hero").style.display = "none";

            document.getElementById("features").style.display = "none";

            document.getElementById("about").style.display = "none";

            document.getElementById("dashboard").style.display = "block";

            document.querySelector("footer").style.display = "none";


            if (currentUser.role === "admin") {

                document.getElementById("dashboard").style.display = "none";

                document.getElementById("adminPanel").style.display = "block";

                updateAdminPanel();

            } else {

                document.getElementById("dashboard").style.display = "block";

                updateDashboard();

            }

        }, 700);

    } else {

        message.innerText =
            "Invalid email or password.";

        message.style.color = "red";

    }

}


/* Logout */

function logout() {

    currentUser = null;


    document.getElementById("dashboard").style.display = "none";

    document.getElementById("adminPanel").style.display = "none";


    document.querySelector(".hero").style.display = "flex";

    document.getElementById("features").style.display = "block";

    document.getElementById("about").style.display = "block";

    document.querySelector("footer").style.display = "block";


    document.getElementById("loginEmail").value = "";

    document.getElementById("loginPassword").value = "";

}


/* Add Medicine */

function addMedicine() {

    let name =
        document.getElementById("medicineName").value;

    let dosage =
        document.getElementById("dosage").value;

    let time =
        document.getElementById("medicineTime").value;

    let frequency =
        document.getElementById("frequency").value;

    let stock =
        document.getElementById("stock").value;


    if (
        name === "" ||
        dosage === "" ||
        time === "" ||
        frequency === "" ||
        stock === ""
    ) {

        alert("Please fill all medicine fields.");

        return;
    }


    let newMedicine = {

        id: Date.now(),

        name: name,

        dosage: dosage,

        time: time,

        frequency: frequency,

        stock: stock,

        status: "Pending"

    };


    medicines.push(newMedicine);


    alert("Medicine added successfully!");


    document.getElementById("medicineName").value = "";

    document.getElementById("dosage").value = "";

    document.getElementById("medicineTime").value = "";

    document.getElementById("frequency").value = "";

    document.getElementById("stock").value = "";


    updateDashboard();

}


/* Display Medicines */

function displayMedicines() {

    let list =
        document.getElementById("medicineList");


    list.innerHTML = "";


    if (medicines.length === 0) {

        list.innerHTML =
            "<p>No medicines added yet.</p>";

        return;

    }


    medicines.forEach(function(medicine) {

        let item =
            document.createElement("div");

        item.className =
            "medicine-item";


        item.innerHTML = `

            <div class="medicine-info">

                <h3>💊 ${medicine.name}</h3>

                <p>
                    Dosage: ${medicine.dosage}
                    <br>

                    Time: ${medicine.time}
                    <br>

                    Frequency: ${medicine.frequency}
                    <br>

                    Stock: ${medicine.stock}
                </p>

            </div>


            <div class="medicine-buttons">

                <button
                    class="taken-btn"
                    onclick="markTaken(${medicine.id})"
                >
                    Taken
                </button>

                <button
                    class="missed-btn"
                    onclick="markMissed(${medicine.id})"
                >
                    Missed
                </button>

                <button
                    class="edit-btn"
                    onclick="updateMedicine(${medicine.id})"
                >
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteMedicine(${medicine.id})"
                >
                    Delete
                </button>

            </div>

        `;


        list.appendChild(item);

    });

}


/* Update Medicine */

function updateMedicine(id) {

    let medicine =
        medicines.find(function(item) {

            return item.id === id;

        });


    if (!medicine) {
        return;
    }


    let newName =
        prompt(
            "Enter medicine name:",
            medicine.name
        );


    if (newName === null || newName === "") {
        return;
    }


    let newDosage =
        prompt(
            "Enter dosage:",
            medicine.dosage
        );


    let newTime =
        prompt(
            "Enter time:",
            medicine.time
        );


    medicine.name = newName;

    medicine.dosage = newDosage;

    medicine.time = newTime;


    alert("Medicine updated successfully!");


    updateDashboard();

}


/* Delete Medicine */

function deleteMedicine(id) {

    let confirmDelete =
        confirm(
            "Are you sure you want to delete this medicine?"
        );


    if (!confirmDelete) {
        return;
    }


    medicines =
        medicines.filter(function(medicine) {

            return medicine.id !== id;

        });


    alert("Medicine deleted successfully!");


    updateDashboard();

}


/* Mark as Taken */

function markTaken(id) {

    let medicine =
        medicines.find(function(item) {

            return item.id === id;

        });


    if (!medicine) {
        return;
    }


    medicine.status = "Taken";


    if (medicine.stock > 0) {

        medicine.stock--;

    }


    alert(
        medicine.name +
        " marked as taken."
    );


    updateDashboard();

}


/* Mark as Missed */

function markMissed(id) {

    let medicine =
        medicines.find(function(item) {

            return item.id === id;

        });


    if (!medicine) {
        return;
    }


    medicine.status = "Missed";


    alert(
        medicine.name +
        " marked as missed."
    );


    updateDashboard();

}


/* Reminder */

function displayReminders() {

    let list =
        document.getElementById("reminderList");


    list.innerHTML = "";


    medicines.forEach(function(medicine) {

        let item =
            document.createElement("div");

        item.className =
            "reminder-item";


        item.innerHTML = `

            <div>

                <strong>
                    💊 ${medicine.name}
                </strong>

                <p>
                    Dosage: ${medicine.dosage}
                </p>

            </div>

            <div class="reminder-time">

                ⏰ ${medicine.time}

                <br>

                ${medicine.status}

            </div>

        `;


        list.appendChild(item);

    });

}


/* Missed Dose */

function displayMissedDoses() {

    let list =
        document.getElementById("missedList");


    list.innerHTML = "";


    let missedMedicines =
        medicines.filter(function(medicine) {

            return medicine.status === "Missed";

        });


    if (missedMedicines.length === 0) {

        list.innerHTML =
            "<p>No missed doses. Great job! ✅</p>";

        return;

    }


    missedMedicines.forEach(function(medicine) {

        let item =
            document.createElement("div");

        item.className =
            "missed-item";


        item.innerHTML = `

            <strong>
                ❌ ${medicine.name}
            </strong>

            <p>
                Scheduled Time: ${medicine.time}
            </p>

        `;


        list.appendChild(item);

    });

}


/* Prescription */

function uploadPrescription() {

    let file =
        document.getElementById(
            "prescriptionFile"
        ).files[0];


    if (!file) {

        alert(
            "Please select a prescription file."
        );

        return;
    }


    prescriptions.push(file.name);


    alert(
        "Prescription uploaded successfully!"
    );


    document.getElementById(
        "prescriptionFile"
    ).value = "";


    displayPrescriptions();

}


/* Display Prescriptions */

function displayPrescriptions() {

    let list =
        document.getElementById(
            "prescriptionList"
        );


    list.innerHTML = "";


    prescriptions.forEach(function(file, index) {

        let item =
            document.createElement("div");

        item.className =
            "prescription-item";


        item.innerHTML = `

            📋 ${file}

            <button
                class="delete-btn"
                onclick="deletePrescription(${index})"
            >
                Delete
            </button>

        `;


        list.appendChild(item);

    });

}


/* Delete Prescription */

function deletePrescription(index) {

    prescriptions.splice(index, 1);


    displayPrescriptions();

}


/* Dashboard Update */

function updateDashboard() {

    document.getElementById(
        "totalMedicine"
    ).innerText = medicines.length;


    document.getElementById(
        "todayMedicine"
    ).innerText = medicines.length;


    let taken =
        medicines.filter(function(medicine) {

            return medicine.status === "Taken";

        }).length;


    document.getElementById(
        "takenDose"
    ).innerText = taken;


    let missed =
        medicines.filter(function(medicine) {

            return medicine.status === "Missed";

        }).length;


    document.getElementById(
        "missedDose"
    ).innerText = missed;


    displayMedicines();

    displayReminders();

    displayMissedDoses();

    displayPrescriptions();

}


/* Admin Panel */

function updateAdminPanel() {

    document.getElementById(
        "adminUsers"
    ).innerText = users.length;


    document.getElementById(
        "adminMedicines"
    ).innerText = medicines.length;


    document.getElementById(
        "adminPrescriptions"
    ).innerText = prescriptions.length;


    let missed =
        medicines.filter(function(medicine) {

            return medicine.status === "Missed";

        }).length;


    document.getElementById(
        "adminMissed"
    ).innerText = missed;


    displayUsers();

}


/* Display Users */

function displayUsers() {

    let list =
        document.getElementById(
            "userList"
        );


    list.innerHTML = "";


    users.forEach(function(user) {

        let item =
            document.createElement("div");

        item.className =
            "user-item";


        item.innerHTML = `

            <div>

                <strong>
                    👤 ${user.name}
                </strong>

                <p>
                    ${user.email}
                </p>

            </div>

            <span>
                ${user.role}
            </span>

        `;


        list.appendChild(item);

    });

}