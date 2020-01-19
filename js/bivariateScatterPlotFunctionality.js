var axes = [];
var minDistX = [];
var minDistY = [];
NUM_TICKS = 10;
TRANSLATE_AMT = 50;
WIDTH = 400;
HEIGHT = 220;

function addAxis (element) {
  if (document.getElementById(element).checked) {
    axes.push(element);
  }
  else {
    if (axes.indexOf(element) !== -1) {
      axes.splice(axes.indexOf(element), 1);
    }
  }
  // console.log("Axes: " + axes);
}

function validateScatterplot () {
  if (axes.length != 2) {
    var svg = d3.select("svg"), width = WIDTH, height = HEIGHT;
    svg.selectAll("g").remove()
    svg.selectAll("circle").remove()
    return;
  }
  else {
    generateScatterPlot();
  }
}

function generateScatterPlot () {
  // Uncheck the HTML check boxes.
  var boxes = document.getElementsByClassName('attr');
  for (var i = 0; i < boxes.length; i++) {
    // boxes[i].checked = false;
  }

  // Establish SVG and D3 variables.
  var svg = d3.select("svg"),
    width = WIDTH,
    height = HEIGHT;
  d3.csv("data/IMDB-Movie-Data.csv", function(error, data) {
    if (error) {
      throw error;
    }

  // Establish data and x/y scales.
  var dataTable = {
    'rank': data.map(function(d) { return d.Rank; }),
    'year': data.map(function(d) { return d.Year; }),
    'runtime': data.map(function(d) { return d.Runtime; }),
    'rating': data.map(function(d) { return d.Rating; }),
    'votes': data.map(function(d) { return d.Votes; }),
    'revenue': data.map(function(d) { return d.Revenue; }),
    'metascore': data.map(function(d) { return d.Metascore; }),
  }
  var genre = {
    'genre': data.map(function(d) { return d.Genre; }),
  }
  var genresList = ['action', 'adventure', 'animation', 'biography', 'comedy', 'crime', 'drama', 'horror', 'mystery', 'other'];
  var genresColors = ['#e6194b', '#f58231', '#ffe119', '#bfef45', '#3cb44b', '#42d4f4', '#4363d8', '#911eb4', '#f032e6', '#a9a9a9'];
  var titleTable = {
    'rank': 'Rank',
    'year': 'Year Released',
    'runtime': 'Runtime (in minutes)',
    'rating': 'Rating',
    'votes': 'Votes',
    'revenue': 'Revenue (in millions $)',
    'metascore': 'Metascore (0 if no score available)'
  }

  // Set up proper axes and data lists.
  var selectedX = dataTable[axes[0]];
  var selectedY = dataTable[axes[1]];
  // var selectedX = dataTable['rank'];
  // var selectedY = dataTable['runtime'];
  for (var i = 0; i < selectedX.length; i++) {
    selectedX[i] = parseFloat(selectedX[i]);
    selectedY[i] = parseFloat(selectedY[i]);
  }
  var x = d3.scaleLinear()
    .domain([d3.min(selectedX), d3.max(selectedX)])
    .range([0, width]);
  var y = d3.scaleLinear()
    .domain([d3.min(selectedY), d3.max(selectedY)])
    .range([height, 0])

  svg.selectAll("g").remove()
  svg.selectAll("circle").remove()

  // Establish 'g'.
  var g = svg.append("g")
            .attr("transform", "translate(" + TRANSLATE_AMT * 15.8 + "," + TRANSLATE_AMT + ")");
  // axes = [];

  // Render the two axes.
  g.append("g")
       .attr("transform", "translate(0," + height + ")")
       .call(d3.axisBottom(x).tickFormat(function(d){
           return d;
       }).ticks(NUM_TICKS))
       .append("text")
       .attr("y", 0)
       .attr("x", 300)
       .attr("text-anchor", "end")
       .attr("stroke", "black")
       .attr('class', 'xAxis');

 g.append("g")
      .call(d3.axisLeft(y).tickFormat(function(d){
          return d;
      }).ticks(NUM_TICKS))
      .append("text")
      .attr("transform", "rotate(-90)", 'translate(50, 0)')
      .attr("y", 6)
      .attr("dy", "-5.1em")
      .attr("text-anchor", "end")
      .attr("stroke", "black")

  // Plot the points on the graph.
  for (var i = 0; i < selectedX.length; i++) {
    minDistX[i] = selectedX[i] - d3.min(selectedX);
    minDistY[i] = selectedY[i] - d3.min(selectedY);
  }

  // Process the Genre data properly.
  gen = genre['genre'];
  for (var i = 0; i < gen.length; i++) {
    if (gen[i].indexOf(',') !== -1) {
      gen[i] = gen[i].substring(0, gen[i].indexOf(','))
    }
  }

  for (var i = 0; i < selectedX.length; i++) {
    minDistX[i] = minDistX[i]/d3.max(minDistX);
    minDistY[i] = minDistY[i]/d3.max(minDistY);
    point = svg.append("circle")
      .attr("cx", (minDistX[i] * width) + TRANSLATE_AMT * 15.8)
      .attr("cy", height - (minDistY[i] * height) + TRANSLATE_AMT)
      .attr("r", 2.5)
    for (var j = 0; j < gen.length; j++) {
      if (gen[i].toLowerCase() === genresList[j]) {
        point.style('fill', genresColors[j]);
      }
    }
  }

  });
}
