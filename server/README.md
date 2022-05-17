# Digital Jabar Service API tes

## Getting started

1. Clone the repository to editor
```
git clone https://github.com/muntundoang/djs.git
```
2. Change directory to server
```
cd djs/server
```
3. Install all dependencies
```
npm install
```
4. Configure postgres SQL in config folder inside server then change all username and password in developement and test object that connect to local postgres database
```json
{
  "development": {
    "username": "postgres", <-- change this
    "password": "postgres", <-- change this
    "database": "djsDB",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres", <-- change this
    "password": "postgres", <-- change this
    "database": "djsDB_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "use_env_variable":"DATABASE_URL",
    "ssl": true,
    "dialect": "postgres",
    "protocol": "postgres",
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    }
  }
}
```
5. Make sure create .env file and the content can be seen in .env example
```
touch .env
```
content of .env file (for example)
```
# PORT
PORT=3001
```
6. Make sure the .sequelizerc env in developement environment
```
module.exports = {
    env: 'developement'
}
```
7. Execute create database, migrate and seeding to SQL
```
npm run create
npm run migrate
npm run seed
```

8. To run server
```
npm run start
```

9. To know all endpoints read endpoints-doc.md

----------------------------------------------------

## Testing

1. For testing change .sequelizerc enviroment to test
```
module.exports = {
    env: 'test'
}
```
2. Execute create database, migrate and seeding (in Test Environment so the main database remain unchange) to SQL
```
npm run create
npm run migrate
npm run seed
```
3. run test command in terminal
```
npm run test
```
4. To change back to developement environment change .sequelizerc enviroment to developement
```
module.exports = {
    env: 'developement'
}
```



