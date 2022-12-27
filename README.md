# Capstone
This web application meets the requirement as it is utilize Django on the back-end and JavaScript on the front-end. Also, it uses two models on the backend (User and Article) and it is mobile responsive.

## Distinctiveness and Complexity
The web app is distintive as it supports user registration and storing of data. Also the project is distinctive from the prior projects completed in the course as it is a news web application that allows site visitors the ability to query for news topic and find headlines that matches their interest, signed in user can bookmark articles or delete. Moreover, the web app is powered by [News API](https://newsapi.org/) it is REST API that enables users to find  breaking news headlines from news sources and blogs across the web. 

### file structure
1. root
     - views.py
          This file contains the site view that controls what a users sees on the site. The website main logic are implemented here,           such as login, and registration authentication. Also, the backend server and calls made through AJAX to server is handle             here. 
     - model.py
          This file contains the database model, it is where model logic is implemented for both Users and Articles model
2. static
     - index.js
          Contained in this file are JavaScript code that enable dynamic functionality for the site, here is found event listenes that enable the page to respond based on user interaction. Also found are AJAX scripts used to communicate from the front end to the backend scripts. The program makes calls to the server, handles response and provides the user with releant news where found. It also has code that paginates the returned object to improve user interface.   
     - bookmarks.js
          This file is specific for the bookmark page, it contains code that manipuates the HTML DOM for that page. Here code for dynamic rendering and updating the database when a user deletes an artices. It also contains an infinity rendering when a bookmarks exceed 10.  
          
     - style.css
          All custom CSS3 used in this web application are found here, it contains the style assets and design logic used for this             web application.
        

3. templates
     - layout.html
         This file contain the base html layout from which other html component inherits via Jinja template engine
     - index.html
          This file contains the database model, it is where model logic is implemented for both Users and Articles model
          
     - bookmark.html
          All custom CSS3 used in this web application are found here, it contains the style assets and design logic used for this             web application.


#### How to run the web application
     - from the root folder run requirements.txt via pip install -r requirement.txt



