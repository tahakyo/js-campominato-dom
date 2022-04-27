// Consegna:
// Generare una griglia di gioco quadrata in cui ogni cella contiene un numero compreso tra 1 e 100.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro.

// consegna ++ 
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. *
// I numeri nella lista delle bombe non possono essere duplicati.*
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

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
    // generare 16 bombe: 16 numeri casulai compres tra 1 e cellNumber
        const bombsNumber = 16;
        const bombsArray = generateUniqueRndmNumbers (bombsNumber, cellNumber);
        const safeCellsArray = [];
        console.log(bombsArray);
        const WinTries = cellNumber - bombsNumber ;

    // generare le celle da 1 a 100
    for (let i = 1; i <= cellNumber; i++) {
        const newItem = generateGridItem(i, cellNumberInRow);
        // aggiungo la function cell clicked
        newItem.addEventListener("click", cellClicked);
        // appendere la cella generata al contenitore
        grid.append(newItem);

    }
    function cellClicked() {
        // prelevare il numero della cliccata
        console.log(this);
        const clickedNumber = parseInt (this.querySelector("span").textContent);
        // se il numero della cella è presente nell'array delle bombe
        if (bombsArray.includes(clickedNumber)) {
            // la cella diventa rossa
            this.classList.add('bomb');
            // stampare il numero di tentativi azzeccati (punteggio)
            // fine del gioco
            alert('hai perso')
        } else {
            // la cella diventa blue
            this.classList.add('clicked');
            // la cella safe non deve essere cliccata due volte
            this.style.pointerEvents = "none";
            // il numero della cella viene pushato dentro l'array safeCellsArray
            safeCellsArray.push(clickedNumber);
            console.log(safeCellsArray);
            // se la lunghezza del safeCellsArray è uguale al winTries
            if (safeCellsArray.length >= WinTries) {
                // fine del gioco 
                alert('hai vinto');
            }
        }
    }
}

// creo una function che colora di blu la cella quando viene cliccata

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

// UTILITY FUNCTIONS
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

/**
 * Description : la funzione genera numeri random non ripetuti
 *
 * @param {Number} numberQuantity --> la quantità dei numeri da generare
 * @param {Number} maxLimit --> il limite massimo di range dei numeri
 * @returns {Array} --> array dei numeri random non ripetuti
 */
function generateUniqueRndmNumbers (numberQuantity, maxLimit) {
    const numbersArray = [];
    while (numbersArray.length < numberQuantity) {
        const rndmNumbers = getRndInteger (1, maxLimit);
        if (!numbersArray.includes(rndmNumbers)) {
            numbersArray.push(rndmNumbers);
        }
    }
    return numbersArray;
}
