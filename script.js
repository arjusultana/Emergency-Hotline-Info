document.addEventListener("DOMContentLoaded", function () {

    // ================= LOGIN CHECK =================
    if (localStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "login.html";
        return;
    }

    const langSelect = document.getElementById("langToggle");

    // ================= DARK MODE =================
    window.toggleDarkMode = function () {
        document.documentElement.classList.toggle("dark");
    };

    // ================= COUNTERS =================
    let heartCount = 0;
    let coinCount = 100;
    let copyCount = 0;

    const heartEl = document.getElementById("heart-count");
    const coinEl = document.getElementById("coin-count");
    const copyEl = document.getElementById("copy-count");

    function updateCounts() {
        if (heartEl) heartEl.innerText = heartCount;
        if (coinEl) coinEl.innerText = coinCount;
        if (copyEl) copyEl.innerText = copyCount;
    }

    updateCounts();
window.toggleFavorite = function(event, btn){
    if(event) event.stopPropagation();

    const isActive = btn.classList.contains("text-red-500");

    if(isActive){
        btn.classList.remove("text-red-500");
        btn.innerText = "♡";
        heartCount--;
    } else {
        btn.classList.add("text-red-500");
        btn.innerText = "❤️";
        heartCount++;
    }

    updateCounts();
}


function renderHistory(){
  const list = document.getElementById("history-list");
  if(!list) return;

  const history = JSON.parse(localStorage.getItem("callHistory")) || [];

  list.innerHTML = history.map(item => `
    <li class="border p-2 mt-2 rounded">
      ${item.name} - ${item.number}
    </li>
  `).join("");
}

renderHistory();
  // ================= TRANSLATIONS =================
    const translations = {
        en: {
            title: "Emergency Service Directory",
            subtitle: "Government Emergency Services at Your Fingertip",
            copy: "Copy",
            call: "Call",
            clear: "Clear",
            logout: "Logout",
            callHistory: "Call History",
            addedServices: "Added Services",

            nationalTitle: "National Emergency Number",
            nationalSubtitle: "National Emergency",
            nationalCategory: "All",
            consumerTitle: "Consumer Rights Office",
            consumerSubtitle: "Consumer Rights Helpline",
            consumerCategory: "Govt.",

            policeTitle: "Police Helpline Number",
            policeSubtitle: "Police",
            policeCategory: "Police",

            fireTitle: "Fire Service Number",
            fireSubtitle: "Fire Service",
            fireCategory: "Fires",

            ambulanceTitle: "Ambulance Service",
            ambulance: "Ambulance",
            health: "Health",

            womenTitle: "Women & Child Helpline",
            women: "Women & Child Helpline",
            help: "Help",

            antiTitle: "Anti-Corruption Helpline",
            anti: "Anti-Corruption",
            govt: "Govt.",

            electricTitle: "Electricity Helpline",
            electric: "Electricity outage",
            electricity: "Electricity",

            bracTitle: "Brac Helpline",
            brac: "Brac",
            ngo: "NGO",

            railTitle: "Bangladesh Railway Helpline",
            rail: "Bangladesh Railway",
            travel: "Travel"
        },

        bn: {
            title: "জরুরি সেবা তালিকা",
            subtitle: "সরকারি জরুরি সেবাগুলি আপনার আঙ্গুলের নাগালে",
            copy: "কপি",
            call: "কল",
            clear: "মুছে ফেলুন",
            logout: "লগআউট",
            callHistory: "কল ইতিহাস",
            addedServices: "যোগ করা সেবা",

            nationalTitle: "জাতীয় জরুরি নম্বর",
            nationalSubtitle: "জাতীয় জরুরি",
            nationalCategory: "সব",

            policeTitle: "পুলিশ হেল্পলাইন",
            policeSubtitle: "পুলিশ",
            policeCategory: "পুলিশ",

        consumerTitle: "ভোক্তা অধিকার কার্যালয়",
        consumerSubtitle: "ভোক্তা অধিকার হেল্পলাইন",
        consumerCategory: "সরকারি",    

            fireTitle: "ফায়ার সার্ভিস নম্বর",
            fireSubtitle: "ফায়ার সার্ভিস",
            fireCategory: "আগুন",

            ambulanceTitle: "অ্যাম্বুলেন্স সেবা",
            ambulance: "অ্যাম্বুলেন্স",
            health: "স্বাস্থ্য",

            womenTitle: "মহিলা ও শিশু হেল্পলাইন",
            women: "মহিলা ও শিশু হেল্পলাইন",
            help: "সহায়তা",

            antiTitle: "দুর্নীতি প্রতিরোধ হেল্পলাইন",
            anti: "দুর্নীতি প্রতিরোধ",
            govt: "সরকারি",

            electricTitle: "বিদ্যুৎ হেল্পলাইন",
            electric: "বিদ্যুৎ বিভ্রাট",
            electricity: "বিদ্যুৎ",

            bracTitle: "ব্র্যাক হেল্পলাইন",
            brac: "ব্র্যাক",
            ngo: "এনজিও",

            railTitle: "বাংলাদেশ রেলওয়ে হেল্পলাইন",
            rail: "বাংলাদেশ রেলওয়ে",
            travel: "পরিবহন"
        }
    };

window.logout = function () {
    localStorage.clear(); // সব clean করে দেবে
    window.location.replace("login.html"); // safe redirect
};


window.openDetails = function(service){
    window.location.href = "details.html?service=" + service;
}

    function applyLanguage(lang) {
        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            if (translations[lang] && translations[lang][key]) {
                el.innerText = translations[lang][key];
            }
        });

        localStorage.setItem("lang", lang);
    }

    const savedLang = localStorage.getItem("lang") || "en";
    if (langSelect) {
        langSelect.value = savedLang;
        applyLanguage(savedLang);

        langSelect.addEventListener("change", function () {
            applyLanguage(this.value);
        });
    }

    // ================= HISTORY =================
    function getHistory() {
        return JSON.parse(localStorage.getItem("callHistory")) || [];
    }

    function saveHistory(history) {
        localStorage.setItem("callHistory", JSON.stringify(history));
    }

    function addCallHistory(name, num, serviceKey = "general") {
    const history = JSON.parse(localStorage.getItem("callHistory")) || [];

    const now = new Date();

    history.push({
        id: Date.now(),
        service: serviceKey, // 🔥 important
        name,
        number: num,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString()
    });

    localStorage.setItem("callHistory", JSON.stringify(history));
}

    function renderHistory() {
        const historyList = document.getElementById("history-list");
        if (!historyList) return;

        historyList.innerHTML = "";

        getHistory().forEach(item => {
            const li = document.createElement("li");

            li.className = "flex justify-between items-center bg-gray-100 p-2 rounded";

            li.innerHTML = `
                <div>
                    <p class="font-semibold">${item.name} - ${item.number}</p>
                    <p class="text-xs text-gray-500">${item.date} | ${item.time}</p>
                </div>

                <button onclick="deleteHistory(${item.id})"
                    class="bg-red-500 text-white px-2 py-1 rounded">
                    Delete
                </button>
            `;

            historyList.appendChild(li);
        });
    }

    window.deleteHistory = function (id) {
        let history = getHistory();
        history = history.filter(item => item.id !== id);
        saveHistory(history);
        renderHistory();
    };

    window.clearHistory = function () {
        localStorage.removeItem("callHistory");
        renderHistory();
    };

    // ================= COPY =================
    window.copyNumber = function (event, num) {
        if (event) event.stopPropagation();

        navigator.clipboard.writeText(num).then(() => {
            copyCount++;
            updateCounts();
            addCallHistory("Copied", num);
            alert("Copied: " + num);
        });
    };

    // ================= CALL =================
    window.makeCall = function (event, name, num, serviceKey = "general") {
    if (event) event.stopPropagation();

    if (coinCount < 20) {
        alert("Not enough coins!");
        return;
    }

    coinCount -= 20;
    updateCounts();

    addCallHistory(name, num, serviceKey); // 🔥 pass serviceKey

    alert("Calling " + name + " : " + num);

    window.location.href = "tel:" + num;
};

    // ================= USER SERVICES =================
    function renderUserServices() {
        const container = document.getElementById("custom-services");
        if (!container) return;

        container.innerHTML = "";

        const services = JSON.parse(localStorage.getItem("services")) || [];

        services.forEach(service => {
            const div = document.createElement("div");
            div.className = "bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-md p-4";

            div.innerHTML = `
                <h3 class="font-bold">${service.name}</h3>
                <p class="text-lg font-semibold mt-2">${service.number}</p>

                <span class="bg-blue-100 text-black px-2 py-1 rounded text-sm">
                    ${service.category}
                </span>

                <div class="mt-4 flex space-x-2">
                    <button class="bg-gray-200 px-4 py-2 rounded flex-1"
                        onclick="copyNumber(event, '${service.number}')">
                        Copy
                    </button>

                    <button class="bg-green-500 text-white px-4 py-2 rounded flex-1"
                        onclick="makeCall(event, '${service.name}', '${service.number}')">
                        Call
                    </button>
                </div>
            `;

            container.appendChild(div);
        });
    }

    // ================= SEARCH =================
    const searchInput = document.getElementById("searchInput");

    if (searchInput) {
        searchInput.addEventListener("keyup", function () {
            const value = this.value.toLowerCase();

            const cards = document.querySelectorAll(".service-card, #custom-services div");

            cards.forEach(card => {
                const text = card.innerText.toLowerCase();
                card.style.display = text.includes(value) ? "block" : "none";
            });
        });
    }

    // ================= INIT =================
    renderHistory();
    renderUserServices();
    updateCounts();

});