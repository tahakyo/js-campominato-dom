// Consegna:
// Generare una griglia di gioco quadrata in cui ogni cella contiene un numero compreso tra 1 e 100.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro.


// Al click sul bottone Play far partire il gioco
const playButton = document.getElementById("play-btn");
playButton.addEventListener("click", startGame);


// Main function
function startGame() {
    // Nascondere la scritta con classe "hidden"
    // Far vedere il contenitore della griglia, togliendo la classe "hidden"
    const title = document.getElementById("title");
    const grid = document.getElementById("grid");
    title.classList.add("hidden");
    grid.classList.remove("hidden");
    grid.innerHTML = "";
    // Prelevare la scelta della difficoltà dell'utente
    const difficulty = parseInt(document.getElementById('level').value);
    let cellNumber = 0;
    let cellNumberInRow = 0;
    if (difficulty === 1) {
        cellNumber = 100;
        cellNumberInRow = 10;
    } else if (difficulty === 2) {
        cellNumber = 81;
        cellNumberInRow = 9;
    } else {
        cellNumber = 49;
        cellNumberInRow = 7;
    }
    // generare le celle da 1 a 100
    for (let i = 1; i <= cellNumber; i++) {
        const newItem = generateGridItem(i, cellNumberInRow);
        // aggiungo la function cell clicked
        newItem.addEventListener("click", cellClicked);
        // appendere la cella generata al contenitore
        grid.append(newItem);

    }
}

// creo una function che colora di blu la cella quando viene cliccata
function cellClicked() {
    this.classList.add("clicked");
}

// creare una function che genera gli items della grid
function generateGridItem(gridNumber, cellsInRow) {
    // creare l'elemento html
    const gridItem = document.createElement("div");
    // aggiungere la classe grid-item
    gridItem.classList.add("grid-item");
    // settare le dimensioni delle celle corrispondenti
    gridItem.style.width = `calc(100% / ${cellsInRow})`;
    gridItem.style.height = `calc(100% / ${cellsInRow})`;
    // inserire lo span con il numero di cella corrispondente
    gridItem.innerHTML = `<span>${gridNumber}</span>`;
    return gridItem;
}


