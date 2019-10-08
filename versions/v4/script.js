//NOTE: must run chrome with this command: 
//open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security
//otherwise you cannot access svg through html due to CORS issue (cross origin)
//this should stop being a problem once this is hosted on a web server (even a local server should work)

// State abbreviations + DC 
var statesArray = ["AK", "HI", "AL", "AR", "AZ", "CA", "CO", "CT", "DE", "FL", "GA", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY", "DC2"];


window.onload = initAll;
function initAll(){
  var mySVG = document.getElementById("map");
  console.log(mySVG);
  var svgDoc = mySVG.getSVGDocument();
  console.log(svgDoc);
  var alaska = svgDoc.getElementById("AK");
  console.log(alaska);


 var myMap = $('#map').get(0).getSVGDocument();
console.log(myMap);
console.log("svgDoc: " + svgDoc);
// console.log("asdlf " + myMap.getElementsByTagName('g')[0]);
var sum = 0;
var svg = myMap.querySelector('svg');
statesArray.forEach(function(state){
  var currState = myMap.getElementById(state);
  console.log(currState);
  var myNewDiv = document.createElement('div')  
  console.log(currState.getBoundingClientRect());

  var foreignObject = document.createElementNS( 'http://www.w3.org/2000/svg', 'foreignObject');
  var body = document.createElement('body'); // you cannot create bodies with .apend("<body />") for some reason
  $(foreignObject).attr("x", (currState.getBoundingClientRect().x + currState.getBoundingClientRect().width/2)).attr("y", (currState.getBoundingClientRect().y + currState.getBoundingClientRect().height/2)).attr("width", 30).attr("height", 30).append(body);
  $(body).append("<div>"+ state + "</div>");
  $(foreignObject).attr("id", "stateName");
  $(svg).append(foreignObject);
    // $(document.body).append("<foreignObject x=\"" + (currState.getBoundingClientRect().x + currState.getBoundingClientRect().width/2) + "\" y=\"" + (currState.getBoundingClientRect().y + currState.getBoundingClientRect().height/2) + "\" width=\"30\" height=\"30\" id=\"electoral-votes\"><div>" + state + "</div></foreignObject>");


// var foreignObject = document.createElementNS( ns, 'foreignObject');
// foreignObject.setAttribute('height', 30);
// foreignObject.setAttribute('width', 30);
// var newElem = document.createElement('div');
// newElem.innerHTML = "hello world";
// foreignObject.appendChild(newElem);
// document.appendChild(foreignObject);
  // <foreignObject class="state" x="216.81121291803333" y="155.59629813976954" width="20" height="30"><body><div class="state_info">WY<br>3</div></body></foreignObject>

  console.log(currState);


  console.log($(currState).data('other'));
  console.log(parseInt($(currState).data('other'), 10));
  sum += parseInt($(currState).data('other'), 10);
  // sum += currState.getElementsByTagName('data-other');
});

$(document.body).append("<div id=\"sum\">" + sum + "</div>");

console.log(sum); //538!
 var myPath = $(myMap).find("path, circle");

 // var myPath;

 // myMap.addEventListener("click", function(){
 //  myPath = $(myMap).find("path");
 //  console.log(myPath.data('info'));
 // });

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



function hawaii(){
  console.log("clicked hawaii");
}



