# Building and running the app
## Database set up
* Pull docker image: `docker pull mysql:latest`
* Run database locally: `docker run --name=mysql-container-9 -e MYSQL_ROOT_PASSWORD=passwd123 -d -p 3306:3306 mysql` 
* Connect using `mysql -h 127.0.0.1 -P 3306 -u root -p`

  # Docker
  * Run
  ```
  cd backend 
  docker build -t shoppingwishlist:1.0.0 .
  ```
  * Build
  ```
  docker run --add-host host.docker.internal:host-gateway -e MYSQL_URL=host.docker.internal -p 8000:8080 -d shoppingwishlist:1.0.0
  ```