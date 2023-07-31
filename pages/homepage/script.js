const apiKey = "e8b7191f2c7643d99c115ffb2b1e50b2";
let gameData = []; //Global variable stores the game data

function renderCards(gameData) {
  const cardContainer = document.querySelector(".card-container");
  cardContainer.innerHTML = "";

  gameData?.forEach((game, index) => {
    const card = document.createElement("div");
    card.classList.add("card1");

    const cardContent = `
       
    <img src="${game.background_image}" class="card-img-top" alt="Card image" />
      <img class="heart" src="../assets/Heart.svg" alt="" />
      <div class="card-body">
        <div class="card-title">
          <h5 class="game-name">${game.name}</h5>
          <p class="number">#${index + 1}</p>
        </div>
        <div class="card-info">
          <div class="gameinfo">
            <p class="release-date">
              Release date: <span class="date">${game.released}</span>
            </p>
            <div class="card-icons">
            <img
              src="../assets/playstation.svg"
              alt="playstationicon"
              class="icons"
            />
            <img src="../assets/xbox.svg" alt="xboxicon" class="icons" />
            <img
              src="../assets/windows.svg"
              alt="windowsicon"
              class="icons"
            />
            <img
              src="../assets/switch.svg"
              alt="switchicon"
              class="icons"
            />
          </div>
            
          </div>
          <p class="genres">
              Genres: <span class="genre">'${game.genres
                .map((genre) => genre.name)
                .join(", ")}'</span>
            </p>
        </div>
      </div>
      `;

    card.innerHTML = cardContent;
    cardContainer.appendChild(card);
  });
}

fetch(`https://api.rawg.io/api/games?key=${apiKey}`)
  .then((response) => response.json())
  .then((data) => {
    gameData = data.results; //store game data in the global variable
    console.log(gameData); // show game data on the console

    renderCards(gameData); //Render all cards initially before any searches
  })
  .catch((error) => {
    console.error(error);
  });

const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", function () {
  const searchInput = document.getElementById("search-input");
  const searchTerm = searchInput.value.toLowerCase().trim();

  if (searchTerm === "") {
    renderCards(gameData);
  } else {
    const filteredGames = gameData.filter((game) =>
      game.name.toLowerCase().includes(searchTerm)
    );
    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.toLowerCase().trim();
      const filteredGames = gameData.filter((game) =>
        game.name.toLowerCase().includes(searchTerm)
      );
      displayDropdown(filteredGames);
    });
    renderCards(filteredGames);
  }
});

function toggleTheme() {
  const body = document.body;
  const logoimg = document.getElementById("logoimg");
  const themeSwitch = document.getElementById("themeToggle");

  if (body.classList.contains("light-theme")) {
    body.classList.remove("light-theme");
    logoimg.src = "../homepage/Theme=Dark.png";
    themeSwitch.src = "../assets/On.svg";
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.add("light-theme");
    logoimg.src = "../homepage/Theme=Light.png";
    themeSwitch.src = "../assets/Off.svg";
    localStorage.setItem("theme", "light");
  }
}
// // Attach a click event listener to the themeToggle element
// themeToggle.addEventListener("click", toggleTheme);
document.addEventListener("DOMContentLoaded", function () {
  var themeToggle = document.getElementById("themeToggle");
  themeToggle.addEventListener("click", toggleTheme);
});

// Check user preference for theme in local storage and apply it
const preferredTheme = localStorage.getItem("theme");
if (preferredTheme === "dark") {
  toggleTheme(); // Apply dark mode if it was the last saved preference
}
