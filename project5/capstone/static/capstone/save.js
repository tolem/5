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


	// fetch(`news/search`).then(console.log('sent'));



// //
// 	<section id="searchBox">
//  <input type="text" name="input" class="input" id="search-input">
//   <button type="reset" class="search" id="search-btn"></button>
// </section>

// 	#searchBox {
//   position: absolute;
//   height: 50px;
//   width: 300px;
//   margin-left: 170px;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
// }

// #searchBox.on {
//   -webkit-animation-name: in-out;
//   animation-name: in-out;
//   -webkit-animation-duration: 0.7s;
//   animation-duration: 0.7s;
//   -webkit-animation-timing-function: linear;
//   animation-timing-function: linear;
//   -webkit-animation-iteration-count: 1;
//   animation-iteration-count: 1;
// }

// input {
//   box-sizing: border-box;
//   width: 50px;
//   height: 50px;
//   border: 4px solid #263238;
//   border-radius: 50%;
//   background: none;
//   color: #263238;
//   font-size: 16px;
//   font-weight: 400;
//   font-family: Roboto;
//   outline: 0;
//   -webkit-transition: width 0.4s ease-in-out, border-radius 0.8s ease-in-out,
//     padding 0.2s;
//   transition: width 0.4s ease-in-out, border-radius 0.8s ease-in-out,
//     padding 0.2s;
//   -webkit-transition-delay: 0.4s;
//   transition-delay: 0.4s;
//   -webkit-transform: translate(-100%, -50%);
//   -ms-transform: translate(-100%, -50%);
//   transform: translate(-100%, -50%);
// }

// .search {
//   background: none;
//   position: absolute;
//   top: 0px;
//   left: 0;
//   height: 50px;
//   width: 50px;
//   padding: 0;
//   border-radius: 100%;
//   outline: 0;
//   border: 0;
//   color: inherit;
//   cursor: pointer;
//   -webkit-transition: 0.2s ease-in-out;
//   transition: 0.2s ease-in-out;
//   -webkit-transform: translate(-100%, -50%);
//   -ms-transform: translate(-100%, -50%);
//   transform: translate(-100%, -50%);
// }

// .search:before {
//   content: "";
//   position: absolute;
//   width: 20px;
//   height: 4px;
//   background-color: #263238;
//   -webkit-transform: rotate(45deg);
//   -ms-transform: rotate(45deg);
//   transform: rotate(45deg);
//   margin-top: 26px;
//   margin-left: 17px;
//   -webkit-transition: 0.2s ease-in-out;
//   transition: 0.2s ease-in-out;
// }

// .close {
//   -webkit-transition: 0.4s ease-in-out;
//   transition: 0.4s ease-in-out;
//   -webkit-transition-delay: 0.4s;
//   transition-delay: 0.4s;
// }

// .close:before {
//   content: "";
//   position: absolute;
//   width: 27px;
//   height: 4px;
//   margin-top: -1px;
//   margin-left: -13px;
//   background-color: #263238;
//   -webkit-transform: rotate(45deg);
//   -ms-transform: rotate(45deg);
//   transform: rotate(45deg);
//   -webkit-transition: 0.2s ease-in-out;
//   transition: 0.2s ease-in-out;
// }

// .close:after {
//   content: "";
//   position: absolute;
//   width: 27px;
//   height: 4px;
//   background-color: #263238;
//   margin-top: -1px;
//   margin-left: -13px;
//   cursor: pointer;
//   -webkit-transform: rotate(-45deg);
//   -ms-transform: rotate(-45deg);
//   transform: rotate(-45deg);
// }

// .square {
//   box-sizing: border-box;
//   padding: 0 40px 0 10px;
//   width: 300px;
//   height: 50px;
//   border: 4px solid #263238;
//   border-radius: 0;
//   background: none;
//   color: #263238;
//   font-family: Roboto;
//   font-size: 16px;
//   font-weight: 400;
//   outline: 0;
//   -webkit-transition: width 0.4s ease-in-out, border-radius 0.4s ease-in-out,
//     padding 0.2s;
//   transition: width 0.4s ease-in-out, border-radius 0.4s ease-in-out,
//     padding 0.2s;
//   -webkit-transition-delay: 0.4s, 0s, 0.4s;
//   transition-delay: 0.4s, 0s, 0.4s;
//   -webkit-transform: translate(-100%, -50%);
//   -ms-transform: translate(-100%, -50%);
//   transform: translate(-100%, -50%);
//   border-radius:20px;
// }


// searchBtn.addEventListener("click", expand);

// 	if (displayBox.innerHTML === ""){
// 		displayBox.innerHTML = "No articles yet, start your search?";
// 	}

// 	searchForm.addEventListener('submit', findNews);

// 	console.log(searchLocation.value, searchQuery.value);

// 	const input = document.getElementById("search-input");
// const searchBtn = document.getElementById("search-btn");

// const expand = () => {
//   searchBtn.classList.toggle("close");
//   input.classList.toggle("square");
// };



//   <div class="input-group">
//   <div class="input-group-prepend">
//     <span class="input-group-text">First and last name</span>
//   </div>
//   <input type="text" aria-label="First name" class="form-control searchQuery">
//   <input type="text" aria-label="Last name" class="form-control searchLocation">
// </div>


// <i class="bi bi-bookmark-heart-fill"></i> heart bookmark


