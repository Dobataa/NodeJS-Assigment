const express = require('express');

const app = express();
const expressConfig = require('./config/express');
const routes = require('./routes');

expressConfig(app);

app.use(routes);

app.listen(5000, () => console.log('Server is running on port 5000...'));