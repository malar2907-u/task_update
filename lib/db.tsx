// lib/db.js
import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: process.env.MYSQL_HOST,      // e.g., 'localhost'
  user: process.env.MYSQL_USER,      // e.g., 'root'
  password: process.env.MYSQL_PASS,  // e.g., 'password'
  database: process.env.MYSQL_DB,    // your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


