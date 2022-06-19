import path from 'path';
const sqlite3 = require('sqlite3').verbose();

let dbPath = process.env.NODE_ENV === 'development'
  ? 'd:/dev/electron-utility/src/extra_resources/utility.db'
  : path.join(process.resourcesPath, '/extra_resources/utility.db');

export default new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if(err) return console.log(err.message);
});