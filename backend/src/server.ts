import express from 'express';
const app = express()
const port = 3000;

const x = 100;
app.get('/', (req, res) => {
  res.send('Hello World!'+ x);
  });
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  });