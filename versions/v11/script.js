//NOTE: must run chrome with this command: 
//open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security
//otherwise you cannot access svg through html due to CORS issue (cross origin)
//this should stop being a problem once this is hosted on a web server (even a local server should work)

// State abbreviations + DC 
var statesArray = ["AK", "HI", "AL", "AR", "AZ", "CA", "CO", "CT", "DE", "FL", "GA", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY", "DC2"];

// so many blues and reds
var colorsArray = {
  "tossup": "#9E8767", // Tan toss-up/undecided
  "tilt_r": "#CF8980", // Tilt R
  "lean_r": "#FF8B98", // Lean R
  "likely_r": "#FF5865", // Likely R
  "safe_r": "#D22532", // Safe R
  "safe_d": "#244999", // Safe D
  "likely_d": "#577CCC", // Likely D
  "lean_d": "#8AAFFF", // Lean D
  "tilt_d": "#949BB3", // Tilt D
  "ind": "#CCAD29", // Independent yellow. (Green: 29D755)
  "purple": "#800080",
  "poll": "#DDDDDD"  // unpolled gray #CCC
};


window.onload = initAll;

function initAll(){
  var myMap = $('#map').get(0).getSVGDocument();

  var sum = 0;
  var svg = myMap.querySelector('svg');
  var obj = document.getElementById("map");
  var objDoc = obj.contentDocument;
  var demSum = 0;
  var repSum = 0;

  var kentucky = objDoc.getElementById('KY');
  d3.select(kentucky).style('fill', colorsArray["lean_d"]);

  statesArray.forEach(function(state){
    var currState = objDoc.getElementById(state);
    var myNewDiv = document.createElement('div')  
    var foreignObject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
    var body = document.createElement('body'); // you cannot create bodies with .append("<body />") for some reason
    var statePath = svg.querySelector("#" + state);
    var EV = $(statePath).data("other");
    var initialColor = $(statePath).data("color")

    if (initialColor == "likely_r"){ // Likely R 
      repSum += parseInt($(currState).data('other'), 10);
    } else if (initialColor == "safe_r"){ // Safe R  
      repSum += parseInt($(currState).data('other'), 10);
    } else if (initialColor == "safe_d"){ // Safe D 
      demSum += parseInt($(currState).data('other'), 10);
    } else if (initialColor == "likely_d"){ // Likely D 
      demSum += parseInt($(currState).data('other'), 10);
    } else if (initialColor == "lean_d"){ // Lean D 
      demSum += parseInt($(currState).data('other'), 10);
    } else if (initialColor == "lean_r"){ // Lean R 
      repSum += parseInt($(currState).data('other'), 10);
    } 
    // console.log(initialColor);
    d3.select(currState).style('fill', colorsArray[initialColor]);
    var element = d3.select(currState).node();
    var bbox = element.getBBox();

    $(foreignObject)
    .attr("x", (bbox.x + bbox.width/2 - 15))
      // .attr("x", function(d){
      //   return statePath.centroid(d)[0];
      // })
      .attr("y", (bbox.y + bbox.height/2 - 25))
      // .attr("y", function(d){
      //   return statePath.centroid(d)[1];
      // })
      .attr("width", 30).attr("height", 50).append(body);

      $(body).append("<div>"+ state + "<br>" + EV + "</div>");
      $(foreignObject).attr("id", "stateName");
      $(svg).append(foreignObject);
      sum += parseInt($(currState).data('other'), 10);
    });

  $(document.body).append("<div id=\"demSum\">DEM: " + demSum + "</div>");
  $(document.body).append("<div id=\"repSum\">GOP: " + repSum + "</div>");
  
  var myPath = $(myMap).find("path, circle");

  $(myPath).click(function(e){
    console.log($(this).data('color'));
    console.log(tinycolor.equals(this.style.fill, "rgb(255, 88, 101)"));

    var currStateColor = this.style.fill;
    console.log(currStateColor);
    demSumObj = document.getElementById("demSum");
    repSumObj = document.getElementById("repSum");
    if (tinycolor.equals(currStateColor, "rgb(255, 88, 101)")){ // Likely R --> Safe R
      this.style.fill = "#D22532";
    } else if (tinycolor.equals(currStateColor, "rgb(210, 37, 50)")){ // Safe R --> Safe D 
      this.style.fill = "#244999";
      repSum -= (parseInt(this.getAttribute('data-other')));
      repSumObj.innerHTML = "<div id=\"repSum\">GOP: " + repSum + "</div>";
      demSum += (parseInt(this.getAttribute('data-other')));
      demSumObj.innerHTML = "<div id=\"demSum\">DEM: " + demSum + "</div>";
    } else if (tinycolor.equals(currStateColor, "rgb(36, 73, 153)")){ // Safe D --> Likely D
      this.style.fill = "#577CCC";
    } else if (tinycolor.equals(currStateColor, "rgb(87, 124, 204)")){ // Likely D --> Lean D
      this.style.fill = "#8AAFFF";
    } else if (tinycolor.equals(currStateColor, "rgb(138, 175, 255)")){ // Lean D --> Tossup
      this.style.fill = "#9E8767";
      demSum -= (parseInt(this.getAttribute('data-other')));
      demSumObj.innerHTML = "<div id=\"demSum\">DEM: " + demSum + "</div>";
    } else if (tinycolor.equals(currStateColor, "rgb(158, 135, 103)")){ // Tossup --> Lean R
      this.style.fill = "#FF8B98";
      repSum += (parseInt(this.getAttribute('data-other')));
      repSumObj.innerHTML = "<div id=\"repSum\">GOP: " + repSum + "</div>";
    } else if (tinycolor.equals(currStateColor, "rgb(255, 139, 152)")){ // Lean R --> Likely R
      this.style.fill = "#FF5865";
    } 
  });
}




