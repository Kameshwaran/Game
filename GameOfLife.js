function forEach(array, action) {
  for (var i = 0; i < array.length; i++)
    action(array[i]);
}
var Grid = function(size){
	this.size = size
	this.arr = new Array(size);
	for(var i=0; i < this.arr.length; i++){ 
		this.arr[i] = new Array(size)
	}
	for(var i=0; i < this.size; i++){
		for(var j=0; j < this.size; j++){
			this.arr[i][j] = _.sample([0,1]);  //initalizing with sample data
		}
	}
	return this;
}

Grid.prototype.play = function(){
	temp_grid = new Grid(this.size);
	for(var i=0; i< this.size; i++){
		for(var j=0; j< this.size ; j++){
			neighbours = this.get_numbers_of_alive_neighbours(i,j);
			if(grid.arr[i][j] == 1){     // if a cell alive
				if((neighbours == 2)||(neighbours == 3)){  //cell has 2 or 3 neighbours
					temp_grid.arr[i][j] = 1;
				}
				else if((neighbours >3)||(neighbours <2)){ //cell has more than 3 or less than 2 neighbours
					temp_grid.arr[i][j] = 0;
				}
				else{	
					temp_grid.arr[i][j] = grid.arr[i][j];
				}
			}
			else{  // if cell is dead
				if(neighbours == 3){  // cell has exactly three neighbours
					temp_grid.arr[i][j] = 1;
				}
				else{ 
					temp_grid.arr[i][j] = grid.arr[i][j];
				}
			}
		}
	}
	this.arr = temp_grid.arr;
}

Grid.prototype.get_numbers_of_alive_neighbours = function (row,column){
	neighbours = [];
	if(row != 0){
		neighbours.push(grid.arr[row-1][column-1])
		neighbours.push(grid.arr[row-1][column])
		neighbours.push(grid.arr[row-1][column+1])
	}
	neighbours.push(grid.arr[row][column-1])
	neighbours.push(grid.arr[row][column+1])
	if(row != this.size-1){
		neighbours.push(grid.arr[row+1][column-1])
		neighbours.push(grid.arr[row+1][column])
		neighbours.push(grid.arr[row+1][column+1])
	}
	neighbours = _.filter(neighbours,function(value){
		return (value != undefined)&&(value!=0);
	});
	return neighbours.length;
}

Grid.prototype.appendToDOM = function(){
	$(".game-board").html("");	
	var table = "<table border=1>"
	for( var i = 0; i < this.size; i++){
		var row = "<tr>"
		for(var j = 0; j < this.size; j++){
			if(this.arr[i][j] == 1){
				row = row + "<td class='color'></td>"
			}
			else{
				row = row + "<td></td>"
			}
		}
		row = row+ "</tr>"
		table = table + row;
	}
	table = table + "</table>"
	$(".game-board").html(table);
}