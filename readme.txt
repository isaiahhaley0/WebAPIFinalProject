Project Name: Charity Roundup

High Level Concept: Offer customers the option of rounding their purchases up to the nearest dollar and donate the change to a charity of choice. 

API: create a payment api for an ecommerce app, the API will provide ability for an admin to insert new charities, along with the relevant payment information for that charity, into the database. If the user indicates that they wish to perform a roundup the API will handle the creation of the relevant transactions(both the donation and the purchase), and record the transaction information in the database.

Front End: The front end will be an online marketplace mobile application. Before the order s submitted the user will be asked if they wish to round up their bill to the nearest dollar, and donate the change to charity. The user should have the option of selecting the charity they wish to donate to, as well as viewing a summary page showing how much the user has donated to charity.

Database: The database will contain:
	
	A List of charities, Along with the number of users who have donated and the total dollar amount donated to the charity

	A list of users, with the total dollar amount they have donated to charity as well as the total amount spent in the app.