$(document).ready(function() {
  // $('body').css("background", "url(/img/tumblr_mie2khCKTL1rv8a0xo1_500.jpg) no-repeat");


  $('.selectpermissions').on('change', function(){
    var newPermission = $(this).find("option:selected").val();
    var usernameSib = $(this).parent().parent().siblings( ".username");
    var emailSib = $(this).parent().parent().siblings( ".email");
    console.log("THIS:!!!!:", this);
    var isAdmin = (newPermission === "administrator") ? true : false;
    
    var payload = {
    		query: { username      : usernameSib.text(),
                 email         	   : emailSib.text()
        },
    		update: { isAdmin	   : isAdmin }
    };
    console.log( payload );
    $.post("/api/update/rights", {data: payload}, function(result){
        console.log( result );
        window.location.reload(true);
    });
  });

  // the following even is triggered when Administrator clicks a PhotoId row value
  // this handler will dynamically set the Modal elements depending on the Member's data.
  $(document).on("click", ".approveMe", function () {
 //    var usernameSib = $(this).parent().siblings( ".username");
	// var imageSib = $(this).parent().siblings(".adminPhoto");
    var isApproved = $(this).parent().siblings( ".approvalStatus").hasClass( "isApproved");
    var approvalButton;
    // Set the Modal's Title to be the Member's UserName
 //    $(".modal-header #idModalTitle").text( usernameSib.text() );
	// $(".modalImg").replaceWith(imageSib.context.innerHTML);
    // Toggle the Approve/Unapprove button depending on whether the Member has been approved or not.
    if( isApproved ){
      approvalButton = "<button class='btn btn-default approveMe' type='button' > Un-Approve</button>";
    }
    else {
      approvalButton = "<button class='btn btn-default approveMe isApproved' type='button' > Approve</button>";
    }
    $(".approveMe").replaceWith( approvalButton );

    // Finally, insert the Member's photo
    // $(".modal-body .photo img").replaceWith( /*photo id image*/ );
  });

  $(document).on('click', '.approveMe', function (e) {
    console.log("this:", this);
        console.log( "This is the user's username:", $(this).parent().siblings(".username").text());
    var payload = {
      query: { "username" : $(this).parent().parent(".username").text() },
      update: { isApproved: $(this).hasClass( "isApproved") }
    };
    console.dir("THIS IS THE BLEEDING PAYLOAD:", payload);
    $.post("/api/update/approval", {data: payload}, function(result){
      console.log( result );
      // $("#idModal").modal("show");
      window.location.reload(true);
    });
  });

});
