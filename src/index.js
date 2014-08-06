function generateGrid(id, width, height, matrix) {
	var squareSize = 36.5;
	var iN = matrix[0].length;
	var jN = matrix.length;
	var x = d3.scale.linear()
		.domain([0, iN])
		.range([squareSize/2, squareSize * iN]);

	// we may need this
	var y = d3.scale.linear()
		.domain([0, jN])
		.range([squareSize/2, squareSize * jN]);

	var colors = {
		selected: 'rgb(0, 255, 255)',
		notSelected: 'rgb(255, 255, 255)'
	};

	var grid = d3.select(id)
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.attr("class", "chart");

	var row = grid.selectAll(".row")
		.data(matrix)
		.enter().append("svg:g")
		.attr("class", "row");

	var cols = row.selectAll(".cell")
		.data(function (d) { return d; })
		.enter().append("svg:rect")
		.attr("class", "cell")
		.attr("x", function(d, i) { return x(i); })
		.attr("y", function(d, i, j) { return x(j); })
		.attr("width", function() { return squareSize; })
		.attr("height", function() { return squareSize; })
		.on('click', function() {
			if (d3.select(this).style('fill') !== colors.selected)
				d3.select(this)
					.style('fill', colors.selected);
			else
				d3.select(this)
					.style('fill', colors.notSelected);
		})
		.style("fill", function (d) {
			return d ? 'gray' : 'white';
		})
		.style("stroke", '#555');

	// d3.selectAll('.cell')
	// 	.each(function (d, i) {
	// 		d3.select(this);
	// 	});

	return cols;
}

var path = [
	[1,2],
	[1,1],
];
// 	[2,1],
// 	[3,1],
// 	[3,2],
// 	[4,2]
// ];



function coordsToMatrix (coords, mi, mj) {
	var matrix = [];

	for (var i = 0; i < mi; i++) {
		matrix.push(new Array(mj));
		for (var j = 0; j < mj; j++) {
			matrix[i][j] = 0;
		}
	}

	for (var i = 0, N = coords.length; i < N; i++) {
		matrix[coords[i][0]][coords[i][1]] = 1;
	}

	return matrix;
}


function highlightPath (cols, path) {
	cols
		.data(function (d, i) { return d; })
		.style('fill', function (d, i, j){
			for (var k in path)
				if (path[k][0] === i && path[k][1] === j)
					return 'red';
		});
}
