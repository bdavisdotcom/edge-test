# Notes to the reviewer

## Please email or call me if you have trouble getting this working.

##
- there are 3 parts/ docker containers
  - web the nginx web server (with proxy pass-thru to the back end API) and react front end code
  - server the nodejs API
  - db the postgres database
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

## List of dev comments / Caveats
- Scroll to the right of the grid to see the "edit/delete" buttons
- I wrote all of this by hand, manually, starting on Oct 17 (see commit history) -- except for bootstrapping the react app so I wouldn't have to write webpack,etc, configs. I referenced the web where needed, as I have used many different languages and tech stacks in the last few years--things get lost if not used regularly (I used agGrid, used their docs, etc). See github commits for the progression.
- I didn't get time to work on css / styles
- I ran out of time before I could add unit / integration tests
- I ran out of time before I could put documentation together
- I didn't get around to the user profile image
- field / form validation could use more work, again, I ran out of time
- There are lots of "console.log()" and "console.dir()" which would not go into the wild normally. This is a dev exercise.
- SO that also means there could be bugs ;)  

### In the real world...
- All this should be under HTTPS (this was not done for this test)
- .env file would not be checked into github -- done it here so reviewer doesn't have to put one together
- No passwords or other sensitive data should ever be checked into github -- should be put into AWS secrets manager or similar, use AWS API to pull at run time

