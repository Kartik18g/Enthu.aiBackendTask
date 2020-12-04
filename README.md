# Enthu.aiBackendTask
This project is a part of my Enthu.AI internship interview

It is an API microservice that creates a 500px X 500px thumbnail of image you provide. "/api/createthumbnail" route accepts an image URL and returns a 500X500 image 
in base64 format.
"/api/createthumbnail" is a private route accessible to only users who have logged in and have authorization token present in the header "Authorization" of the request.
You can log in from "/api/login" route , it's a mock authentication that returns jwt on every combination of usrname and password , though express validator 
make sure no empty fields are passed.

## Steps to Run:
1. git clone https://github.com/Kartik18g/Enthu.aiBackendTask
2. npm install
3. npm start

### Make sure you add an Authorization header before making requests to the protected endpoint. eg Authorization : Bearer token
