const express = require('express');
require('./server/config/mongoose.config');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
require('./server/routes/user.routes')(app);
require('./server/routes/Pirate.routes')(app);

app.listen(8000, () => {
    console.log("Listening at Port 8000")
});