const express = require('express');
const path = require('path');
const app = express();

app.use('/', express.static(path.join(__dirname, 'public')));


const port = process.env.port || 8000;
app.listen(port, console.log(`App is Listenting to ${port}`));