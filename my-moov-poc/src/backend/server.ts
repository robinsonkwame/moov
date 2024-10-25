import express, { Request, Response } from 'express';
import { Moov, SCOPES } from '@moovio/node';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config(); // Ensure this is called before accessing environment variables

console.log('MOOV_ACCOUNT_ID:', process.env.MOOV_ACCOUNT_ID);
console.log('MOOV_PUBLIC_KEY:', process.env.MOOV_PUBLIC_KEY);
console.log('MOOV_SECRET_KEY:', process.env.MOOV_SECRET_KEY);

const app = express();
app.use(cors());

const moovConfig = {
  accountID: process.env.MOOV_ACCOUNT_ID ?? '',
  publicKey: process.env.MOOV_PUBLIC_KEY ?? '',
  secretKey: process.env.MOOV_SECRET_KEY ?? '',
  domain: 'https://localhost'
};

console.log('Moov Configuration:', moovConfig);

let moov: Moov;
try {
  moov = new Moov(moovConfig);
} catch (error) {
  console.error('Error initializing Moov:', error);
  process.exit(1);
}

app.get('/api/token', async (_req: Request, res: Response) => {
  try {
    const { token } = await moov.generateToken([SCOPES.ACCOUNTS_CREATE]);
    res.json({ token });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({ error: message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));