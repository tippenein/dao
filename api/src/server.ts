import express, { Express, Request, Response } from 'express';
import { db } from './db/db';
import { allProposals, getStats } from './db/query';

// Create a new express application
const app: Express = express();

// The port the express app will listen on
const PORT = 3000;

// Use the body-parser middleware to parse incoming request bodies.
// We set a limit of 5mb to handle large payloads that may come with the POST requests.
// This is necessary to prevent potential issues with payload size exceeding the default limit.
app.use(
  express.json({ limit: '5mb' }),
  express.urlencoded({ limit: '5mb', extended: true })
);

function hexToUtf8(hex: string) {
  if (hex.startsWith('0x')) {
    hex = hex.slice(2);
  }
  let str = '';
  for (let i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.slice(i, i + 2), 16));
  }
  return decodeURIComponent(encodeURIComponent(str));
}

// Routes
app.get('/', async (req, res) => {
  db.one('SELECT $1 AS value', 123)
    .then((data: any) => {
      console.log('DATA:', data.value);
    })
    .catch((error: any) => {
      console.log('ERROR:', error);
    });
  res.json({ message: 'Welcome to chainhook event api' });
});
app.get('/api/health', async (req, res) => {
  console.log('health check');
  res.json({ status: 'ok' });
});

app.get('/api/proposals/stats', async (req, res) => {
  getStats.then((data: any) => {
    res.status(200).json({
      status: 'success',
      data: data
    });
  })
});

app.get('/api/proposals', async (req, res) => {
  allProposals.then((data: any) => {
    res.status(200).json({
      status: 'success',
      data: data
    });
  });
});
app.post('/api/events', async (req, res) => {
  console.log('event');
  const events = req.body;
  events.apply.forEach((item: any) => {
    item.transactions.forEach((transaction: any) => {
      console.log('transaction', transaction);
      // If the transaction has operations, loop through them
      if (transaction.operations) {
        console.log('operations');
        transaction.operations.forEach((operation: any) => {
          console.log({ operation });
        });
      }
    });
  });

  // Send a response back to Chainhook to acknowledge receipt of the event
  res.status(200).send({ message: 'Proposal added!' });
});

// Start server on port 3000
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
