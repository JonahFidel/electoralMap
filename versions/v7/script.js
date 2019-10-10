//NOTE: must run chrome with this command: 
//open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security
//otherwise you cannot access svg through html due to CORS issue (cross origin)
//this should stop being a problem once this is hosted on a web server (even a local server should work)

// State abbreviations + DC 
var statesArray = ["AK", "HI", "AL", "AR", "AZ", "CA", "CO", "CT", "DE", "FL", "GA", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY", "DC2"];

window.onload = initAll;

function initAll(){
  var myMap = $('#map').get(0).getSVGDocument();

  var sum = 0;
  var svg = myMap.querySelector('svg');
  var obj = document.getElementById("map");
  var objDoc = obj.contentDocument;

  // var kentucky = objDoc.getElementById('KY');
  // d3.select(kentucky).style('fill', 'red');

  statesArray.forEach(function(state){
    var currState = objDoc.getElementById(state);
    var myNewDiv = document.createElement('div')  
    var foreignObject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
    var body = document.createElement('body'); // you cannot create bodies with .append("<body />") for some reason
    var statePath = svg.querySelector("#" + state);
    var EV = $(statePath).data("other");
    var element = d3.select(currState).node();
    var bbox = element.getBBox();
    console.log(bbox);

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

  // $(document.body).append("<div id=\"sum\">" + sum + "</div>");

  var myPath = $(myMap).find("path, circle");

  $(myPath).hover(function(e) {
    $('#info-box').css('display','block');
    $('#info-box').html($(this).data('info'));
  });

  $(myPath).click(function(e){
    console.log($(this).data('info'));
    console.log($(this).data('other')); 
    console.log(e.pageX, e.pageY);
  });

  $(myPath).mouseleave(function(e) {
    $('#info-box').css('display','none');
  });

  $(myMap).mousemove(function(e) {
    $('#info-box').css('top',e.pageY-$('#info-box').height()-30);
    $('#info-box').css('left',e.pageX-($('#info-box').width())/2);
  }).mouseover();

  var ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if(ios) {
    $('a').on('click touchend', function() {
      var link = $(this).attr('href');
      window.open(link,'_blank');
      return false;
    });
  }
}




