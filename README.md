# Real time notificaions

  This repository was made so that I can learn more about socket.io and real-time.
  
# How to run

## Cloning this repository
  ```
    git clone https://github.com/tsuyusk/real-time-notifications
  ```

## Server
  ```bash
    # Go to 'server' folder
    cd server
    
    # Install dependencies
    yarn
    
    # Create a mongodb database instance with docker
    docker run --name name_of_instance -p 5432:5432 -d mongo
    
    # Create a .env file with the same variables than .env.example file and fill them
    
    # Start
    yarn dev:server
  ```

## Web
  ```bash
    # Go to web' folder
    cd web
    
    # Install dependencies
    yarn
    
    # Start
    yarn start
    
    # Go to http://localhost:3000
  ```

# How to send a notification
  For sending a notification, You have to make a POST request to http://localhost:3333/notification, with the target_name, title and description in the request body

Made with 💜 by tsuyusk

