$("#login").on('click', function(){
   		var url = '@Url.Action("Action", "Controller")';
    	window.location.href = "/login";
    	console.log("log in button click");
});