let board;
let score =0;
let rows=4;
let columns =4;


// This variables will be used to monitor if the user already won once in the value of 2048, 4096, or 8192
// If one of these variables value became true, it means the player already won once in specific values

let is2048Exist = false;
let is4096Exist = false;
let is8192Exist = false;


function setGame(){
	board=

	  [ [ 0,0,0,0],
		[ 0,0,0,0],
		[ 0,0,0,0],
		[ 0,0,0,0]

		];

	for(let r=0; r <rows;r++){
		for(let c=0; c<columns; c++){
			let tile = document.createElement("div");
			tile.id = r.toString() +"-"+c.toString();
			let num = board[r][c];
			updateTile(tile,num);
			document.getElementById("board").append(tile);
		}
	}


	setTwo();
	setTwo();
}

function updateTile(tile,num){
	tile.innerText = "";
	tile.classList.value="";
	tile.classList.add("tile");
	if(num>0){
		tile.innerText = num.toString();
		if(num<8192){
			tile.classList.add("x"+num.toString());
		}
		else{
			tile.classList.add("8192");
		}
	}
}
window.onload = function(){
setGame();
}

function handleSlide(e){
	console.log(e.key);
	if(["ArrowLeft", "ArrowRight","ArrowUp","ArrowDown"].includes(e.code)){

		

		if(e.code=="ArrowLeft"){
			slideLeft();
			setTwo();

		}
		if(e.code=="ArrowRight"){
			slideRight();
			setTwo();
		}
		if(e.code=="ArrowUp"){
			slideUp();
			setTwo();
		}
		if(e.code=="ArrowDown"){
			slideDown();
			setTwo();
		}
	}

	checkWin();
  document.getElementById("score").innerText = score;
		if(hasLost()==true){
			setTimeout(()=> {alert("Game Over!You have lost the game .Game will restart");restartGame();alert("Click any arrow key to restart")},100);


		}
}




document.addEventListener("keydown",handleSlide);

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

			// <div class="x2">2</div>
			tile.innerText = "2";
			tile.classList.add("x2");

			found = true;
		}	
	}
}

function checkWin(){
	for(let r=0; r<rows; r++){
		for(let c=0; c<columns; c++){
			if(board[r][c] == 2048 && is2048Exist == false){
				alert("You Win! You got the 2048");
				is2048Exist = true;
			}
			else if(board[r][c] == 4096 && is4096Exist == false){
				alert("You are unstoppable at 4096! You are fantastically unstoppable!");
				is4096Exist = true;
			}
			else if(board[r][c] == 8192 && is8192Exist == false){
				alert("Victory! You have reached 8192! You are incredibly awesome!");
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
				c > 3 && board[r][c+1] === currentTile // to check if the current tile matches to the right tile
			){
				return false;
			}
			// No possible moves - meaning true, the user has lost.
			
				
		}



	}

	

	return true;
}



function restartGame(){
	board=

	  [ [ 0,0,0,0],
		[ 0,0,0,0],
		[ 0,0,0,0],
		[ 0,0,0,0]

		];



      score=0;
	  setTwo();


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