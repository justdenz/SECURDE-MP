Database Used: MySQL Workbench
Framework: NodeJS (Backend) and React (Frontend)

Set Up
1. Ensure that your MySQL server on your device is running along with MySQL Workbench with the proper DB credentials.
    Default Credentials for DB: 
      NAME='root'           (username for the server)
      PASSWORD='password'   (password for the server)
      DATABASE='library'    (name of schema)
      HOST='localhost'      
2. To change database credentials, navigate to the .env file located on ./backend/.env
3. To change admin credentials (for the admin account), navigate to the same file as above.
    Default Credentials for Admin Account:
      ADMIN_USERNAME='admin'
      ADMIN_PASSWORD='password' 
4. Install the npm dependencies in BOTH the /backend and /client folder by running 'npm i' command on the corresponding folders


Running the program
1. Open 2 terminals (one will be used for the backend and the other frontend)
2. Via the terminal, change directory to the backend folder and run the command 'node server.js' to start the backend server
    Notes:
      - You will see in the console log that the port is live and the DB has been initialized
      - By default, we populate the database with 3 users and a number of books, authors, and book instances for testing purposes.
3. Via the terminal, change directory to the client folder and run the command 'npm start' to launch the frontend