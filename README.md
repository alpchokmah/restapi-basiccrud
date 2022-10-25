# restapi-basiccrud

API URL: http://localhost:8080/api

API ENDPOINTS  

http://localhost:8080/api  
GET METHOD
- server is running

http://localhost:8080/api/list  
GET METHOD
- display all records

http://localhost:8080/api/random  
GET METHOD
- Display a random data

http://localhost:8080/api/add-list  
POST METHOD
- Add a new set of record(s)
  >Sample Data  
  {
      "color": "name of color",  "animal":"name of animal"  } 

  >If array:
  [  
	  {"color": "color 1", "animal": "animal 1"},  
	  { "color": "color 2",  "animal": "animal 2"}  
  ]

http://localhost:8080/api/update/:id  
PUT METHOD
- Update a record based on the ID provided on the params

http://localhost:8080/api/remove/:id  
DELETE METHOD
- Delete a record based on the ID provided on the params

#
## How to install and run this app

##
Clone the source on your computer

##
Install the packages and dependencies
> npm install

Run the server
> npm run dev

Use a POSTMAN or Insomnia to interact with the API