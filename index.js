const express = require("express");
const request = require('request-promise');


const app = express();
const PORT = process.env.PORT || 5000; 


//const baseUrl = `https://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

const scraperUrl=(apiKey)=> `https://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;



app.use(express.json());


app.get('/',(req,res)=>{
    res.send(' amazon scraper api running')
})

//about a prdouct from id 

app.get('/products/:productId', async(req,res)=>{
   
    const {apiKey} = req.query;
    const {productId} = req.params;

    try{
        const response = await request(`${scraperUrl(apiKey)}&url=https://www.amazon.in/dp/${productId}`);

        res.json(JSON.parse(response));

    }
    catch(error){
        res.json(error);
    } 
});

//get reviews

app.get(`/products/:productId/reviews`, async(req,res)=>{
  const {apiKey} = req.query;
    const {productId} = req.params;

    try{
        const response = await request(`${scraperUrl(apiKey)}&url=https://www.amazon.in/product-reviews/${productId}`);

        res.json(JSON.parse(response));

    }
    catch(error){
        res.json(error);
    } 
});

//get offers

app.get(`/products/:productId/offers`, async(req,res)=>{
   const {apiKey} = req.query;
     const {productId} = req.params;
 
     try{
         const response = await request(`${scraperUrl(apiKey)}&url=https://www.amazon.in/gp/offer-listing/${productId}`);
 
         res.json(JSON.parse(response));
 
     }
     catch(error){
         res.json(error);
     } 
 });

 //search a product

 app.get(`/search/:searchQuery`, async(req,res)=>{
   const {apiKey} = req.query;
     const {searchQuery} = req.params;
 
     try{
         const response = await request(`${scraperUrl(apiKey)}&url=https://www.amazon.in/s?k=/${searchQuery}`);
 
         res.json(JSON.parse(response));
 
     }
     catch(error){
         res.json(error);
     } 
 });


app.listen(PORT,()=> console.log('server running'));