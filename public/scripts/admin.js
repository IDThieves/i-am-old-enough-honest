$(document).ready(function() {
  // $('body').css("background", "url(/img/tumblr_mie2khCKTL1rv8a0xo1_500.jpg) no-repeat");


  $('.selectpermissions').on('change', function(){
    var newPermission = $(this).find("option:selected").val();
    var usernameSib = $(this).parent().parent().siblings( ".username");
    var emailSib = $(this).parent().parent().siblings( ".email");
    var isAdmin = (newPermission === "administrator") ? true : false;

    var payload = {
            query: { username      : usernameSib.text(),
                 email                : emailSib.text()
        },
            update: { isAdmin       : isAdmin }
    };
    console.log( payload );
    $.post("/api/update/rights", {data: payload}, function(result){
        console.log( result );
        window.location.reload(true);
    });
  });

  // The following event is triggered when Administrator clicks a PhotoId row value
  // The handler will dynamically set the Modal elements depending on the Member's data.
  $(".selectapproval").on("change", function () {

	var newApproval = $(this).find("option:selected").val();
    var usernameSib = $(this).parent().parent().siblings( ".username");
    var emailSib = $(this).parent().parent().siblings( ".email");
    var isApproved = (newApproval === "Approve") ? true : false;
  
	  
      var payload = {
      query: { username : usernameSib.text(),
			 	email : emailSib.text()
			 },
      update: { isApproved: isApproved }
    };
    console.dir("THIS IS THE BLEEDING PAYLOAD:", payload);
    $.post("/api/update/approval", {data: payload}, function(result){
      console.log( result );
      window.location.reload(true);
    });
  });


});
