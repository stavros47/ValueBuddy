# ValueBuddy
**A coupon manager bringing together Customers and Businesses**

This is a project I am doing as my Bachelor degree's Final Project.
Using web technologies I am creating a single page application communicating with a Rest API using an SQL database.

## Languages / Tools:

* Javascript for both the front and back end.
* NodeJS runtime with the help of Express framework for the RestAPI.
* PostgreSQL for the database.
* ReactJS with hooks for the front-end.
### Details:
* Using JWT tokens for authentication so the API has no state. The token saves the users  (business/custom*e) and their id.Some Routes are role protected, while others are available to all authenticated users.
* *ToDo: create a script to install/initialize and load the database from an sql file.*

## Intro: 

Businesses seek new ways to reach customers, to engage and reward loyalty or be discovered by new ones. People look for ways to save money, and with that as a motive they can save money on their favourite items or places, or even discover new value in previously unknown to them businesses. 

## Goals: 

The system will serve as a platform for a Business to create discount coupons in batches and offer them to customers. Customers will be able to browse and find the deals they like, claim the coupons to their wallet and redeem them for value. 
Both a customer and a business can see different analytics based on the coupons usage.
