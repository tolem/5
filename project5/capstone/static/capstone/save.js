function(event){
		
		// findNews();
			

	fetch(`news/search`, {
	    method: 'POST',
	    body: JSON.stringify({
	        search: content
	    })
	  }).then(response => response.json()).then(console.log(response)).catch(err=>console.log(err));

	return 
		

	}