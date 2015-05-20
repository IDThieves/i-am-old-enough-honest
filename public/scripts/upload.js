//to preview the image when uploading
function loadImg(input) {
	if (input.files && input.files[0]) {
	  var reader = new FileReader();

	  reader.onload = function(e){
		$('#previewID')
		  .attr('src', e.target.result)
		  .width(450)
		  .height(270);
	  };
		reader.readAsDataURL(input.files[0]);
	}
}

//sending an AJAX to our API
$('#submitID').click(function(){
    var formData = new FormData($('#uploadID')[0]);
    $.ajax({
        url: '/api/image',
        type: 'POST',
				xhr: function() {  // Custom XMLHttpRequest
            var myXhr = $.ajaxSettings.xhr();
            if(myXhr.upload){ 
                console.log(myXhr.upload);
				
            }
            return myXhr;
        },
		success: function(data) {
			window.location.href = "/success";
		},
		data: formData,
        cache: false,
		contentType: false,
        processData: false
    }, "json");
});