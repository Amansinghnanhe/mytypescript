import { Request, Response } from 'express';

let users: any[] = [];
let idCounter = 1;

export const registerUser = (req: Request, res: Response) => {
  const { fullname, email, password, status } = req.body;

  if (!fullname || !email || !password || !status) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newUser = {
    id: idCounter++,
    fullname,
    email,
    password, 
    status
  };

  users.push(newUser);

  return res.status(201).json({
    message: 'User registered successfully',
    user: newUser
  });
};
export const loginUser = (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  res.status(200).json({
    message: 'Login successful',
    token: 'dummy-token'
  });
};

export const getAllUsers = (req: Request, res: Response) => {
  res.json(users);
};

export const getUserById = (req: Request, res: Response) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
};

export const updateUser = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { fullname, email, status } = req.body;

  const userIndex = users.findIndex(u => u.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users[userIndex] = {
    ...users[userIndex],
    fullname: fullname || users[userIndex].fullname,
    email: email || users[userIndex].email,
    status: status || users[userIndex].status
  };

  res.json({
    message: 'User updated successfully',
    user: users[userIndex]
  });
};

export const deleteUser = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const userIndex = users.findIndex(u => u.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users.splice(userIndex, 1);
  res.json({ message: 'User deleted successfully' });
};
