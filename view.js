$(document).ready(function(){
	grid = new Grid(10); //pass the size of the Grid
	setInterval(function(){
		grid.play();
		grid.appendToDOM();
	},1000);
});