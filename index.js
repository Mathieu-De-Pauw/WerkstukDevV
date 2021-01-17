
//Express
const mongoose = require('mongoose');
const express = require('express');
const soorten = require('./routes/soorten');
const thees = require('./routes/thees');
const users = require('./routes/users');
const auth = require('./routes/auth');
const helmet = require('helmet');
const morgan = require("morgan");
const app = express();

///MongoDB connectie 
mongoose.connect('mongodb://localhost/theeshop')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('Error: ',err));

app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));
app.use('/api/soorten', soorten);
app.use('/api/thees', thees);
app.use('/api/users', users);
app.use('/api/auth', auth);

// Server connectie 
app.get('/', (req,res) =>{
    res.send('Running on server');
});
    
    // PORT 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));