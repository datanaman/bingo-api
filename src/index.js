import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

import models from './models';
import routes from './routes';
require('dotenv').config()
const app = express();

// Application-Level Middleware

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  };
  next();
});

// Routes


app.use('/users', routes.user);
app.use('/game', routes.game);


// Start

app.listen(process.env.PORT || 80,"0.0.0.0", () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
