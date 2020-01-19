MARGIN = 50;
LINE_DIST = 150;
Y_1 = 580;
Y_2 = 717;
DIV_AMT = 5.6;
var genresList = ['action', 'adventure', 'animation', 'biography', 'comedy', 'crime', 'drama', 'horror', 'mystery', 'other'];

// Data generated from py/correlationCalculations.py, and stored in data/correlations.csv.
// "1" extended to "1.000000000" for greater readability.
correlationStrengths = [
  // Rank           Year        Runtime       Rating         Votes       Revenue      Metascore
  1.000000000, -0.308472365, -0.236891749, -0.235158243, -0.296847227, -0.27159246, -0.230521326, // Rank
  -0.308472365, 1.000000000, -0.099359032, -0.151538845, -0.364052001, -0.12679014, -0.024228666, // Year
  -0.236891749, -0.099359032, 1.000000000, 0.377634501, 0.379100167, 0.267952729, 0.154699208, // Runtime
  -0.235158243, -0.151538845, 0.377634501, 1.000000000, 0.515769624, 0.217653894, 0.539237891, // Rating
  -0.296847227, -0.364052001, 0.379100167, 0.515769624, 1.000000000, 0.639661397, 0.302549248, // Votes
  -0.27159246, -0.12679014, 0.267952729, 0.217653894, 0.639661397, 1.000000000, 0.160193158, // Revenue
  -0.230521326, -0.024228666, 0.154699208, 0.539237891, 0.302549248, 0.160193158, 1.000000000 // Metascore
];
// Correlations: Votes, Revenue, Rank, Year, Rating, Metascore, Runtime
var percs = [[], [], [], [], [], [], []];


// Find the greatest correlation pair in our dataset.
function getGreatestCorrelationPair () {
  for (var i = 0; i < correlationStrengths.length; i++) {
    if (correlationStrengths[i] == 1) {
      correlationStrengths.splice(i, 1);
    }
  }
  return d3.max(correlationStrengths);
}

function pcdUpdateGenresList (newGenres) {
  genresList = newGenres;
  console.log(genresList);
  drawPCDGraph();
}

