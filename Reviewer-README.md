# Notes to the reviewer

## How to get this running on your machine
- Note: I used Windows to develop and test this
- Since this uses port 80 for the front end, make sure you are not already using port 80 for something else
- Install NodeJs ver 18.x.x
- Install Docker Desktop (VM was WSL)
- From this repo's /code folder (where the docker-compose.yaml file is located)
    Run the command "docker-compose up"
- Browser cookies must be enabled for this to work correctly
- tested in Chrome & Firefox
- in the browser hit 'http://localhost' (port 80)
- you can use pgAdmin (postgres management app) to inspect the DB -- @ localhost port 5432, 'postgre' user, 'example' password,  'edge_test' database
- you can use the included Postman collection to hit the API directly (import the included postman collection & environment)

## List of dev comments
- I didn't get time to work on css / styles

### In the real world...
- All this should be under HTTPS (this was not done for this test)
- .env file would not be checked into github -- done it here so reviewer doesn't have to put one together
- No passwords or other sensitive data should ever be checked into github
