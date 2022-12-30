console.log('Hello World!');
document.addEventListener('DOMContentLoaded', function() {
	// DOM elements instance
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
    const selectNewsLang = document.querySelector('#newsLang');
    const orderNews = document.querySelector("#orderNews");
    const startQueryDate = document.querySelector("#from");
    const endQueryDate = document.querySelector("#to");
    const searchPage = document.querySelector('#searchPage');
    const searchDomain = document.querySelector('.search-domain');
    const advancedOptions = document.querySelectorAll('.options');
    const headLineElements = document.querySelectorAll('.headlines');
    const everytingElements = document.querySelectorAll('.Everything');


	const csrftoken = getCookie('csrftoken'); // csrf token from page
	console.log(csrftoken, searchQuery, submitQuery, searchQuery.value.trim().length );


	// visbibilty is hidden by default
	advancedOptions.forEach(arr => arr.style.display = "none" );

	// advanced options feature are empty by default
	selectCountry.value = '';
	selectCategory.value = '';
	selectNewsType.value = '';
	selectNewsSource.value = '';
	selectNewsLang.value = '';
	orderNews.value = '';


	let advancedButtons = [selectCountry, selectCategory, selectNewsType, selectNewsSource, searchPage, searchDomain];


	console.log(advancedButtons, "test0");

	submitQuery.disabled = true;
	advancedSearch.disabled = true;
	let checker =  arr => arr.every(v => v === true);
	let check = [];



	searchQuery.addEventListener('input', () => {
		// by default submit button are disabled unless user enters a string
		if (searchQuery.value.trim().length > 0){
			submitQuery.disabled = false; 
			advancedSearch.disabled = !checker(check);
			console.log(check);			
		}
		else{
			submitQuery.disabled = true;
			
		}
	});


	// console.log(document.querySelectorAll('.Headlines'));

	selectNewsType.addEventListener('input', () => {
		let newsType = selectNewsType.value;
		const playState = document.querySelectorAll(`.${selectNewsType.value}`);
		console.log(playState, selectNewsType.value);

		const changeState = (newsType === "Headlines") ? "Everything" : "Headlines";
		const toggleState = document.querySelectorAll(`.${changeState}`);
		// changes the state by toggling the form visibility
		toggleState.forEach(el => el.style.display = "none");
		playState.forEach( el => {
			// if not date element 
			if (el.hasAttribute("data-date")){
				el.style.display = "flex";

			}
			else{
				el.style.display = "block";
			}
		});

		}
		
		);


		for (let inputs in advancedButtons){

			advancedButtons[inputs].addEventListener( 'input', () => {
				console.log(inputs);
				if (advancedButtons[inputs].value.trim().length > 0){
					check[inputs] = true;
				}
				else{
					check[inputs] = false;
				}
			});
				}
			

	advancedSearch.onclick = () => {
		console.log(selectCountry.value, selectCategory.value, selectNewsType.value, selectNewsSource.value, searchDomain.value, "test0");
		// invokes the search form 
		searchForm.requestSubmit();
	}

	next[1].style.display = 'none';
    previous[0].style.display = 'none';



	if (displayBox.innerHTML === ""){
		displayBox.innerHTML = "<p class='p text-center h4'> No articles yet, start your search?</p>";
	}

	searchForm.addEventListener('submit', findNews);

	console.log(searchLocation.value, searchQuery.value);


function findNews(event){

	// body...
	let counter = 1;
	event.preventDefault();

	content =  {'query': searchQuery.value, 'country': selectCountry.value, 'category': selectCategory.value, 'lang': selectNewsLang.value,  'newsType': selectNewsType.value, 'newsSource': selectNewsSource.value, 'startDate': startQueryDate.value, 'endDate': endQueryDate.value, 'domain': searchDomain.value, 'order': orderNews.value, 'page': searchPage.value};

	fetch(`news/search`, {
	    method: 'POST',
	    headers: {'X-CSRFToken': csrftoken},
	    mode: 'same-origin',
	    body: JSON.stringify({
	        search: content
	    })
	  }).then(response => response.json()).then( result => {
	  	console.log(result);

	  	document.querySelector('#result-display').innerHTML = `<div class="d-flex justify-content-center">
  <div class="spinner-border text-secondary" style="width: 6rem; height: 6rem;" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div></br>`;
		setTimeout(() =>{  const queryCount = result.totalResults ? `Results (${result.totalResults})` : "Result (0)";
	  	searchCount.innerHTML = queryCount;  
	  	console.log(result);
	  	}, 2000)
	  	setTimeout(() => {viewNews(counter, displayBox, searchQuery.value, csrftoken)}, 2000);

	  	console.log(setTimeout(() => {pagination(result, displayBox, searchQuery.value, csrftoken)}, 2000));

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
				const user = document.querySelector('.username').innerHTML;
				displayBox.innerHTML = `<div class="alert alert-info text-center ml-5 mr-5" role="alert">
		<h4 class="alert-heading">${user}, no articles Found!</h4>
	<p> Ooops, NewsApi could not find any article, try using variants of the search term or topic</p>
	<p class="mb-0"> You can headover to <a href="http://localhost:8000/bookmarks">Bookmark</a> to view  your saved articles </p>
	</div>`;
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
	            const deleteButton = document.createElement('p');





	           	contentBtn.innerHTML = "View description";
	           	contentModalTitle.innerHTML = `${article.title}`;
	           	spanModal.innerHTML = "&times;";
	           	modalBody.innerHTML = article.description;
	           	modalFooterClose.innerHTML = "Close";
	           	modalFooterBookmark.innerHTML = `<span><i class="bi bi-bookmark-check-fill"></i> Bookmark</span>`;



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
	           	setAttr(modalFooterBookmark, {"type": "button", "class": "btn btn-primary", "data-dismiss" :"modal"});


	           	//  appending modal
	           	closeModal.appendChild(spanModal);
	           	contentModalChild.appendChild(contentModalTitle);
	           	contentModalChild.appendChild(closeModal);
	           	modalFooter.appendChild(modalFooterClose);
	           	// gets current user to append button
	           	getCurrentUser(modalFooter, modalFooterBookmark);
		        contentModalInner.appendChild(contentModalChild);
	           	contentModalInner.appendChild(modalBody);
	           	contentModalInner.appendChild(modalFooter);
	           	contentModalOutter.appendChild(contentModalInner);
	           	contentModal.appendChild(contentModalOutter);
	           	const imageUrl = article.urlToImage ? article.urlToImage : "https://robohash.org/23.238.193.4.png";
	           	const newsAuthor = article.author ? article.author : "Unknown";
	           	deleteButton.innerHTML = `<button type="button" class="ml-1 mr-1  btn btn-danger" id="btn-danger">Remove</button> `;



	           imageTag.setAttribute("src", imageUrl);


	           parentDiv.classList.add("col", "mb-4");
	           outerDiv.classList.add("card", "ml-1", "mr-1");
	           imageTag.classList.add("card-img-top");
	           innerDiv.classList.add("card-body");
	           headerTag.classList.add("card-title");
	           contentTag.classList.add("card-text");

	           // for links
	           setAttr(secondLinkTag, {"href": article.url, "target": "_blank", "alt": article.title});

	           // link tags 
	           firstLinkTag.innerHTML = `<p class="card-text"> Author: ${newsAuthor}<br/> Source: ${article.source['name']}</br> Published: ${formatDate}<br/></p>`;
	           secondLinkTag.innerHTML = `<p class="card-text">link to website</p><br/>`;



	           headerTag.innerHTML = article.title;

	           // when button is clicked save article to model
	           modalFooterBookmark.onclick = () =>{
	           	let content = {des: article.description, url: article.url, source: article.source['name'], date: article.publishedAt, img: imageUrl, author: newsAuthor, title: article.title};
	           	console.log("this element has been clicked!");
	           	// send articles to server
	           	fetch("mark", {method:"PUT", headers: {'X-CSRFToken': tokens}, body: JSON.stringify({article: content})
	           }).then(resp => resp.json()).then(result => console.log(result)).catch(err => console.log(err));

	           }


		  // If delete button is clicked, delete the post
	        deleteButton.addEventListener('click', event => {
                const element = event.target;
                console.log(element);
                if (element.id === 'btn-danger') {
             			element.parentElement.parentElement.parentElement.remove()
                }
            });
	           // adding new element to DOM
	           innerDiv.appendChild(headerTag);
	           innerDiv.appendChild(contentTag);
	           innerDiv.appendChild(firstLinkTag);
	           innerDiv.appendChild(secondLinkTag);
	           deleteButton.appendChild(contentBtn);
	           innerDiv.appendChild(deleteButton);
	           innerDiv.appendChild(contentModal);
	           outerDiv.appendChild(imageTag);
	           outerDiv.appendChild(innerDiv);
	           parentDiv.appendChild(outerDiv);
	           mainDiv.appendChild(parentDiv);


	});
		displayBox.appendChild(mainDiv);


		}).catch(err=>console.log(err));



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


function getCurrentUser(parentEle,childEle) {
	// body...
	fetch('http://localhost:8000/user/user', {method:'GET'}).then(resp => resp.json()).then(result => {
		// console.log();
		const currentUsername =  result['username'];
	    console.log(currentUsername);
	    if (currentUsername !== 404){
	            	parentEle.appendChild(childEle);
	           	}
	       return currentUsername;

	})
	return
}
