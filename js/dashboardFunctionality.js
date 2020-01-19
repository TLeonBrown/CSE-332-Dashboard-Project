MAIN_RECT_W = 450;
MAIN_RECT_H = 250;
RIGHT_RECT_W = 150;
RIGHT_RECT_H = 600;
var genres = ['action', 'adventure', 'animation', 'biography', 'comedy', 'crime', 'drama', 'horror', 'mystery', 'other'];

function addGenre (element) {
  if (document.getElementById(element).checked) {
    genres.push(element);
  }
  else {
    if (genres.indexOf(element) !== -1) {
      genres.splice(genres.indexOf(element), 1);
    }
  }
  // console.log("Genres: " + genres);
}

function drawDashboard () {
  drawBorders();
  drawText();
  dashboardMisc();
}

function drawBorders () {
  var svg = d3.select("svg"),
    width = WIDTH,
    height = HEIGHT;

  // Create the orders for the 4 main modules.
  svg.append("rect")
    .attr("class", "moduleBorders")
    .attr("x", 295)
    .attr("y", 40)
    .attr("width", MAIN_RECT_W)
    .attr("height", MAIN_RECT_H)
  svg.append("rect")
    .attr("class", "moduleBorders")
    .attr("x", 295)
    .attr("y", 300)
    .attr("width", MAIN_RECT_W)
    .attr("height", MAIN_RECT_H)
  svg.append("rect")
    .attr("class", "moduleBorders")
    .attr("x", 755)
    .attr("y", 40)
    .attr("width", MAIN_RECT_W)
    .attr("height", MAIN_RECT_H)
  svg.append("rect")
    .attr("class", "moduleBorders")
    .attr("x", 755)
    .attr("y", 300)
    .attr("width", MAIN_RECT_W)
    .attr("height", MAIN_RECT_H)

  // Create the borders for the PCA display on the bottom.
  svg.append("rect")
    .attr("class", "moduleBorders")
    .attr("x", 295)
    .attr("y", 560)
    .attr("width", 910)
    .attr("height", 160)

  // Create the borders for the interactive bar chart on the left.
  svg.append("rect")
    .attr("class", "moduleBorders")
    .attr("x", 10)
    .attr("y", 40)
    .attr("width", 275)
    .attr("height", 680)

  // Create borders for the dashboard controls on the right.
  svg.append("rect")
    .attr("class", "moduleBorders")
    .attr("x", 1215)
    .attr("y", 40)
    .attr("width", RIGHT_RECT_W)
    .attr("height", RIGHT_RECT_H)
  svg.append("rect")
    .attr("class", "moduleBorders")
    .attr("x", 1375)
    .attr("y", 40)
    .attr("width", RIGHT_RECT_W)
    .attr("height", RIGHT_RECT_H)

  // Create borders for 'update' boxes.
  svg.append("rect")
    .attr("class", "moduleBorders")
    .attr("x", 1215)
    .attr("y", 650)
    .attr("width", 150)
    .attr("height", 70)
  svg.append("rect")
    .attr("class", "moduleBorders")
    .attr("x", 1375)
    .attr("y", 650)
    .attr("width", 150)
    .attr("height", 70)
}

function drawText () {
  var svg = d3.select("svg"),
    width = WIDTH,
    height = HEIGHT;

  // Dashboard text in top left corner.
  svg.append("text")
    .text("CSE 332 Lab 5 - Dashboard - iMDB Movie Data")
    .attr("class", 'labelText')
    .attr('id', 'dashboard')
    .attr("x", 10)
    .attr("y", 30)

  // Draw 'attributes' and 'genres' labels.
  svg.append("text")
    .text("Attributes")
    .attr("class", "labelText")
    .attr("x", 1225)
    .attr("y", 30)
  svg.append("text")
    .text("Genres")
    .attr("class", "labelText")
    .attr("x", 1407)
    .attr("y", 30)
  svg.append("text")
    .attr('class', 'innerText')
    .text("Revenue (Millions $)")
    .attr('x', 109)
    .attr("y", 705)
}

function dashboardMisc () {
  var boxes = document.getElementsByClassName('genr');
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].checked = true;
  }
}
