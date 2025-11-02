How to run

# Dependencies
1. Docker installed with Docker Compose
2. Node.js

# How to run
1. git pull the project
```cmd 
git pull <repo-link>
```
2. Then get into the directory and install dependencies
```cmd 
npm install or yarn
```
3. Then run the server error
```cmd 
npm run start:dev
```

# DB setup (First run Docker container before starting server)
1. Start Docker container
```cmd 
docker-compose up or docker compose up
```
2. If check prisma dir if migration file present
```cmd 
npx prisma push
```
ELSE
   If it's not working and migration files are present, first delete all migrations. 

```cmd
npx prisma migrate dev
```
3. Then populate the data
```cmd 
npx prisma db seed
```
