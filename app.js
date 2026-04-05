// =====================
// STATE
// =====================
let players = JSON.parse(localStorage.getItem("players")) || [];
let runningNumber = players.length + 1;

// =====================
// DOM ELEMENTS
// =====================
//const form = document.getElementById("addPlayerForm");
//const input = document.getElementById("playerName");
const list = document.getElementById("players");
const select = document.getElementById("playerCount");
const playersContainer = document.getElementById("playerInputs");

// =====================
// EVENT LISTENERS
// =====================
//form.addEventListener("submit", handleAddPlayer);
select.addEventListener("change", handlePlayerCountChange);

// =====================
// EVENT HANDLERS
// =====================
function handleAddPlayer(e) {
    e.preventDefault();

    const name = input.value.trim();
    if (!name) return;

    players.push({
        name,
        score: 0,
        runningNumber
    });

    runningNumber++;
    input.value = "";

    savePlayers();
    renderPlayers();
}

function handlePlayerCountChange() {
    const count = Number(select.value);
    generateInputs(count);
}

// =====================
// RENDER FUNCTIONS
// =====================
function renderPlayers() {

    list.innerHTML = "";

    players.forEach(player => {
        const li = document.createElement("li");
        li.textContent = `${player.name}: ${player.score}, ${player.runningNumber}`;
        list.appendChild(li);
    });
}

// =====================
// UI FUNCTIONS
// =====================
function generateInputs(count) {
    playersContainer.innerHTML = "";

    for (let i = 0; i < count; i++) {
        const input = document.createElement("input");
        input.placeholder = `Player ${i + 1}`;
        input.className = "player-input";

        playersContainer.appendChild(input);
    }
}

// =====================
// DATA FUNCTIONS
// =====================
function getPlayersFromInputs() {
    const inputs = document.querySelectorAll(".player-input");

    return Array.from(inputs)
        .map(input => input.value.trim())
        .filter(name => name)
        .map(name => ({
            name,
            score: 0
        }));
}

function savePlayers() {
    localStorage.setItem("players", JSON.stringify(players));
}

// =====================
// INIT
// =====================
function init() {
    select.value = "16";
    generateInputs(16);
    renderPlayers();
}

init();

//console.log(select.value);