// Render the Parallel Coordinates Display to the screen.
function drawPCDGraph () {
  var greatestPair = getGreatestCorrelationPair();
  var orderedCorrVals = ['votes', 'revenue', 'rank', 'year', 'rating', 'metascore', 'runtime'];

  var svg = d3.select("svg"),
    width = svg.attr("width") - MARGIN,
    height = svg.attr("height") - MARGIN;
  d3.csv("data/IMDB-Movie-Data.csv", function(error, data) {
    if (error) {
      throw error;
    }
    // Establish data.
    var dataTable = {
      'rank': data.map(function(d) { return parseFloat(d.Rank); }),
      'year': data.map(function(d) { return parseFloat(d.Year); }),
      'runtime': data.map(function(d) { return parseFloat(d.Runtime); }),
      'rating': data.map(function(d) { return parseFloat(d.Rating); }),
      'votes': data.map(function(d) { return parseFloat(d.Votes); }),
      'revenue': data.map(function(d) { return parseFloat(d.Revenue); }),
      'metascore': data.map(function(d) { return parseFloat(d.Metascore); }),
    }
    var genre = {
      'genre': data.map(function(d) { return d.Genre; }),
    }
    var genresColors = ['#e6194b', '#f58231', '#ffe119', '#bfef45', '#3cb44b', '#42d4f4', '#4363d8', '#911eb4', '#f032e6', '#a9a9a9'];

    // Process the Genre data properly.
    gen = genre['genre'];
    for (var i = 0; i < gen.length; i++) {
      if (gen[i].indexOf(',') !== -1) {
        gen[i] = gen[i].substring(0, gen[i].indexOf(','))
      }
    }
    // remove old data when reloading genre info about this graph.
    lines = svg.selectAll('line')._groups;
    lines = lines[0];
    for (var i = 0; i < lines.length; i++) {
      if (lines[i].attributes.owner != undefined) {
        if (lines[i].attributes.owner.value == 'pcd') {
          lines[i].attributes.x1.value = 999;
          lines[i].attributes.x2.value = 999;
          lines[i].attributes.y1.value = 999;
          lines[i].attributes.y2.value = 999;
        }
    }
  }

    // Calculate where each value should be rendered on screen.
    for (var i = 0; i < dataTable['votes'].length; i++) {
      percs[0][i] = (dataTable['votes'][i] - 178) / (1791916 - 178);
      percs[0][i] = (percs[0][i] * -730) + 746;
      percs[0][i] = (percs[0][i] / DIV_AMT) + Y_1;
      percs[1][i] = (dataTable['revenue'][i] - d3.min(dataTable['revenue'])) / d3.max(dataTable['revenue']);
      percs[1][i] = (percs[1][i] * -730) + 746;
      percs[1][i] = (percs[1][i] / DIV_AMT) + Y_1;
      percs[2][i] = dataTable['rank'][i] / d3.max(dataTable['rank']);
      percs[2][i] = (percs[2][i] * -730) + 746;
      percs[2][i] = (percs[2][i] / DIV_AMT) + Y_1;
      percs[3][i] = (dataTable['year'][i] - 2006) / (10);
      percs[3][i] = (percs[3][i] * -730) + 746;
      percs[3][i] = (percs[3][i] / DIV_AMT) + Y_1;
      percs[4][i] = ((dataTable['rating'][i] - 1.9) / (9 - 1.9));
      percs[4][i] = (percs[4][i] * -730) + 746;
      percs[4][i] = (percs[4][i] / DIV_AMT) + Y_1;
      percs[5][i] = dataTable['metascore'][i] / d3.max(dataTable['metascore']);
      percs[5][i] = (percs[5][i] * -730) + 746;
      percs[5][i] = (percs[5][i] / DIV_AMT) + Y_1;
      percs[6][i] = (dataTable['runtime'][i] - 66) / (191 - 66);
      percs[6][i] = (percs[6][i] * -730) + 746;
      percs[6][i] = (percs[6][i] / DIV_AMT) + Y_1;
    }
    // Render the lines to the right spot on screen.
    for (var i = 0; i < dataTable['votes'].length; i++) {
      point = svg.append('line')
        .attr('x1', 257.5 + 45).attr('x2', (LINE_DIST + 252.5 + 45))
        .attr('y1', (percs[0][i])).attr('y2', (percs[1][i]))
        .attr('stroke-width', '0.25')
        .attr('owner', 'pcd')
      colorLines(point, i, genresList, genresColors);
      point = svg.append('line')
        .attr('stroke-width', '0.25')
        .attr('owner', 'pcd')
        .attr('x1', 407.5 + 45).attr('x2', (LINE_DIST + 402.5 + 45))
        .attr('y1', (percs[1][i])).attr('y2', (percs[2][i]))
      colorLines(point, i, genresList, genresColors);
      point = svg.append('line')
        .attr('stroke-width', '0.25')
        .attr('owner', 'pcd')
        .attr('x1', 557.5 + 45).attr('x2', (LINE_DIST + 552.5 + 45))
        .attr('y1', (percs[2][i])).attr('y2', (percs[3][i]));
      colorLines(point, i, genresList, genresColors);
      point = svg.append('line')
        .attr('stroke-width', '0.25')
        .attr('owner', 'pcd')
        .attr('x1', 707.5 + 45).attr('x2', (LINE_DIST + 702.5 + 45))
        .attr('y1', (percs[3][i])).attr('y2', (percs[4][i]));
      colorLines(point, i, genresList, genresColors);
      point = svg.append('line')
        .attr('stroke-width', '0.25')
        .attr('owner', 'pcd')
        .attr('x1', 857.5 + 45).attr('x2', (LINE_DIST + 852.5 + 45))
        .attr('y1', (percs[4][i])).attr('y2', (percs[5][i]));
      colorLines(point, i, genresList, genresColors);
      point = svg.append('line')
        .attr('stroke-width', '0.25')
        .attr('owner', 'pcd')
        .attr('x1', 1007.5 + 45).attr('x2', (LINE_DIST + 1002.5 + 45))
        .attr('y1', (percs[5][i])).attr('y2', (percs[6][i]));
      colorLines(point, i, genresList, genresColors);
    }
    // Draw the axis text.
    for (var i = 0; i < 7; i++) {
      svg.append('line')
        .attr('stroke', 'black').attr('stroke-width', '4')
        .attr('x1', (LINE_DIST * i) + 300).attr('y1', Y_1)
        .attr('x2', (LINE_DIST * i) + 300).attr('y2', Y_2)
      svg.append("text")
        .text(orderedCorrVals[i])
        .attr('x', (LINE_DIST/1.05 * i) + 272.5 + 45).attr('y', 575)
        .attr('text-anchor', 'middle').attr('fill', 'black')
        .attr("class", "innerText")
      }
  });
}

function colorLines (point, i, genresList, genresColors) {
  for (var j = 0; j < gen.length; j++) {
    g = gen[i].toLowerCase()
    if (g === genresList[j]) {
      if (g === 'action') {
        point.attr('stroke', '#e6194b');
      }
      else if (g === 'adventure') {
        point.attr('stroke', '#f58231');
      }
      else if (g === 'animation') {
        point.attr('stroke', '#ffe119');
      }
      else if (g === 'biography') {
        point.attr('stroke', '#bfef45');
      }
      else if (g === 'comedy') {
        point.attr('stroke', '#3cb44b');
      }
      else if (g === 'crime') {
        point.attr('stroke', '#42d4f4');
      }
      else if (g === 'drama') {
        point.attr('stroke', '#4363d8');
      }
      else if (g === 'horror') {
        point.attr('stroke', '#911eb4');
      }
      else if (g === 'mystery') {
        point.attr('stroke', '#f032e6');
      }
      else if (g === 'fantasy' || g === 'sci-fi' || g === 'thriller' || g === 'romance') {
        point.attr('stroke', '#a9a9a9');
      }


    }
  }
}
