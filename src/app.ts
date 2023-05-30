import express from 'express';

const app = express();

app.get('/',(req,res)=>{
    res.send("Hurray we are on live")
})

export default app;
