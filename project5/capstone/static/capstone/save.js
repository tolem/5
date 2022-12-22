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
