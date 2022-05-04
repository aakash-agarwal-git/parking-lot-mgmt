# Parking Lot Management System

Parking lot management system using nodejs and mongo db


### Usage

```sh
$ npm install
```

```sh
$ npm start

# Visit http://localhost:PORT 
```
Port is a const in www file

### ENV for running on local

Create '.env' file and add
1.  MONGO_USER =  Mongo DB user name
2.  MONGO_PASS = Mongo DB user password
3.  MONGO_DATABASE = Mongo DB database to be used
We are using Mongoose ORM to intearct with MongoDB Atlas

#To run APIs
Please import the postman collection JSON via the name of Parking-mgmt.postman_collection.json

# What's Parking Lot Management System
We want to build a parking lot management application. Multiple parking lots want to use this
application.
1. Platform should be able to support multiple parking lots
2. There are different types of vehicles: Two-Wheeler, Hatchback Car, SUV Car
3. Each parking lot has separate capacity for each kind of vehicle.
4. There are different hourly rate cards for each kind of vehicle
a. Ex : (0-2 hrs 20 Rs, 2-4 hrs 40 Rs).

## Assumptions :
You can seed data for these
1. Parking Lots
2. Capacity of parking lot for each kind of vehicle
3. Rate card for each vehicle kind

## Demonstrate:
1. Park a Vehicle at a given parking lot (should fail if the lot is full)
2. Exit from the parking area and tell the amount due for the duration.
3. Given a vehicle no., see complete parking history (Lot, Area, Duration, Amount Paid)


