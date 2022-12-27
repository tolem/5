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
          This file contains the site view that controls what a users sees on the site. The website main logic are implemented here,           such as login, and registration authentication. Also, the backend server and calls made through AJAX to server is handle             here. 
     - bookmarks.js
          This file contains the database model, it is where model logic is implemented for both Users and Articles model
          
     - style.css
          All custom CSS3 used in this web application are found here, it contains the style assets and design logic used for this             web application.
        

3. templates
     - layout.html
          This file contains the site view that controls what a users sees on the site. The website main logic are implemented here,           such as login, and registration authentication. Also, the backend server and calls made through AJAX to server is handle             here. 
     - index.html
          This file contains the database model, it is where model logic is implemented for both Users and Articles model
          
     - bookmark.html
          All custom CSS3 used in this web application are found here, it contains the style assets and design logic used for this             web application.
4. templates



