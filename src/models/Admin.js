const db = require('../database/connection');

exports.findByEmail = async (email) => {
  const sql = 'SELECT * FROM admins WHERE email = ? LIMIT 1';
  const [rows] = await db.execute(sql, [email]);
  return rows.length ? rows[0] : null;
};

exports.create = async (email, passwordHash) => {
  const sql = 'INSERT INTO admins (email, password) VALUES (?, ?)';
  await db.execute(sql, [email, passwordHash]);
};
