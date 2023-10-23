# Notes to the reviewer

## Please email or call me if you have trouble getting this working.

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
- if you use the postman collection, you must copy / paste the JWT you get back from LOGIN into the environment variable manually. It will expire after 1 hour as well.
- if its needed to rebuild the FE react stuff, issue "npm install" and then "npm run build" from the /web folder.
## List of dev comments
- I wrote all of this by hand, manually-- except for bootstrapping the react app so I wouldn't have to write webpack,etc, configs. I referenced the web where needed, as I have used many different languages and tech stack in the last few years--things get lost if not used regularly (used agGrid, used their docs, etc). See github commits for the progression.
- I didn't get time to work on css / styles
- I ran out of time before I could add unit / integration tests -- will add in the near future
- I ran out of time before I could put documentation together -- will add in the near future
- field / form validation could use more work, again, I ran out of time -- will add in the near future

### In the real world...
- All this should be under HTTPS (this was not done for this test)
- .env file would not be checked into github -- done it here so reviewer doesn't have to put one together
- No passwords or other sensitive data should ever be checked into github -- should be put into AWS secrets manager or similar, use AWS API to pull at run time
