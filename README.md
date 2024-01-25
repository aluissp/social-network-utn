# Universidad Técnica del Norte
# Facultad de Ingeniería en Ciencias Aplicadas (FICA)

# Final project

## Team members
- [x] *Cachimuel Marlon*
- [x] *Enriquez David*
- [x] *Faican Jonathan*
- [x] *Perugachi Luis*
- [x] *Ramírez Henry*

## How to run the project
1. Clone this repository
```bash
git clone https://github.com/aluissp/social-network-utn
```
2. Install the dependencies
```bash
yarn 
```
3. Before running the project, you must configure the database connection in the file `src/db/config/database-postgres.js`
```javascript
export default {
	username: 'your_username',
	password: 'your_password',
	database: 'your_database',
	host: '127.0.0.1',
	dialect: 'postgres',
};
```
4. Run the migrations
```bash
yarn migrate
```
5. Run the project
```bash
yarn watch
```

Ensure that the database is created before running the project!
