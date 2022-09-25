## Getting Started

To get a local copy up and running follow these simple steps.
<br/>
For using the frontend part [click here](https://github.com/sumit-kr-das/rental)

### Prerequisites

NodeJS, MongoDB is installed on your machine and the credentials matches ```config>index.js``` available in the root directory

### Installation

1. Clone the Rental API

```sh
$ git clone https://github.com/sumit-kr-das/rental-api
```

2. Install NPM packages

```sh
$ yarn install or $ npm install
```

3. Start the API

```sh
$ yarn dev or $ npm run dev
```

## Setup ENV
At first create a .env file into your root directory and use all the provided variables. 
- PORT=8000 (use any port no)
- DB_URI=mongodb+srv://username:password@cluster0.ke0cr.mongodb.net/?retryWrites=true&w=majority 
(replace username and password with your own username & password)
- SALT_ROUND=10 (SALT_ROUND should be minimum 10)
- JWT_SECRET=wXlf2n3VHwAoa5KqpTUUDz9+1GOYp3Zo/iVZND9hXck= (JWT_SECRET should be min 32char long)
<br/><br/>
## All Endpoints 
You should use your own base url here instead of [http://localhost:8000/]
<br/><br/>
> base route & healthcheck route
- http://localhost:8000/  => Base URL
- http://localhost:8000/api/v1/healthcheck => Check the health of your application
<br/><br/>
> auth routes
- http://localhost:8000/api/v1/login => login
- http://localhost:8000/api/v1/register => register
<br/><br/>
> hotel routes
- http://localhost:8000/api/v1/hotel => create a new hotel
- http://localhost:8000/api/v1/hotel/:id => update hotel
- http://localhost:8000/api/v1/hotel/:id => delete hotel
- http://localhost:8000/api/v1/hotel/find/:id => get specific hotel by id
- http://localhost:8000/api/v1/hotel/ => get all hotels
<br/><br/>
- http://localhost:8000/api/v1/hotel/countByCity => count by city
    - http://localhost:8000/api/v1/hotel/countByCity?cities=virginia,losangeles,newjersy,newyork,sanfrancisco,wilmington
- http://localhost:8000/api/v1/hotel/countByType => count by type
- http://localhost:8000/api/v1/hotel/room/:id => get room by id
<br/><br/>
> user routes
- http://localhost:8000/api/v1/user/:id => update user's password
- http://localhost:8000/api/v1/user/:id => delete user
- http://localhost:8000/api/v1/user/:id => find user by id
- http://localhost:8000/api/v1/user => find all users
<br/><br/>
> room routes
- http://localhost:8000/api/v1/rooms/:hotelid => create a new room & update room number on hotel 
- http://localhost:8000/api/v1/rooms/:id => update room by id
- http://localhost:8000/api/v1/rooms/:id/:hotelid => delete room & remove room no from hotel
- http://localhost:8000/api/v1/rooms/:id => get room by id
- http://localhost:8000/api/v1/rooms => get all rooms
- http://localhost:8000/api/v1/rooms/updateAvailability/:id => update unavailable dates and book hotel
<br/><br/>
> booking route
- http://localhost:8000/api/v1/bookings => get all booking details
- http://localhost:8000/api/v1/bookings/:id => cancel booked hotel
<br/><br/>
> newsletter route
- http://localhost:8000/api/v1/newsLetter => post user's email id

