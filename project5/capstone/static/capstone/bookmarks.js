console.log("HelloWord");
document.addEventListener("DOMContentLoaded", () => {
	

	const deleteButton = document.querySelectorAll('.delete');
	const articles = document.querySelectorAll('.bookmarks');
	const csrftoken = getCookie('csrftoken');
	const total = articles.length;
	const bottomSentinel = document.querySelector('#bottom-sentinel');
	const scrollElement = document.querySelector('#scroll-element');
	const baseUel = "{% url 'bookmark' %}";


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



