console.log('Hello World!');
document.addEventListener('DOMContentLoaded', function() {
	let searchBox = document.querySelector('.text-box');
	let searchQuery = document.querySelector('.searchQuery');
	let searchLocation = document.querySelector('.searchLocation');
	let submitQuery = document.querySelector('.submitBtn');
	let searchForm = document.querySelector('.searchForm');
	let displayBox = document.querySelector('#result-display');
	let previous = document.getElementsByClassName('page-item');
    let next = document.getElementsByClassName('page-item');
    let searchCount = document.querySelector('#result-count');
    let advancedSearch = document.querySelector('.advanced-search');
    const selectCountry = document.querySelector('#inputState');
    const selectCategory = document.querySelector('#inputCategory');
    const selectNewsType = document.querySelector('#newsType');
    const selectNewsSource = document.querySelector('.news-source');

	const csrftoken = getCookie('csrftoken'); // csrf token from page
	console.log(csrftoken, searchQuery, submitQuery, searchQuery.value.trim().length );

	submitQuery.disabled = true;
	advancedSearch.disabled = true;

	searchQuery.onchange = () => {
		// by default submit button are disabled unless user enters a string
		if (searchQuery.value.trim().length > 0){
			submitQuery.disabled = false;
			advancedSearch.disabled = false;
		}
		else{
			submitQuery.disabled = true;
			advancedSearch.disabled = true;
			
		}
	};


	advancedSearch.onclick = () => {
		console.log(selectCountry.value, selectCategory.value, selectNewsType.value, selectNewsSource.value);
		// invokes the search form 
		searchForm.requestSubmit();
	}

	next[1].style.display = 'none';
    previous[0].style.display = 'none';



	if (displayBox.innerHTML === ""){
		displayBox.innerHTML = "No articles yet, start your search?";
	}

	searchForm.addEventListener('submit', findNews);

	console.log(searchLocation.value, searchQuery.value);






function findNews(event){

	// body...
	let counter = 1;
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
	  	const queryCount = result.totalResults ? `${result.totalResults} Results` : "0 Result";
	  	searchCount.innerHTML = queryCount;  
	  	console.log(result);
	  	viewNews(counter, displayBox, searchQuery.value, csrftoken);
	  	console.log(pagination(result, displayBox, searchQuery.value, csrftoken));

	}).catch(err=>console.log(err));


	return 


	}




});


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



