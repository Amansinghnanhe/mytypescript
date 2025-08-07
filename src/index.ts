import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: any = express();
const PORT: any = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: any, res: any) => {
    res.send('API is running');
});
app.post('/register', (req:any, res:any) => {
  const { fullname, email, password, status } = req.body;

  if (!fullname || !email || !password || !status) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  res.status(201).json({
    message: 'User registered successfully',
    user: { fullname, email, status }
  });
});
app.post('/login', (req:any, res:any) => {
  const { email, password } = req.body;
  res.json({ message: 'Login successful' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
