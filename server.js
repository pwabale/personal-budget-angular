const fs = require('fs');
const express = require("express");
const app = express();
const port = 3000;

const filePath = './data.json';

app.use('/', express.static('public'))

app.get('/budget', (req,res)=>{
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          res.status(500).json({ error: 'Error reading the file' });
          return;
        }
    
        try {
          const jsonData = JSON.parse(data);
          res.json(jsonData);
        } catch (error) {
          res.status(500).json({ error: 'Error parsing JSON' });
        }
      });
})

app.listen(port, ()=>{
    console.log(`Example app listening at port ${port}`)
})