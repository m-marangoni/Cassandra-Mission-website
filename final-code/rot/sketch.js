


//code based on the work of https://www.openprocessing.org/user/164156
var grid = [];
var oldGrid;
const res = 1800, scl = 2.5;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	fill(0);
  frameRate(20);
	rect(0, 0, windowWidth * scl, windowHeight * res);
	for(var x = 0; x < res; x++){
		grid.push([]);
		for(var y = 0; y < res; y++){
			if(random() < 0.0001){
				grid[x].push(1);
			} else{
				grid[x].push(0);
			}
		}
	}
	copyGrid();
	noStroke();
}

function draw() {

	for(var x = 0; x < res; x++){
		for(var y = 0; y < res; y++){
			const cell = grid[x][y];
			if(n4(x, y) == 1 && n8(x, y) < 4 && cell == 0 && random() < 0.04){
				grid[x][y] = 1;
              let rand = random(0, 100);
              let rand2 = random(0.5, 2);
				fill(rand + 50,125,0, rand);
				circle(x*scl, y*scl, scl* rand2, scl *rand2);
             
              fill(0,145,180, rand);
				circle(x*scl - rand2*2, y*scl -rand2, scl, scl);
               fill(230, rand)
                circle(x*scl, y*scl, scl, scl+rand2);
            
			}
		}
	}
	copyGrid();
}

function n8(x, y){
	var r = 0;
	if(x > 0)       {r += oldGrid[x - 1][y];}
	if(x < res - 1) {r += oldGrid[x + 1][y];}
	if(y > 0)       {r += oldGrid[x][y - 1];}
	if(y < res - 1) {r += oldGrid[x][y + 1];}
	if(x > 0 && y > 0)             {r += oldGrid[x - 1][y - 1];}
	if(x < res - 1 && y < res - 1) {r += oldGrid[x + 1][y + 1];}
	if(x < res - 1 && y > 0)       {r += oldGrid[x + 1][y - 1];}
	if(x > 0 && y < res - 1)       {r += oldGrid[x - 1][y + 1];}
	return r;
}
 
function n4(x, y){
	var r = 0;
	if(x > 0)       {r += oldGrid[x - 1][y];}
	if(x < res - 1) {r += oldGrid[x + 1][y];}
	if(y > 0)       {r += oldGrid[x][y - 1];}
	if(y < res - 1) {r += oldGrid[x][y + 1];}
	return r;
}

function copyGrid(){
	oldGrid = [];
	for(var i = 0; i < grid.length; i++){
		oldGrid.push([...grid[i]]);
	}
  
 
}


function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	background(0)
  }