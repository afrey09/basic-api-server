'Use Strict';


const express = require('express');
const logger = require('./middleware/logger.js');
const validator = require('./middleware/validator.js');
const notFound = require('./handlers/404');
const errorHandler = require('./handlers/500');
const foodRouter = require('./routes/food');
const clothesRouter = require('./routes/clothes');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(logger);
app.use(clothesRouter);
app.use(foodRouter);

app.get('/', (req, res) => {

  const message = `server working`;

  res.status(200).send(message);
});

app.get('/person', validator, (req,res) => {

  const name = { name: req.query.name};
  res.status(200).json(name);
});


function start() {
  app.listen(PORT, () => console.log(`listening on ${PORT}`));
}

app.use('*', notFound);
app.use(errorHandler);

module.exports = { start, app };
