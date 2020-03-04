const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = process.env.PORT || 5000;
 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/api/hello',(req,res)=>{
    const data = {
        lastname : "dl",
        firstname : "wlrma"
    };
    res.json(data);
})

app.listen(PORT,()=>{
    console.log(`server running on PORT ${PORT}`);
})