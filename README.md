# Capstone
This web application meets the requirement as it is utilize Django on the back-end and JavaScript on the front-end. Also, it uses two models on the backend (User and Article) and it is mobile responsive.

## Distinctiveness and Complexity
The web app is distintive as it supports user registration and storing of data. Also the project is distinctive from the prior projects completed in the course as it is a news web application  as site visitors can query for news topic and find headlines that matches their interest, signed in user can bookmark articles or delete. Moreover, the web app is powered by [News API](https://newsapi.org/). A REST API that enables users to find  breaking news headlines from news sources and blogs across the web. The web app make use of JavaScript in the frontend to process query and at the backend python to handle request to and from the API and the response is shown to the user from the Ajax call.

**Project Justification**: The capstone project is sufficiently distinct from other in the course as it extends past learning to build a useful tool that can assist users catalog news; that interest them. Moreover, the complexity is demonstrable as the project uses all capabilities of NewsAPI and presents users with the option to search for everything as default or chose headlines from news sources. Moreover, the project goes further and provides an advanced search form that can assist users to get relevant sources; which they can then bookmark or visit directly all via calls to [NewsAPI](https://newsapi.org/) . 



### file structure
1. **_root_**
     - views.py
          This file contains the site view that controls what a users sees on the site. The website main logic are implemented here,           such as login, and registration authentication. Also, the backend server and calls made through AJAX to server is handle             here. 
     - model.py
          This file contains the database model, it is where model logic is implemented for both Users and Articles model
2. **_static_**
     - index.js
          Contained in this file are JavaScript code that enable dynamic functionality for the site, here is found event listenes that enable the page to respond based on user interaction. Also found are AJAX scripts used to communicate from the front end to the backend scripts. The program makes calls to the server, handles response and provides the user with releant news where found. It also has code that paginates the returned object to improve user interface.   
     - bookmarks.js
          This file is specific for the bookmark page, it contains code that manipuates the HTML DOM for that page. Here code for dynamic rendering and updating the database when a user deletes an artices. It also contains an infinity scroll rendering when a bookmarks exceed 5 per page.  
          
     - style.css
          All custom CSS3 used in this web application are found here, it contains the style assets and design logic used for this             web application.
     - form.css
          All custom form styles for login and registration are found here.
        

3. **_templates_**
     - layout.html
         This file contain the base html layout from which other html component inherits via Jinja template engine
     - index.html
          Contains the home page, the default page shown to a user that visits the site, it contains HTML5 code and vanilla Bootstraps. The main components found here is a Bootstrap form that accepts users input and renders search result. 
          
     - bookmark.html
          Contains bookmark page, this page is visible to only loggedin user, it is not shown otherwise. The fle contains Jinja template syntax for rendering dynamic HTML and Bootstraps. 
          
     - userprofile. html
          Contains basic user profile information and a delete button for authenticated users to delete their account.


### How to run the web application
* Head over to [NewsAPI](https://newsapi.org/), an API key is needed to query for news. Not to worry the developer plan is available for testing!

* from the root folder create and activate a virtualenv like this (instructions may differ on Windows):

```
$ python -m venv myvenv
$ source myvenv/bin/activate
```

Install project requirements:

```
$ pip install -r requirements.txt
```

Run migrations:

```
$ python manage.py makemigrations capstone
$ python manage.py migrate capstone
```

Add your API key to Django envrionment varibales
```
NEWS_API_KEY="SECRET_KEY"
```

Now you can start the server:

```
$ python manage.py runserver
```

You can view the example at http://127.0.0.1:8000

#### Additional information
I intend to add other custom API moving forward, perhaps an API  that could process add context to news delivered from the API. Also plan to improve the profile page UX to show relevant information for users. 
#### License

MIT
