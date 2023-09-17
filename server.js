const express = require("express");
const app = express();
const port = 3000;

const budget = {
    myBudget: [
    {
        title: 'Eat out',
        budget: 30
    },
    {
        title: 'Rent',
        budget: 350
    },
    {
        title: 'Groceries',
        budget: 90
    }
]
}

app.use('/', express.static('public'))

app.get('/budget', (req,res)=>{
    res.json(budget);
})
app.get('/hello', (req,res)=>{
    res.send("Hello");
})
app.listen(port, ()=>{
    console.log(`Example app listening at port ${port}`)
})