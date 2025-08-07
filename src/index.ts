import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


app.use('/api/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('API is running');
});
app.post('/register', (req: Request, res: Response) => {
  const { fullname, email, password, status } = req.body;

  if (!fullname || !email || !password || !status) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  res.status(201).json({
    message: 'User registered successfully',
    user: { fullname, email, status }
  });
});

app.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  res.status(200).json({
    message: 'Login successful',
    token: 'dummy-token' 
  });
});

app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
