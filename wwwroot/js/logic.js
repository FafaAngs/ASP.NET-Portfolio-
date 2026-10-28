let board;
let score = 0;
const rows = 4;
const columns = 4;


// This variables will be used to monitor if the user already won once in the value of 2048, 4096, or 8192
// If one of these variables value became true, it means the player already won once in specific values

let is2048Exist = false;
let is4096Exist = false;
let is8192Exist = false;


function setGame() {
    board = Array.from({ length: rows }, () => Array(columns).fill(0));
    const boardElement = document.getElementById("board");
    boardElement.replaceChildren();

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            const tile = document.createElement("div");
            tile.id = `${r}-${c}`;
            tile.setAttribute("role", "gridcell");
            updateTile(tile, 0);
            boardElement.append(tile);
        }
    }

    setTwo();
    setTwo();
    render();
}

function updateTile(tile, num) {
    tile.textContent = num || "";
    tile.className = "tile";
    if (num > 0) {
        tile.classList.add(`x${Math.min(num, 8192)}`);
        tile.setAttribute("aria-label", num.toString());
    } else {
        tile.setAttribute("aria-label", "empty");
    }
}
window.addEventListener("load", setGame);
document.addEventListener("keydown", handleSlide);
document.getElementById("restart-button").addEventListener("click", restartGame);
document.querySelectorAll("[data-direction]").forEach((button) => {
    button.addEventListener("click", () => move(button.dataset.direction));
});

let touchStart;
const gameBoard = document.getElementById("board");
gameBoard.addEventListener("touchstart", (event) => {
    touchStart = event.changedTouches[0];
}, { passive: true });
gameBoard.addEventListener("touchend", (event) => {
    if (!touchStart) return;
    const touchEnd = event.changedTouches[0];
    const horizontal = touchEnd.clientX - touchStart.clientX;
    const vertical = touchEnd.clientY - touchStart.clientY;
    if (Math.max(Math.abs(horizontal), Math.abs(vertical)) < 30) return;
    move(Math.abs(horizontal) > Math.abs(vertical) ? (horizontal > 0 ? "right" : "left") : (vertical > 0 ? "down" : "up"));
    touchStart = undefined;
}, { passive: true });

function handleSlide(event) {
    const directions = { ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up", ArrowDown: "down" };
    if (directions[event.code]) {
        event.preventDefault();
        move(directions[event.code]);
    }
}

function move(direction) {
    const before = JSON.stringify(board);
    if (direction === "left") slideLeft();
    if (direction === "right") slideRight();
    if (direction === "up") slideUp();
    if (direction === "down") slideDown();

    if (JSON.stringify(board) !== before) setTwo();
    render();
    checkWin();
    if (hasLost()) showMessage("No moves left. Start a new game to try again.");
}

function render() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            updateTile(document.getElementById(`${r}-${c}`), board[r][c]);
        }
    }
    document.getElementById("score").textContent = score;
}

function showMessage(message) {
    document.getElementById("game-message").textContent = message;
}

function slideLeft(){

	for(let r=0; r <rows;r++){

		let row  = board[r];
		row = slide(row);
		board[r] = row;
		

			for(let c = 0; c<columns;c++){
				let tile = document.getElementById(r.toString()+"-"+c.toString());
				let num=board[r][c];
				updateTile(tile,num);


			}

		
		
	}
}

function slideRight(){

	for(let r=0; r <rows;r++){

		let row  = board[r];
		row.reverse();
		row = slide(row);
		row.reverse();
		board[r] = row;
		

			for(let c = 0; c<columns;c++){
				let tile = document.getElementById(r.toString()+"-"+c.toString());
				let num=board[r][c];
				updateTile(tile,num);


			}

		
		
	}
}


function slideUp(){

	for(let c=0; c <columns;c++){

		let col  =[  board[0][c],board[1][c],board[2][c],board[3][c] ];
		
		col = slide(col);
		

			for(let r = 0; r<rows;r++){
				board[r][c] =col[r];
				let tile = document.getElementById(r.toString()+"-"+c.toString());
				let num=board[r][c];
				updateTile(tile,num);


			}

		
		
	}
}

function slideDown(){

	for(let c=0; c <columns;c++){

		let col  =[  board[0][c],board[1][c],board[2][c],board[3][c] ];

		col.reverse();
		
		col = slide(col);
		col.reverse();
		

			for(let r = 0; r<rows;r++){
				board[r][c] =col[r];
				let tile = document.getElementById(r.toString()+"-"+c.toString());
				let num=board[r][c];
				updateTile(tile,num);


			}

		
		
	}
}

function hasEmptyTile(){

	for(let r=0; r <rows;r++){
		for(let c=0; c<columns; c++){

			if(board[r][c]==0){
				return true;
			}

		}
	}
	return false;

}
function setTwo(){
	if(hasEmptyTile() == false){
		return;
	}

	let found = false;
	while(found == false){

		// This will generate a random value based on the rows value (0-3)
		// [random r]
		let r = Math.floor(Math.random() * rows); 
		// [random c]
		let c = Math.floor(Math.random() * columns); 

		// if(board[random r][random c] == 0)
		if(board[r][c] == 0){

			// If the tile is an empty tile, we convert the empty tile to 2 (0 -> 2)
			board[r][c] = 2;
			let tile = document.getElementById(r.toString() + "-" + c.toString());

			updateTile(tile, 2);

			found = true;
		}	
	}
}

function checkWin(){
	for(let r=0; r<rows; r++){
		for(let c=0; c<columns; c++){
			if(board[r][c] == 2048 && is2048Exist == false){
				showMessage("You reached 2048. Great work!");
				is2048Exist = true;
			}
			else if(board[r][c] == 4096 && is4096Exist == false){
				showMessage("You reached 4096. Keep going!");
				is4096Exist = true;
			}
			else if(board[r][c] == 8192 && is8192Exist == false){
				showMessage("You reached 8192. Incredible!");
				is8192Exist = true;
			}
		}
	}
}


function hasLost(){

	for(let r=0; r<rows; r++){
		for(let c=0; c<columns; c++){

			if(board[r][c] == 0){
				return false;
			}

			
			const currentTile = board[r][c];
			
			if( 			
							    
				r > 0 && board[r-1][c] === currentTile || // to check if the current tile matches to the upper tile
				r < 3 && board[r+1][c] === currentTile || // to check if the current tile matches to the lower tile
				c > 0 && board[r][c-1] === currentTile || // to check if the current tile matches to the left tile
				c < columns - 1 && board[r][c+1] === currentTile // to check if the current tile matches to the right tile
			){
				return false;
			}
			// No possible moves - meaning true, the user has lost.
			
				
		}



	}

	

	return true;
}



function restartGame(){
    score = 0;
    is2048Exist = false;
    is4096Exist = false;
    is8192Exist = false;
    showMessage("");
    setGame();
}




function filterZero(row){
	return row.filter(num=>num!=0);
}


function slide(tiles){


    // purpose of this method is to disregard the zero
    // [2, 0, 2, 2] >> [2, 2, 2]
    tiles = filterZero(tiles);

    for(let i = 0; i < tiles.length - 1; i++){

        if(tiles[i] == tiles[i+1]) { // [i+2] this means the tile if its the same value 
                                     //true
            tiles[i] = tiles[i] * 2; // multiple itself
            tiles[i+1] = 0;
            score += tiles[i];

        }
    }

    tiles = filterZero(tiles); 

    while(tiles.length < columns){
        tiles.push(0);
    }
    return tiles;
}
