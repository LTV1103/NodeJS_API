const express = require('express');
const api = require('./routes/api');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
