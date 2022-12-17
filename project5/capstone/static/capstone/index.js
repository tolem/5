document.addEventListener('DOMContentLoaded', function() {
	console.log("Hello Lami");
	let searchBox = document.querySelector('.text-box');
	let searchQuery = document.querySelector('.searchQuery');
	let searchLocation = document.querySelector('.searchLocation');
	let submitQuery = document.querySelector('.submitBtn');
	let searchForm = document.querySelector('.searchForm');
	let displayBox = document.querySelector('#result-display');
	const csrftoken = getCookie('csrftoken'); // csrf token from page

	if (displayBox.innerHTML === ""){
		displayBox.innerHTML = "No articles yet, start your search?";
	}

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
	    mode: 'same-origin',
	    body: JSON.stringify({
	        search: content
	    })
	  }).then(response => response.json()).then( result => {
	  	console.log(result);
	  	console.log(viewNews(result, displayBox));


	}).catch(err=>console.log(err));


	return 


	}




});
// console.log(csrftoken);

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



function viewNews(result, displayBox){
	if (result.totalResults === 0){
		displayBox.innerHTML = 'No articles Found'
	}
	else{
		// displayBox.innerHTML = '';
		console.log(result)
		const mainDiv = document.createElement('div');
		mainDiv.classList.add("row", "row-cols-1", "row-cols-md-2");

	
		result.articles.forEach( article => {
				const parentDiv = document.createElement('div');
				const outerDiv =  document.createElement('div');
	           	const innerDiv =  document.createElement('div');
	           	const headerTag = document.createElement('h5');
	           	const imageTag =  document.createElement('img');
	           	const contentTag = document.createElement('p');
	           	const firstLinkTag = document.createElement('a');
	           	const secondLinkTag = document.createElement('a');



	           parentDiv.classList.add("col", "mb-4");
	           outerDiv.classList.add("card");
	           imageTag.classList.add("card-img-top");
	           innerDiv.classList.add("card-body");
	           headerTag.classList.add("card-title");
	           contentTag.classList.add("card-text");
	           

	           innerDiv.appendChild(headerTag);
	           innerDiv.appendChild(contentTag);
	           innerDiv.appendChild(firstLinkTag);
	           innerDiv.appendChild(secondLinkTag);

	           outerDiv.appendChild(innerDiv);
	           outerDiv.appendChild(imageTag);
	           parentDiv.appendChild(outerDiv);
	           mainDiv.appendChild(parentDiv);


	           // editPost.classList.add("card-link", "btn-sm", "btn-primary");
	           // contentPost.classList.add('card-text');

	})

	displayBox.appendChild(mainDiv);
	}







	return result.totalResults;


}


function paginate(argument) {
	// body...
	return
}