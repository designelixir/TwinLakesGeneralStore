$(window).on("resize", function() {
    var div = $('#motu-banner-wrapper');
    var width = div.width();
    div.css('height', width);
  });
  
  $(function() {
    var div = $('#motu-banner-wrapper');
    var width = div.width();
    div.css('height', width);
  });
  
  var today = new Date();
  let year = new Date().getFullYear();
  var month = today.getMonth() + 1;
  
  let z = String(year - 1878);
  let a = z[z.length - 1];
  let y = String(year - 1879);
  let x = y[y.length - 1];
  
  console.log(y, x)
  if (x === '0') {
    currentYear = y + "th";
    nextYear = z + "st";
    console.log(currentYear)
  } else if (x === '1') {
    currentYear = y + "st";
    nextYear = z + "nd";
    console.log(currentYear)
  } else if (x === '2') {
    currentYear = y + "nd";
    nextYear = z + "rd";
    console.log(currentYear)
  } else if (x === '3') {
    currentYear = y + "rd";
    nextYear = z + "th";
    console.log(currentYear)
  } else {
    currentYear = y + "th";
    nextYear = z + "th";
  }
  
  
  var winterImgUrl = "assets/motu-winter.png";
  var springImgUrl = "assets/motu-spring.png";
  var earlySummerImgUrl = "assets/storefront.png";
  var lateSummerUrl = "assets/motu-summer.png";
  
  $(function() {
    if (month === 1 || month === 2 || month === 12 || month === 11) {
      $("#hours").css("display", "none");
      $("#closed-season-message").css("display", "block");
      $("#motu-banner-wrapper").css("background-image", "url(" + winterImgUrl + ")");
      $("#banner-message").text("It's official, we're closed for the season and off to winter break. Catch us in May for our " + nextYear + " season!");
    } else if (month > 2 && month <= 4) {
      $("#hours").css("display", "none");
      $("#closed-season-message").css("display", "block");
      $("#motu-banner-wrapper").css("background-image", "url(" + springImgUrl + ")");
      $("#banner-message").text("Join us on May 25th for our " + currentYear + "season! Well, once we unpack all of these boxes...");
    } else if (month > 4 && month <= 6) {
      $("#hours").css("display", "block");
      $("#closed-season-message").css("display", "none");
      $("#motu-banner-wrapper").css("background-image", "url(" + earlySummerImgUrl + ")");
      $("#banner-message").text("It's official - we're open for our " + currentYear + " season!");
    } else if (month > 6 && month <= 10) {
      $("#hours").css("display", "block");
      $("#closed-season-message").css("display", "none");
      $("#motu-banner-wrapper").css("background-image", "url(" + lateSummerUrl + ")");
      $("#banner-message").text("Join us in the final dog days of summer and fall before our " + currentYear + " season is over!");
    }
  })
  

  function initMap() {
      
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 39.08200092875212, lng: -106.38225912126879},
        zoom: 16
      });

      var styles = [
        {
          featureType: "poi",
          elementType: "business",
          stylers: [
            { visibility: "off" }
          ]
        }
      ];
      
      map.setOptions({styles: styles});
    
      var infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);
    service.getDetails({
      placeId: 'ChIJ-eRwQA2jaocRYX_qufLgG8I'
    },
    
    function(place, status) {
      if (status === "OK") {
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
          });
          map.setCenter(place.geometry.location);
          google.maps.event.addListener(marker, 'click', function() {
              alert("nice!")
          });
        var dayIds = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
        var dayStrLengths = [7, 8, 10, 9, 7, 10, 7]
        var currentDayofWeek = today.getDay()
  
        for (let i = 0; i < 7; i++) {
          const hours = place.opening_hours.weekday_text[i];
          const result = hours.slice(dayStrLengths[i]);
          document.getElementById(dayIds[i]).innerHTML += result;
        }
  
        if (currentDayofWeek === 0 && place.opening_hours.isOpen()) {
          document.getElementById('sunday').style.backgroundColor = 'rgba(143, 188, 143, 0.75)';
        } else if (currentDayofWeek === 0 && place.opening_hours.isOpen() === false) {
          document.getElementById('sunday').style.backgroundColor = 'rgba(255, 0, 0, 0.15)';
        } else if (currentDayofWeek > 0 && place.opening_hours.isOpen() === false) {
          document.getElementById(dayIds[currentDayofWeek - 1]).style.backgroundColor = 'rgba(255, 0, 0, 0.15)';
        } else {
          document.getElementById(dayIds[currentDayofWeek - 1]).style.backgroundColor = 'rgba(143, 188, 143, 0.75)';
        }
  
      }
  
    });
  }
  