// 	  <div class="row">
  //   <div class="col-md-12">
  //     <div  class="d-flex justify-content-end p-4 backgroundColor">
  //     <form action="" method="POST" class="form-inline my-4 w-100 justify-content-end fullWidthForm position-relative mr-4 searchForm">
  //       {% csrf_token %}
  //       <input type="text" class="form-control text-box rounded-pill" placeholder="Start Here" required>
  //       <input type="text" class="form-control text-box rounded-pill" placeholder="Start Here" required>

  //       <div class="buttonContainer">
  //         <button class="btn" type="submit"><i class="bi bi-check-circle-fill submitBtn"></i></button>
  //         <button class="btn" type="reset"><i class="bi bi-x-circle-fill"></i></button>
  //       </div>
  //       <span class="line"></span>   
  //     </form>
  //     </div>
  //   </div>
  // </div>

// function paginate(argument) {
// 	// body...
// 	return
// }



	// let container = document.querySelector('#result-display');
	// if (Number(counter) > 1){
	// 	container.innerHTML = "";
	// }

	      //   # # print(headlines.keys(), paginator)
        // # print('response recieved, Lami')
        // # return JsonResponse(headlines, status=201)


// 	          <!-- <input type="" class="form-control" placeholder=""> -->
// <!--         <div class="form-group">
//             <label for="exampleFormControlSelect1"> <h6> Category </h6> </label>
//             <select class="form-control" id="exampleFormControlSelect1">
//               <option>1</option>
//               <option>2</option>
//               <option>3</option>
//               <option>4</option>
//               <option>5</option>
//             </select>
//           </div> -->
// <!--           <div class="input-group mb-3">

//         </div> -->

    // # article_date =     content = models.TextField(verbose_name="Post", default="", max_length=2048, null=False)

			// articles.forEach((el, idx) => { 
			// if (start <= idx+1 <= end){

			// 	console.log(idx, "counter", counter);
			// 	el.style.display = "none";
			// }
			// else{
			// 	el.style.display = "none";
			// }
			// });


	// // When DOM loads, render the first 20 posts
// document.addEventListener('DOMContentLoaded', load);


// // Start with first post
// let counter = 1;

// // Load posts 20 at a time
// const quantity = 10;

// If scrolled to bottom, load the next 20 posts
// window.onscroll = () => {
// 	const articles = document.querySelectorAll('.bookmarks');
// 	if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
// 		load(articles);
// 	}
// };

// // Load next set of posts
// function load(articles) {
// 	// Set start and end post numbers, and update counter
// 	const start = counter;
// 	const end = start + quantity - 1;
// 	counter = end + 1;
// 	console.log(start, end, counter, articles);

// 	if (articles !== undefined){

// 	for (let i = 0; i < counter; i++){
// 			console.log(articles[i])
// 			articles[i].style.display = "block";
// 		}
// 	}
// 	return 

// 	// // Get new posts and add posts
// 	// fetch(`/posts?start=${start}&end=${end}`)
// 	// .then(response => response.json())
// 	// .then(data => {
// 	// data.posts.forEach(add_post);
// 	// })

// };

// // Add a new post with given contents to DOM
// function add_post(contents) {
// 	// Create new post
// 	const post = document.createElement('div');
// 	post.className = 'post';
// 	post.innerHTML = contents;

// 	// Add post to DOM
// 	document.querySelector('#posts').append(post);
// };


// const fetchPage = async (url) => {
// 	let headers = new Headers();
// 	headers.append("X-Requested-With", "XMLHttpRequest");
// 	return fetch(url, {headers});
// }

// const appendElements = async (scrollElement, counter, baseUrl) => {
// 	let url = `${baseUrl}?page=${counter + 1}`;
// 	let req = await fetchPage(url);
// 	if req.ok{
		
// 	}
// }

		// attachInfiniteScroll(bottomSentinel, scrollElement, baseUrl);
	    // if is_ajax(request):
      //   return render(request, "capstone/bookmark.html", context)
    // <!-- <script src="{% static 'capstone/jquery.waypoints.min.js' %}"></script> -->
    // <!-- <script src="{% static  'capstone/infinite.min.js' %}"> </script> -->


	 // `  pip install -r requirement.txt`




// <h2 id="title_page"> All Tweets by {{ profile_users.username }}</h2>



// <div id="posts-section">  
// 	{% for post in posts%}
// 	 <div class="card">
//       <div class="card-body tweetsdiv" data-tweets="{{ post.id }}">
//         <h5 class="card-title"> {{ post.author }} </h5>

//         {% if user.pk == profile_users.pk %}
//         <a href="#" class="card-link btn-sm btn-primary editButton"  data-post="{{ post.id }}"  role='button'> Edit </a>
//         {% endif %}
//         <p class="card-text" id="{{ post.id }}"> {{ post.content }} </p> 
//     	<span style=color:grey;> {{ post.timestamps }} </span> <br/>
//     	<br/>
//         <span href="#" class="card-link"> <ion-icon name="heart" id="{{ post.id }}box" aria-pressed="false"></ion-icon></span> <span id="{{ post.id }}post"> {{ post.user_likes }} likes <br/> Comment</span>

//       </div>
//     </div> 
//     {% empty %}
//     No Post yet
// 	{% endfor %}
// </div>
  

//   <nav aria-label="Page navigation example">
//   <ul class="pagination justify-content-center" id="page-number">
//     <li class="page-item" >
//       <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Prev</a>
//     </li>
//     <li class="page-item"> 
//       <a class="page-link" href="#">Next</a>
//     </li>
//   </ul>
// </nav>
// {% endblock %}


// {% block footer %}

// <footer>{{profile_users.username}} Profile Page </footer>

// {% endblock %}

// {% block script %}
//     <script src="{% static 'network/profile.js' %}"> </script>
// {% endblock %}
