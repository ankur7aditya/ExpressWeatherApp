const express=require('express');
const path = require('path');
const app = express();
const hbs= require('hbs');
const PORT= process.env.PORT || 8080;

const staticPath=path.join(__dirname,'/../templates/views');
const partialPath=path.join(__dirname,'/../templates/partials');
const publicPath=path.join(__dirname,'/../public');
console.log(publicPath);

app.set('view engine','hbs');
app.set('views',staticPath);
app.use(express.static(publicPath));

app.get("/",(req,res)=>{
    res.render('index')
})
app.get("/about.hbs",(req,res)=>{
    res.render('about')
})
app.get("/weather.hbs",(req,res)=>{
    res.render('weather')
})
app.get("*",(req,res)=>{
    res.render('404error')
})
app.listen(PORT,()=>{
    console.log("Server is running at http://localhost:8080");
})
