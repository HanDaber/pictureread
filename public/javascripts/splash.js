var sent_email_request = false;

$(function() {  
    $("#headerCover").hide().fadeIn(1000);
});

function submitUpdateInvite()
{
    if(isEmail( $("#updatesEmail").val() ))
    {
	$.post('/email/' + $("#updatesEmail").val(), function(data) {
	    $("#updatesEmail").val("THANK YOU");
	    $("#updatesEmail").attr("disabled", "disabled");
	    $("#updatesEmailSubmit").css("background-color", "#000");
	});
    }
}

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}
