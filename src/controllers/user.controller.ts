import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';
import { findUserByEmail, createUser, getUserById } from '../models/user.model';
import { generateToken } from '../utils/jwt';

const logPath = path.join(__dirname, '../logs/login.log');

export const register = async (req: Request, res: Response) => {
    const { fullname, email, password, status } = req.body;
    const existingUser = await findUserByEmail(email);

    if (existingUser) return res.status(409).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(fullname, email, hashedPassword, status);
    res.status(201).json({ message: 'User registered successfully' });
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user: any = await findUserByEmail(email);

    const logEntry = `[${new Date().toISOString()}] Email: ${email} - `;

    if (!user) {
        fs.appendFileSync(logPath, logEntry + 'Failed (User not found)\n');
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        fs.appendFileSync(logPath, logEntry + 'Failed (Incorrect password)\n');
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken({ id: user.id, email: user.email });
    fs.appendFileSync(logPath, logEntry + 'Success\n');

    res.json({ message: 'Login successful', token });
};

export const getUser = async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const user = await getUserById(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
};
