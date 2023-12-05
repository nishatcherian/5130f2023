# Building and running the app
## Database set up
* Pull docker image: `docker pull mysql:latest`
* Run MySQL image with the DDL scripts: `docker run --name=mysql-container-102 -e MYSQL_ROOT_PASSWORD=passwd123 -v .\backend\db\:/docker-entrypoint-initdb.d -d -p 3306:3306 mysql` 

  # To build and run the backend docker container 
  * Build
  ```
  cd backend 
  docker build -t shoppingwishlist:1.0.0 .
  ```
  * Run
  ```
  docker run --add-host host.docker.internal:host-gateway -e MYSQL_URL=host.docker.internal -p 8000:8080 -d shoppingwishlist:1.0.0
  ```
  
 
