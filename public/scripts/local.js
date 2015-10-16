function ajaxCall(url, divId) {
	$.ajax({ 
	   url: url,
	   success: function(data){
		   if(divId != null && divId != '' && divId != 'null') {
			   	$('#'+divId).html(data);
		   }
	   }
	});
}

function logMood(val, divId) {
	ajaxCall('/logMood/'+val, divId);
}