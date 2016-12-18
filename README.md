#  Group11: Designform
## Group Member
Yu Ang Zhang 
`zhan1539`

ZiYao Ye 
`yeziyao`

Wenzheng Ding 
`dingwenz`

Zili Xie 
`xiezili2`

Dingren Luo
## Description
Designform is a platform for designers to show their products of art, design scripts or even their great fantastic ideas. This website is designed for those of people who have strong interests in creative design and want to share their works of art as well as the products made by themselves. Artists are always seeking for some places to display their works and exchange ideas with their "like-minded" friends. Designform gives a perfect solution to this. With Designform, you can not only view and make comments on other designers' art work, but also share your own achievement to others. Others can rate and comment on one's products. Artists can update and improve their products if they want.


## How it works
In the login page, users can choose to login using either their Designform account or their Facebook account. If they do not have one, clicking on the create account button will trigger the webpage into a sign up form. After finishing the set up the users will be send to the main page of the website. If the user log in as an artist, then he can see all the products created by registered form members in the main page, he or she can visit any of the products, make comment to it or leave a rating. If the user log in as the administrator then the user can remove or edit any of the artists in the designform as well as the products that they created.


## Features
Our project is to built a web application to implement the Designform platform. The following is a list of the features:

- **User Authentication**: Login with user account. 
- **Third-party Authentication**:  Login using Facebook account without signing up in the form.
- **User Profile**: Each user has a profile page including privacy informations, emails and the pictures for all the user's products.
- **User Actions**: Artists can release a products with descriptions and sale status attached with a picture for their products for the purpose of better visual experience. Thay can also remove and edit the products that they have already posted. In addition, users can search for a specific product or user according to their username, name or country.
- **User Interactions**: Designers can see all products in main page and view others products in their profile pages. Other users can make reviews on the products they've seen. 
- **Administrative View**: The website administrator will log in to an administrative view which is a different view from normal users. Administrator can remove artists as well as their products.


## Structure

- ``MongoDB``: Database
- ``Express.js``: Controller, Driver
- ``Node.js``: Server
- ``Bootstrap``: Style
- ``NPM``: mongoose.js, passport.js, shortid.js, bcrypt-node.js
- ``View``: EJS
- ``JQuery``: Script
- ``Mocha/Should.js/Supertest.js``: Unit Test

## Database Schema
We are going to use mongodb with mongoose module in our project. The database saves all informationsabout our website, and provide functionality of all database operations. Whenever the pages need to interact with database, this module should be used.
The followings are our database schemas:
- `Review` : {reviewID, rating, author, releaseTime, text};
- `Product` : {name, description, releaseTime, onSaleStatus, reviews : [list of Review], picture};
- `Artist` : {username, pwd, givenname, lastname, gender, email, country, status, role, products: [list of Product], picture};


## Module Design

### Main page
The Main page search module is responsible for the display on main page. At first, by default, it would display all the products added by all the registered artists, a display board is placed in the middle of the page to show the hotest products currently.

### Navigation bar
The navigation bar provides functionality of upper side panel for all pages. This module takes the session information from authenation module, provide and display the corresponding functionalities that the user now can choose on the panel. 

### Profile page
Display some privacy informations of the users including their first and last name, gender, email and so on. It also list all their works of art in grids. Moreover, if the user is authenticated, it will display the complete information about a user with update options. Otherwise, the profile page only shows public information about a user without privacy informations. Authenticated users can update their informations such as password, email, sale staus of their products.

### How to Start
- First, clone this repository and ``cd `` into it. Enter ``npm install`` in order to install all the modules
- After finish installing, open another ternminal and enter ``mkdir data`` and then ``mongod --dbpath=$PWD/data``( Make sure you have mongo installed in your machine)
- If you want to have existing data, you can enter ``mongoimport --db artistsdb --collection artists --type json --file data.json --jsonArray`` within the repository
- Enter ``node index`` to start the server after you have your database setup. Our website is live at ``http://localhost:3000``
- About the admin, we have planned to register the admin after the database has been setup. That means, you have to
register admin account if you want to test it. Make sure your admin account has username as ``admin``, email address as ``leonzhang1996@hotmail.com`` and your password as ``secretkeydesignform``.

### Testing
- Use Mocha and its assertion library to test the back-end functionality
- ``test_result.jpeg`` is the result of our test

### Third Party Authentication

- We obtained an admin secret and keys from facebook Developer center in order to make sure the thrid party authentication works.
You will see the exact details in ``facebook.jpg``. You can also check out this video as 
 and understand how we set up the similar authentication for our project ``https://www.youtube.com/watch?v=OMcWgmkMpEE&t=241s``

### Improvements

- Amazon S3 is definitely a great choice for storing objects such as images in the bucket. Our TA(Simon) provides some useful resources
for us to integrate our web applications and we will definitely take a detailed look into that in the future.
- The back-end can be more sophisticated. The majority of the Group members 
decides to use routes that are differed from the originals and it turns out the resulting APIs can be more organized
- We can definitely write more testing cases and test more on the render aspect of our back-end logic.

