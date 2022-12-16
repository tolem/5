document.addEventListener('DOMContentLoaded', function() {
	console.log("Hello Lami");
	let searchBox = document.querySelector('.text-box');
	let searchQuery = document.querySelector('.searchQuery');
	let searchLocation = document.querySelector('.searchLocation');
	let submitQuery = document.querySelector('.submitBtn');
	let searchForm = document.querySelector('.searchForm');
	let displayBox = document.querySelector('#result-display');
	const csrftoken = getCookie('csrftoken'); // csrf token from page


	// console.log(displayBox);
	// console.log(innerHeight);
	// console.log(searchQuery);
	
	searchForm.addEventListener('submit', findNews);

	console.log(searchLocation.value, searchQuery.value);



function findNews(event){

	// body...
	event.preventDefault();
	// console.log(searchLocation.value, searchQuery.value);
	// findNews(searchQuery.value, searchLocation.value);

	content =  {'query': searchQuery.value, 'location': searchLocation.value }

	fetch(`news/search`, {
	    method: 'POST',
	    headers: {'X-CSRFToken': csrftoken},
	    body: JSON.stringify({
	        search: content
	    })
	  }).then(response => response.json()).then( result => {
	  	console.log(result);


	}).catch(err=>console.log(err));


	return 


	}




});
console.log(csrftoken);

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}



function viewNews(result){
	console.log(result.totalResults);

}


function paginate(argument) {
	// body...
	return
}