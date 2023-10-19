# Notes to the reviewer

## How to get this running on your machine
- I used Windows
- Install Docker Desktop (VM was WSL)
- From this repo's /code folder (where the docker-compose.yaml file is located)
    Run the command "docker-compose up"

## List of dev comments

### In the real world...
- All this should be under HTTPS (not done for test)
- .env file would not be checked into github -- done it here so reviewer doesn't have to put one together
- No passwords or other sensitive data should ever be checked into github