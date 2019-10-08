//NOTE: must run chrome with this command: 
//open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security
//otherwise you cannot access svg through html due to CORS issue (cross origin)
//this should stop being a problem once this is hosted on a web server (even a local server should work)

window.onload = initAll;
function initAll(){
  var mySVG = document.getElementById("map");
  console.log(mySVG);
  var svgDoc = mySVG.getSVGDocument();
  console.log(svgDoc);
  var alaska = svgDoc.getElementById("AK");
  console.log(alaska);


 var myMap = $('#map').get(0).getSVGDocument();
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



