function ajaxCall(url, divId, type, data) {
	if(type == 'POST') {
		$.ajax({ 
		   url: url,
		   type: 'POST',
		   data: data,
		   success: function(data){
			   if(divId != null && divId != '' && divId != 'null') {
				   	$('#'+divId).html("Thanks for submitting "+data.name);
			   }
		   }
		});
	} else {
		$.ajax({ 
		   url: url,
		   success: function(data){
			   if(divId != null && divId != '' && divId != 'null') {
				   	$('#'+divId).html(data);
			   } else {
				   console.log("else from ajax call "+data);
				   return data;
			   }
		   }
		});
	}
}

function logMood(divId, val) {
	var data = {
		mood: val
	};
	ajaxCall('/logMood', divId, 'POST', data);
}