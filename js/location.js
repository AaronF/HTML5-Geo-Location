function getLocation() {
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(showPosition)

	} else {
		alert("Location Unknown");
	}
}

function showPosition(position){
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;

	var catid = document.getElementById("catid").value;
	var radius = document.getElementById("radius").value;

	string = "client_id=QSULZYWK4P3JMQCJLYTBQHUD1J5Z2YQFHKALPWVABXVVEX0S&client_secret=GGXYSV5OLOFSVD0Q03UOUMXBRRIMQAKZR4BKUAA40ZRIHQQH&ll="+latitude+","+longitude+"&v=20130815&limit=20&categoryId="+catid+"&radius="+radius;
	url = "ba-simple-proxy.php?url=https://api.foursquare.com/v2/venues/search?"+encodeURIComponent(string);
	console.log(url);

	$.getJSON(url, function(data){
		$.each(data.contents.response.venues, function(){
			$("#location").append("<li><strong>Name</strong>: "+this.name+"<br><strong>Distance: </strong>"+this.location.distance+"m</li>");
		});
	});
}