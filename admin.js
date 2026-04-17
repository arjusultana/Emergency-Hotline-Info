
// ================== GLOBAL DATA ==================
let services = JSON.parse(localStorage.getItem("services")) || [];

// ================== SAVE ==================
function saveServices() {
    localStorage.setItem("services", JSON.stringify(services));
}

// ================== ADMIN ADD ==================
window.addService = function() {
    const name = document.getElementById("serviceName").value;
    const number = document.getElementById("serviceNumber").value;

    if(!name || !number) {
        alert("Fill all fields");
        return;
    }

    services.push({name, number});
    saveServices();

    alert("Service Added!");

    document.getElementById("serviceName").value = "";
    document.getElementById("serviceNumber").value = "";
}
window.editService = function(index) {
    const newName = prompt("Enter new name:", services[index].name);
    const newNumber = prompt("Enter new number:", services[index].number);
    const newCategory = prompt("Enter new category:", services[index].category);

    if(newName && newNumber && newCategory){
        services[index] = {
            name: newName,
            number: newNumber,
            category: newCategory
        };

        saveServices();
        renderAdminServices();
    }
}
// ================== ADMIN LIST ==================
function renderAdminServices() {
    const list = document.getElementById("admin-list");
    if(!list) return;

    list.innerHTML = "";

    services.forEach((s, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${s.name} - ${s.number}
            <button onclick="deleteService(${index})">Delete</button>
        `;
        list.appendChild(li);
    });
}

// ================== DELETE ==================
window.deleteService = function(index) {
    services.splice(index, 1);
    saveServices();
    renderAdminServices();
}

// ================== USER PAGE SHOW ==================
// function renderUserServices() {
//     const container = document.querySelector(".grid");
//     if(!container) return;

//     const data = JSON.parse(localStorage.getItem("services")) || [];

//     data.forEach(service => {
//         const div = document.createElement("div");
//         div.className = "bg-white rounded-lg shadow-md p-4 relative";

//         div.innerHTML = `
//             <h3 class="font-bold">${service.name}</h3>
//             <p class="text-lg font-semibold mt-2">${service.number}</p>

//             <button onclick="toggleFavorite(this)" class="absolute top-2 right-2 text-2xl">
//                 ♡
//             </button>

//             <div class="mt-4 flex space-x-2">
//                 <button class="bg-gray-200 px-4 py-2 rounded flex-1"
//                     onclick="copyNumber('${service.number}')">
//                     Copy
//                 </button>

//                 <button class="bg-green-500 text-white px-4 py-2 rounded flex-1"
//                     onclick="makeCall('${service.name}', '${service.number}')">
//                     Call
//                 </button>
//             </div>
//         `;

//         container.appendChild(div);
//     });
// }

// ================== MAIN ==================
document.addEventListener("DOMContentLoaded", function() {

    // LOGIN CHECK
    if(localStorage.getItem("isLoggedIn") !== "true") {
        alert("Please login first!");
        window.location.href = "login.html";
        return;
    }

    // ADMIN BUTTON SHOW
    const adminBtn = document.getElementById("admin-btn");
    if(localStorage.getItem("role") === "admin" && adminBtn) {
        adminBtn.classList.remove("hidden");
    }

    // COUNTS
    let heartCount = 0;
    let coinCount = 100;
    let copyCount = 0;
    let callHistory = [];

    const heartEl = document.getElementById("heart-count");
    const coinEl = document.getElementById("coin-count");
    const copyEl = document.getElementById("copy-count");
    const historyList = document.getElementById("history-list");

    function updateCounts() {
        if(heartEl) heartEl.textContent = heartCount;
        if(coinEl) coinEl.textContent = coinCount;
        if(copyEl) copyEl.textContent = copyCount;
    }

    // HEART
    window.toggleFavorite = function(btn) {
        if(btn.innerText === "♡") {
            btn.innerText = "❤️";
            heartCount++;
        } else {
            btn.innerText = "♡";
            heartCount--;
        }
        updateCounts();
    }

    // COPY
    window.copyNumber = function(num) {
        navigator.clipboard.writeText(num);
        alert("Copied: " + num);
        copyCount++;
        updateCounts();
    }

    // CALL
    window.makeCall = function(name, num) {
        if(coinCount < 20) {
            alert("Not enough coin!");
            return;
        }

        coinCount -= 20;
        updateCounts();

        const time = new Date().toLocaleString();
        callHistory.push({name, num, time});

        updateHistory();

        window.location.href = `tel:${num}`;
    }

    function updateHistory() {
        if(!historyList) return;

        historyList.innerHTML = "";
        callHistory.forEach(h => {
            const li = document.createElement("li");
            li.innerText = `${h.name} - ${h.num} (${h.time})`;
            historyList.appendChild(li);
        });
    }

    // CLEAR
    window.clearHistory = function() {
        callHistory = [];
        updateHistory();
    }

    // LOGOUT
    window.logout = function() {
        localStorage.clear();
        window.location.href = "login.html";
    }

    // INIT
    updateCounts();
    updateHistory();
    renderUserServices();
    renderAdminServices();

});