function viewNews(counter, displayBox, query, tokens){

	console.log(tokens);
	fetch(`/news/search/posts?page=${counter}`, {  
		method: 'PUT',
		headers: {'X-CSRFToken': tokens},
		 body: JSON.stringify({articles: query})}).then(
		response => response.json()).then( articles =>  {

			if (articles.length === 0){
						displayBox.innerHTML = 'No articles Found';
				}
			else{
				// emptys the result box 
				displayBox.innerHTML = "";
			}
			const mainDiv = document.createElement('div');
			mainDiv.classList.add("row", "row-cols-1", "row-cols-md-2");

				articles.forEach( (article, idx) => {
				const parentDiv = document.createElement('div');
				const outerDiv =  document.createElement('div');
	           	const innerDiv =  document.createElement('div');
	           	const headerTag = document.createElement('h5');
	           	const imageTag =  document.createElement('img');
	           	const contentTag = document.createElement('p');
	           	const firstLinkTag = document.createElement('a');
	           	const secondLinkTag = document.createElement('a');
	           	const contentBtn = document.createElement('button');
	           	const contentModal = document.createElement('div');
	           	const contentModalOutter = document.createElement('div');
	           	const contentModalInner = document.createElement('div');
	           	const contentModalChild = document.createElement('div');
	           	const contentModalTitle = document.createElement('h5');
	           	const closeModal = document.createElement('button');
	           	const spanModal = document.createElement('span');
	           	const modalBody = document.createElement('div');
	           	const modalFooter = document.createElement('div');
	           	const modalFooterClose = document.createElement('button');
	            const modalFooterBookmark = document.createElement('button'); 
	            const formatDate = new Date(article.publishedAt);



	           	contentBtn.innerHTML = "View description";
	           	contentModalTitle.innerHTML = `${article.title}`;
	           	spanModal.innerHTML = "&times;";
	           	modalBody.innerHTML = article.description;
	           	modalFooterClose.innerHTML = "Close";
	           	modalFooterBookmark.innerHTML = "Bookmark";


	           	// setting modal attributes
	           	setAttr(contentBtn, {"type": "button", "class": "btn btn-primary", "data-toggle":"modal","data-target": `#exampleModalScrollable${idx}`});
	           	setAttr(contentModal, {"class": "modal fade", "id": `exampleModalScrollable${idx}`, "data-backdrop": "static",  "tabindex": "-1", "role": "dialog", "aria-labelledby": "exampleModalScrollableTitle", "aria-hidden": "true"});
	           	setAttr(contentModalOutter, {"class": "modal-dialog modal-dialog-scrollable", "role": "document"});
	           	setAttr(contentModalInner, {"class": "modal-content"});
	           	setAttr(contentModalChild, {"class": "modal-header"});
	           	setAttr(contentModalTitle, {"class": "modal-title", "id": "exampleModalScrollableTitle"});
	           	setAttr(closeModal, {"type": "button", "class": "close", "data-dismiss": "modal", "aria-label" : "Close"});
	           	setAttr(spanModal, {"aria-hidden": "true"});
	           	setAttr(modalBody, {"class": "modal-body"});
	           	setAttr(modalFooter, {"class": "modal-footer"});
	           	setAttr(modalFooterClose, {"type":"button", "class": "btn btn-secondary", "data-dismiss": "modal"});
	           	setAttr(modalFooterBookmark, {"type": "button", "class": "btn btn-primary"});


	           	//  appending modal
	           	closeModal.appendChild(spanModal);
	           	contentModalChild.appendChild(contentModalTitle);
	           	contentModalChild.appendChild(closeModal);
	           	modalFooter.appendChild(modalFooterClose);
	           	// modalFooter.appendChild(modalFooterBookmark);
	           	contentModalInner.appendChild(contentModalChild);
	           	contentModalInner.appendChild(modalBody);
	           	contentModalInner.appendChild(modalFooter);
	           	contentModalOutter.appendChild(contentModalInner);
	           	contentModal.appendChild(contentModalOutter);
	           	const imageUrl = article.urlToImage ? article.urlToImage : "https://robohash.org/23.238.193.4.png";
	           	const newsAuthor = article.author ? article.author : "Unknown";


	           	imageTag.setAttribute("src", imageUrl);


	           parentDiv.classList.add("col", "mb-4");
	           outerDiv.classList.add("card");
	           imageTag.classList.add("card-img-top");
	           innerDiv.classList.add("card-body");
	           headerTag.classList.add("card-title");
	           contentTag.classList.add("card-text");

	           // for links
	           setAttr(secondLinkTag, {"href": article.url, "target": "_blank", "alt": article.title});

	           // link tags 
	           firstLinkTag.innerHTML = `Author: ${newsAuthor}<br/> Source: ${article.source['name']}</br> Published: ${formatDate}<br/>`;
	           secondLinkTag.innerHTML = `<p class="card-text">link to website</p> <br/>`;

	           headerTag.innerHTML = article.title;

	           innerDiv.appendChild(headerTag);
	           innerDiv.appendChild(contentTag);
	           innerDiv.appendChild(firstLinkTag);
	           innerDiv.appendChild(secondLinkTag);
	           innerDiv.appendChild(contentBtn);
	           innerDiv.appendChild(contentModal);
	           outerDiv.appendChild(imageTag);
	           outerDiv.appendChild(innerDiv);
	           parentDiv.appendChild(outerDiv);
	           mainDiv.appendChild(parentDiv);


	           // editPost.classList.add("card-link", "btn-sm", "btn-primary");
	           // contentPost.classList.add('card-text');

	});
		displayBox.appendChild(mainDiv);


		}).catch(err=>console.log(err));




		// console.log(result)


	
	


	// }



	return 


}




function pagination (newsPages, displayBox, query, token) {
	console.log(token);
	let previous = document.getElementsByClassName('page-item');
    let next = document.getElementsByClassName('page-item');

    console.log(newsPages);
    if (newsPages.totalResults > 10 ){
    	  next[1].style.display = 'block';
    }
  


  fetch(`/news/search/pages`, {
  method: 'PUT',
  headers: {'X-CSRFToken': token},
  body: JSON.stringify({
      articles : newsPages,
  })})
    .then(response => response.json())
    .then(result => {
    	console.log(result);
        if (result.pages > 1) {
        	console.log(result.pages, query);
                let counter = 1;
 
                // const postQuery = document.getElementById('title_page').innerText.substring(0,  document.getElementById('title_page').innerText.indexOf(' ')).toLowerCase();
               

                previous[0].addEventListener('click', function () {
                    counter--
            	 document.querySelector('#result-display').innerHTML = '';
            		
                   viewNews(counter, displayBox, query, token);

                    if (counter === 1) {
                        previous[0].style.display = 'none';
                        next[1].style.display = 'block';
                    } 
                    else {
                        next[1].style.display = 'block';
                    }
                });

                next[1].addEventListener('click', function () {
                	// console.log(postQuery);
                    counter++
                    viewNews(counter, displayBox, query, token);
         
                    // viewNews(counter, displayBox);

                    if (counter >= result.pages) {
                        next[1].style.display = 'none';
                        previous[0].style.display = 'block';
                    } 
                        next[1].style.display = 'block';
                        console.log(counter, result.pages);

                        if (result.pages === counter){
                        	next[1].style.display = 'none';
                        }

                    
                })
                    previous[0].style.display = 'none';

        }

    })

    return 
}


function setAttr(el, attrs) {
	// body...
	for (let key in attrs){
		el.setAttribute(key, attrs[key]);
	}
}
