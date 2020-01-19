MARGIN = 100;
SQUARE_SIZE_MDS_ATT = 240;
PLOT_MUL_ATT = 135;
// Data generated from py/mdsAttributeCalculations.py and stored in data/MDS_Attribute_Distances.csv.
generatedPoints = [
  [-0.118460476, -0.683474518], // Rank
  [-0.773346069, -0.538105626], // Year
  [-0.560383493, 0.341122185], // Runtime
  [0.237649635, 0.490488666], // Rating
  [0.367766636, -0.109406178], // Votes
  [0.685555491, -0.376134436], // Revenue
  [0.161218276, 0.875509907] // Metascore
];
names = ['Rank', 'Year', 'Runtime', 'Rating', 'Votes', 'Revenue', 'Metascore'];


function drawMDSAttributeDisplay () {
  // Instantiate SVG and D3 values.
  var svg = d3.select("svg"),
    width = svg.attr("width") - MARGIN,
    height = svg.attr("height") - MARGIN;
  d3.csv("data/IMDB-Movie-Data.csv", function(error, data) {
    if (error) {
      throw error;
    }

  // Create grid and text.
  svg.append("rect")
    .attr('width', SQUARE_SIZE_MDS_ATT).attr('height', SQUARE_SIZE_MDS_ATT)
    .attr('x', MARGIN + 400).attr('y', MARGIN/2.25)
    .attr('fill', 'none')
    .attr('stroke', 'black')
    .attr('stroke-width', '3px')
  for (var i = 0; i < generatedPoints.length; i++) {
    svg.append('ellipse')
      .attr('class', 'mdsPoint')
      .attr('cx', (generatedPoints[i][0] * PLOT_MUL_ATT) + 575 + 45).attr('cy', (generatedPoints[i][1] * PLOT_MUL_ATT) + 147.5)
      .attr('rx', 7).attr('ry', 7)
    svg.append('text')
      .text(names[i])
      .attr('x', (generatedPoints[i][0] * PLOT_MUL_ATT) + 575 + 45).attr('y', (generatedPoints[i][1] * PLOT_MUL_ATT) + 162.5)
      .attr('class', 'innerTextMDS')
      .attr('text-anchor', 'middle')
  }
  svg.append('text')
    .text('Coordinate Points')
    .attr('class', 'innerText')
    .attr('x', 300).attr('y', 60)
  svg.append('text')
    .text('Rank -  [-0.1184,-0.6834]')
    .attr('class', 'innerTextMDS')
    .attr('x', 300).attr('y', 80)
  svg.append('text')
    .text('Year -  [-0.7733, -0.5381]')
    .attr('class', 'innerTextMDS')
    .attr('x', 300).attr('y', 100)
  svg.append('text')
    .text('Runtime -  [-0.5603, 0.3411]')
    .attr('class', 'innerTextMDS')
    .attr('x', 300).attr('y', 120)
  svg.append('text')
    .text('Rating -  [0.2376, 0.4904]')
    .attr('class', 'innerTextMDS')
    .attr('x', 300).attr('y', 140)
  svg.append('text')
    .text('Votes -  [0.3677, -0.1094]')
    .attr('class', 'innerTextMDS')
    .attr('x', 300).attr('y', 160)
  svg.append('text')
    .text('Revenue -  [0.6855, -0.3761]')
    .attr('class', 'innerTextMDS')
    .attr('x', 300).attr('y', 180)
  svg.append('text')
    .text('Metascore -  [0.1612, 0.8755]')
    .attr('class', 'innerTextMDS')
    .attr('x', 300).attr('y', 200)
  svg.append('text')
    .text('MDS Attribute Display')
    .attr('class', 'innerText')
    .attr('x', 300).attr('y', 280)
  });
}
