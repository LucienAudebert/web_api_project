# Web project

## What is this project ?
This is a small project we did as part of one of our courses. It is a simple **frontend + backend application**, simulating an **e-commerce site** (without payment management).

We used **Mongodb** to create our database, the **React** library for the frontend, and **Node.js** (with **Express.js**) for the backend.

When you launch the application you arrive on a *login* page. You will need to enter your name, e-mail address and geographic address in order to **buy fruits**. You can add fruits to your cart and then click on the *OK* button to go the validation page. 

On this page you can **confirm your order**. This will create a **new User** in the database with the information you entered on the login page. It will also update the list of **Products**, and create a **new Order** in the database, with the information of your order. ***All this will be done only if there is enough Products in the database !***


## Project structure  

### General structure

|-- **client**   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- **src**: contains all the source code  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- **index.js**: entry point of the client  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- **App.js**: manages routing  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- **pages**: contains all the pages of the website  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- **components**: JSX files used by web pages  
|-- **server**  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- **index.js**: entry point of the server, contains all the middlewares  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- **models**: contains the structure of the models stored in the DB and db.js (used to connect to the DB)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- **routes**: contains routes, enables urls to be redirected to specific controllers  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- **controllers**: contains the files used to process request  

A controller will manage the manipulation of a single type of schema with the same name. For example, the user.js controller will only manipulate objects whose schema is defined in the users.js model.  

### Our choices for the models
We decided to store 3 things in the DB :  
|-- **Users**:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- *name*  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- *e-mail*  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- *address*  
|-- **Products**:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- *name*  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- *quantity*  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- *price*  
|-- **Orders**:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- *e-mail*  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- *cart*: contains all the Products we bought and their quantity

    


## How to launch the project
First, you need to install Node.js (***version 18 or more***), you can click [here](https://nodejs.org/fr) to download it.
Then, you will need to install Mongodb (we used the  Mongodb 7.0 version) on your computer, you can follow this [link](https://www.mongodb.com/docs/manual/tutorial/).

After you downloaded this repository, you can go to the ***server*** folder and execute the following command to install all the required packages for the server : 
`npm ci`

You can then do the same command in the ***client*** folder.

Once this is done, you are ready to launch the project ! You can use the command `npm start` in the client folder, and the project should start. 

***Dont forget to start the Mongodb service !***

