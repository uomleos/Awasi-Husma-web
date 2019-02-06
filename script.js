   //page loading animation part 1
   $(window).on('load', function() {
    $("#pageLoad").fadeOut('fast');
});

$(document).ready(function() {
    //page loading animation part 2
    $("#app").fadeIn('fast');});
 
    
 ///////********************************************************************************************************/////////////////////
 //Map Functionalities
 var image_2017_18 = {
    url: 'http://www.awasihusma.uomleos.org/tree.png',
  };

  var image_2018_19 = {
    url: 'http://www.awasihusma.uomleos.org/tree.png',
  };

  var markers = [];

  //Map Initialize
  var srilanka = { lat: 8.8, lng: 80.7718 };
  var map = new google.maps.Map(document.getElementById('map'), {


    zoom: 6.6,
    center: srilanka,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    fullscreenControl: true
  });


  infoWindow = new google.maps.InfoWindow(); // create info window object

  var oms = new OverlappingMarkerSpiderfier(map, {
    markersWontMove: true,
    markersWontHide: true,
    basicFormatEvents: true
    });

$.get("submit/files/get.php", function(data, status){
  
  var locations = JSON.parse(data);
  $('#projectCount').text("planted "+String(locations.length)+" trees");



//UOM LEOS Marker
var coordinates = { lat: 6.7968823, lng: 79.8995894 };
      var uom_icon = {
    url: 'http://www.awasihusma.uomleos.org/b.png',
  };
    var uom_marker = new google.maps.Marker({
      position: coordinates,
      url: 'http://www.uomleos.org/',
      icon: uom_icon,
      animation: google.maps.Animation.BOUNCE,
      map: map,
      title: "Double click to view www.uomleos.org" , // generate title
      name: "Leo Club of University of Moratuwa",
      address:"University of Moratuwa, Bandaranayake Mawatha, Katubedda, Moratuwa."

    });

    oms.addMarker(uom_marker); 

    google.maps.event.addListener(uom_marker, 'dblclick', function () { // marker onclick event
      //window.location.href = ;
      window.open(
        'http://www.uomleos.org/',
  '_blank' // <- This is what makes it open in a new window.
);
    });
    //marker hover effect
    google.maps.event.addListener(uom_marker, 'spider_click', function () { // 
    
    });
    
    google.maps.event.addListener(uom_marker, 'click', function () {
      var content = "<b>"+uom_marker.name+"</b><br>"+uom_marker.address+"<br><br>&diams;&nbsp;Click on pin to view all projects on this location<br>&diams;&nbsp;Double tap to open www.uomleos.org";
      infoWindow.setContent(content);
      infoWindow.open(map, uom_marker);
    });
    
    
    google.maps.event.addListener(uom_marker, 'mouseover', function () {
      var content = "<b>"+uom_marker.name+"</b><br>"+uom_marker.address+"<br><br>&diams;&nbsp;Click on pin to view all projects on this location<br>&diams;&nbsp;Double tap to open www.uomleos.org";
      infoWindow.setContent(content);
      infoWindow.open(map, uom_marker);
    });
    google.maps.event.addListener(uom_marker, 'mouseout', function () {
      infoWindow.close();
    });

    //UOM LEOS MARKER


// Other marker data load

setMarkers(locations);


  $("#year").change(function(){
    var filter = $("#year").val().trim();
    clearMarkers();
    if(filter!="0"){
        var filteredMarkers = markersYearFilter(locations,filter);
        $('#projectCount').text("Planted "+String(filteredMarkers.length)+" trees.");
    setMarkers(filteredMarkers);
    }else{
        setMarkers(locations);
        $('#projectCount').text("Planted "+String(locations.length)+" trees.");
    }
});


  });

  //Locations add here
  //["Project name",address,lat,lng,Url here]
  /*var locations = [
    ['Golden Nets','X Sports Arena, Mattakkuliya', 6.8135, 79.9724, 'http://www.uomleos.org/2018/04/02/golden-netz/'],
    ['LEO Youth Camp',"National youth crops tranning center,Naula", 7.7071, 80.6521, 'http://www.uomleos.org/2018/04/01/leo-youth-camp/'],
    ['Ttest',"National youth crops tranning center,Naula", 7.8071, 80.8521, 'http://www.uomleos.org/2018/04/01/leo-youth-camp/'],
    ['Ttest',"National youth crops tranning center,Naula", 7.7071, 80.6521, 'http://www.uomleos.org/2018/04/01/leo-youth-camp/'],
    ['Ttest',"National youth crops tranning center,Naula", 7.9071, 80.7521, 'http://www.uomleos.org/2018/04/01/leo-youth-camp/'],

  ];*/

  function setMarkers(locations){
    for (var i = 0; i < locations.length; i++) {
        var place = locations[i];
        var coordinates = { lat: parseFloat(place.lat), lng: parseFloat(place.lon) };
        var image = image_2017_18;
        if(place.year=='2018/19'){
          image = image_2018_19;
        }
        var marker = new google.maps.Marker({
          position: coordinates,
          url: place.url,
          icon: image,
          animation: google.maps.Animation.DROP,
          map: map,
          title: "Double click to view "+place.name , // generate title
          name: place.name,
          address:place.address
    
        });

        markers.push(marker);
        oms.addMarker(marker); 
        google.maps.event.addListener(marker, 'dblclick', function () { // marker onclick event
          window.open(
            this.url,
      '_blank' // <- This is what makes it open in a new window.
    );
        });
        //marker hover effect
        google.maps.event.addListener(marker, 'spider_click', function () { // 
        
        });

        google.maps.event.addListener(marker, 'mouseover', function () {
          var content = "<b>"+this.address+"</b><br>"+this.name+"<br><br>&diams;&nbsp;Click on pin to view all projects on this location<br>&diams;&nbsp;Double tap to view project description";
          infoWindow.setContent(content);
          infoWindow.open(map, this);
        });
        google.maps.event.addListener(marker, 'mouseout', function () {
          infoWindow.close();
        });
      }
  }

  function clearMarkers(){
      for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
  }

  function markersYearFilter(array,filter){
    var rtn = [];
    for(var i=0;i<array.length;i++){
        if(array[i].year==filter){
            console.log(array[i]);
            rtn.push(array[i]);
        }
    }
    return rtn;
  }