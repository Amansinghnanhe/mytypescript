import { getDB } from '../config/db';

export const findUserByEmail = async (email: string) => {
  const [rows] = await getDB().query('SELECT * FROM users WHERE email = ?', [email]);
  return Array.isArray(rows) ? rows[0] : null;
};

export const createUser = async (fullname: string, email: string, password: string, status: string) => {
  const [result] = await getDB().query(
    'INSERT INTO users (fullname, email, password, status) VALUES (?, ?, ?, ?)',
    [fullname, email, password, status]
  );
  return result;
};

export const getUserById = async (id: number) => {
  const [rows] = await getDB().query('SELECT id, fullname, email, status, created_at FROM users WHERE id = ?', [id]);
  return Array.isArray(rows) ? rows[0] : null;
};
