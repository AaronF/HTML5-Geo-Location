//swap out these details below for your FourSquare app detail
var foursq_client_id = "YOURCLIENTID";
var foursq_client_secret = "YOURCLIENTSECRET";

function getLocation() {
	$("#location").html("Loading...");
	//check to make sure that the location API is supported
	if(navigator.geolocation){
		//get the users current location and execute the next function (showposition)
		navigator.geolocation.getCurrentPosition(showPosition)
	} else {
		alert("Location unavailable");
	}
}

function showPosition(position){
	if(position){
		console.log(position);

		//these two values are sent from the previous function (navigator.geolocation.getCurrentPosition(showPosition))
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;

		var catid = document.getElementById("catid").value; //gets the category ID from the input box
		var radius = document.getElementById("radius").value; //gets the radius value from the input box


		if(foursq_client_id == "YOURCLIENTID" || foursq_client_secret == "YOURCLIENTSECRET"){
			alert("Please register your app");
		} else {

			string = "client_id="+foursq_client_id+"&client_secret="+foursq_client_secret+"&ll="+latitude+","+longitude+"&v=20130815&limit=20&categoryId="+catid+"&radius="+radius;

			url = "proxy.php?url=https://api.foursquare.com/v2/venues/search?"+encodeURIComponent(string);
			
			console.log(url);

			$.getJSON(url, function(data){
				$("#location").html("");
				$.each(data.contents.response.venues, function(){
					$("#location").append("<li><strong>Name</strong>: "+this.name+"<br><strong>Distance: </strong>"+this.location.distance+"m</li>");
				});
			});

		}
		
	}
	
}