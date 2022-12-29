console.log("HelloWord");
document.addEventListener("DOMContentLoaded", () => {
	

	const deleteButton = document.querySelectorAll('.delete');
	const articles = document.querySelectorAll('.bookmarks');
	const csrftoken = getCookie('csrftoken');
	const total = articles.length;
	const bottomSentinel = document.querySelector('#bottom-sentinel');
	const scrollElement = document.querySelector('#scroll-element');
	const baseUel = "{% url 'bookmark' %}";
	const likeBtn =  document.querySelectorAll('.bi-balloon-heart-fill');
	console.log(likeBtn);


	// load(articles); not needed django server renders DOM already 

	deleteButton.forEach(ele => {
		ele.onclick = (btn) => {
		div_id = ele.getAttribute("data-btn");
		btn_id =  Number(div_id.split("news")[1]);
		console.log(btn_id);
		const removeArticle = document.querySelector(`#${div_id}`);
		deleteArticle(btn_id, csrftoken);
		removeArticle.remove();
	}
	}
		);

	likeBtn.forEach(btn => {
		btn.style.color = "grey";
		if (btn.dataset.like === "True"){
			btn.style.color = "red";
		}
		
		btn.onclick = (e) =>{
			console.log(btn.dataset.like);
			if (btn.dataset.like === "False"){
				btn.dataset.like = "True";
				console.log(btn.dataset.id, 'liked');
				btn.style.color = "red";
				liked_post(btn.dataset.id, csrftoken);
			}
			else{
				btn.dataset.like = "False";
				btn.style.color = "lightgrey";
				unliked_post(btn.dataset.id, csrftoken);
			}

			console.log("clicked btn", btn.dataset.like);
		}

	})

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


function deleteArticle (article, tokens) {
	       	fetch("mark", {method:"DELETE", headers: {'X-CSRFToken': tokens}, body: JSON.stringify({id: article})
	           }).then(resp => resp.json()).then(result => console.log(result)).catch(err => console.log(err));
	       return
}


function liked_post(id, tokens){
  fetch(`/isliked`, {
  method: 'PUT',
  headers: {'X-CSRFToken': tokens},
  body: JSON.stringify({
      liked : id,
  })
  
}).then(() =>{ console.log("sent to server"); }).catch(err => console.log(err));
}

function unliked_post(id, tokens){
  fetch(`/isliked`, {
  method: 'DELETE',
  headers: {'X-CSRFToken': tokens},
  body: JSON.stringify({
      liked : id,
  })
  
}).then(() =>{ console.log("sent to server"); }).catch(err => console.log(err));
}


