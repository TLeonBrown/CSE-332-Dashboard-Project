MARGIN = 100;
NUM_ATTRIBUTES = 7;
GRID_LEN = 32;
GRID_MARGIN = 262;
SQUARE_SIZE = 30;
COLOR_RANGE = [
  '#FF0000', '#FF1111', '#FF2222', '#FF3333', '#FF4444', '#FF5555', '#FF6666',
  '#FF7777', '#FF8888', '#FF9999', '#FFAAAA', '#FFBBBB', '#FFCCCC', '#FFDDDD',
  '#FFEEEE', '#FFFFFF', '#EEEEFF', '#DDDDFF', '#CCCCFF', '#BBBBFF', '#AAAAFF',
  '#9999FF', '#8888FF', '#7777FF', '#6666FF', '#5555FF', '#4444FF', '#3333FF',
  '#2222FF', '#1111FF', '#0000FF'
]
correlationStrengths = [];

//  Helper function to color the squares properly.
function findColorValue (number) {
  if (number > 0) {
    // Positive (red) number
    if (number > 0.99999) { return COLOR_RANGE[0]; }
    else if (number > 0.95) { return COLOR_RANGE[1]; }
    else if (number > 0.9) { return COLOR_RANGE[2]; }
    else if (number > 0.85) { return COLOR_RANGE[3]; }
    else if (number > 0.8) { return COLOR_RANGE[4]; }
    else if (number > 0.75) { return COLOR_RANGE[5]; }
    else if (number > 0.7) { return COLOR_RANGE[6]; }
    else if (number > 0.65) { return COLOR_RANGE[7]; }
    else if (number > 0.6) { return COLOR_RANGE[8]; }
    else if (number > 0.5) { return COLOR_RANGE[9]; }
    else if (number > 0.4) { return COLOR_RANGE[10]; }
    else if (number > 0.3) { return COLOR_RANGE[11]; }
    else if (number > 0.2) { return COLOR_RANGE[12]; }
    else if (number > 0.1) { return COLOR_RANGE[13]; }
    else { return COLOR_RANGE[14]; }
  }
  else if (number < 0) {
    // Negative (blue) number
    if (number < -0.99999) { return COLOR_RANGE[30]; }
    else if (number < -0.95) { return COLOR_RANGE[29]; }
    else if (number < -0.9) { return COLOR_RANGE[28]; }
    else if (number < -0.85) { return COLOR_RANGE[27]; }
    else if (number < -0.8) { return COLOR_RANGE[26]; }
    else if (number < -0.75) { return COLOR_RANGE[25]; }
    else if (number < -0.7) { return COLOR_RANGE[24]; }
    else if (number < -0.65) { return COLOR_RANGE[23]; }
    else if (number < -0.6) { return COLOR_RANGE[22]; }
    else if (number < -0.5) { return COLOR_RANGE[21]; }
    else if (number < -0.4) { return COLOR_RANGE[20]; }
    else if (number < -0.3) { return COLOR_RANGE[19]; }
    else if (number < -0.2) { return COLOR_RANGE[18]; }
    else if (number < -0.1) { return COLOR_RANGE[17]; }
    else { return COLOR_RANGE[16]; }
  }
  else {
    // Literally 0, return white.
    return COLOR_RANGE[15];
  }
}

