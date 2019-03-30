const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const jsonParser = bodyParser.json();
const postsRouter = require('./router');

const hostname = '127.0.0.1';
const port = 3000;

app.use('/posts/api', jsonParser, postsRouter);


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