// Main function to display the grid.
function draw10x10CorrelationMatrix () {
  var svg = d3.select("svg"),
    width = svg.attr("width") - MARGIN,
    height = svg.attr("height") - MARGIN;
  d3.csv("data/IMDB-Movie-Data.csv", function(error, data) {
    if (error) {
      throw error;
    }

    // Data generated from py/correlationCalculations.py, and stored in data/correlations.csv.
    correlationStrengths = [
      1, -0.308472365, -0.236891749, -0.235158243, -0.296847227, -0.27159246, -0.230521326,
      -0.308472365, 1, -0.099359032, -0.151538845, -0.364052001, -0.12679014, -0.024228666,
      -0.236891749, -0.099359032, 1, 0.377634501, 0.379100167, 0.267952729, 0.154699208,
      -0.235158243, -0.151538845, 0.377634501, 1, 0.515769624, 0.217653894, 0.539237891,
      -0.296847227, -0.364052001, 0.379100167, 0.515769624, 1, 0.639661397, 0.302549248,
      -0.27159246, -0.12679014, 0.267952729, 0.217653894, 0.639661397, 1, 0.160193158,
      -0.230521326, -0.024228666, 0.154699208, 0.539237891, 0.302549248, 0.160193158, 1
    ]
    // Get dataset information from the CSV file, parse it properly.
    var titleTable = ['rank', 'year', 'runtime', 'rating', 'votes', 'revenue', 'metascore'];
    var dataTable = {
      'rank': data.map(function(d) { return d.Rank; }),
      'year': data.map(function(d) { return d.Year; }),
      'runtime': data.map(function(d) { return d.Runtime; }),
      'rating': data.map(function(d) { return d.Rating; }),
      'votes': data.map(function(d) { return d.Votes; }),
      'revenue': data.map(function(d) { return d.Revenue; }),
      'metascore': data.map(function(d) { return d.Metascore; }),
    }
    for (var i = 0; i < dataTable['rank'].length; i++) {
      dataTable['rank'][i] = parseFloat(dataTable['rank'][i]);
      dataTable['year'][i] = parseFloat(dataTable['year'][i]);
      dataTable['runtime'][i] = parseFloat(dataTable['runtime'][i]);
      dataTable['rating'][i] = parseFloat(dataTable['rating'][i]);
      dataTable['votes'][i] = parseFloat(dataTable['votes'][i]);
      dataTable['revenue'][i] = parseFloat(dataTable['revenue'][i]);
      dataTable['metascore'][i] = parseFloat(dataTable['metascore'][i]);
    }

    // Render Grid Lines and Text
    for (var i = 0; i <= NUM_ATTRIBUTES; i++) {
      // Horizontal Grid Lines
      svg.append("line")
        .attr('stroke', 'black')
        .attr('stroke-width', '3')
        .attr('x1', GRID_MARGIN + 590)
        .attr('y1', (GRID_LEN * i) + GRID_MARGIN + 50)
        .attr('x2', width/5.5 + GRID_MARGIN + 554)
        .attr('y2', (GRID_LEN * i) + GRID_MARGIN + 50);
      // Vertical Grid Lines
      svg.append('line')
        .attr('stroke', 'black')
        .attr('stroke-width', '3')
        .attr('x1', (GRID_LEN * i) + GRID_MARGIN + 590)
        .attr('y1', GRID_MARGIN + 49)
        .attr('x2', (GRID_LEN * i) + GRID_MARGIN + 590)
        .attr('y2', width/5.5 + GRID_MARGIN + 14);
      // Horizontal Text
      svg.append('text')
        .text(titleTable[i])
        .attr('x', GRID_MARGIN + 580)
        .attr('y', (GRID_LEN * i) + GRID_MARGIN + 70)
        .attr('text-anchor', 'end')
        .attr('class', 'innerText')
    }

    // Render the colored squares.
    correlationIndex = 0;
    for (var i = 0; i < NUM_ATTRIBUTES; i++) {
      for (var j = 0; j < NUM_ATTRIBUTES; j++) {
        color = findColorValue(correlationStrengths[correlationIndex]);
        svg.append("rect")
          .attr('width', SQUARE_SIZE)
          .attr('height', SQUARE_SIZE)
          .attr('x', width - (GRID_LEN * i) + GRID_MARGIN - 653)
          .attr('y', (GRID_LEN * j) + GRID_MARGIN + 51)
          .attr('fill', color)
        correlationIndex += 1;
      }
    }

    // Create the correlation index on the right.
    for (var i = 0; i <= COLOR_RANGE.length; i++) {
      square = svg.append('rect')
        .attr('width', SQUARE_SIZE)
        .attr('height', SQUARE_SIZE)
        .attr('x', 1130)
        .attr('y', (i * 5) + 347.5)
        .attr('fill', COLOR_RANGE[i])
        if (i == COLOR_RANGE.length) {
          square.attr('fill', '#FFFFFF')
          .attr('x', 1129)
          .attr('y', (i * 5) + 347.5)
          .attr('width', SQUARE_SIZE + 2)
          .attr('height', SQUARE_SIZE + 2)
        }
    }
    svg.append('text')
      .text('Correlation')
      .attr('font-weight', 'bold')
      .attr('x', 1097)
      .attr('y', 340)
      .attr('class', 'innerText')
    for (var i = 1.0; i >= -1.0; i -= 0.5) {
      svg.append('text')
        .text(i)
        .attr('x', 1163)
        .attr('y', 430 - (i * 70))
        .attr('class', 'innerText')
    }

  });
  }
