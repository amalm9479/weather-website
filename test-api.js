//jshint esversion:6
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function (req,res){
  res.sendFile(__dirname + "/index.html");
});


app.post("/",function(req,res){
  const city =req.body.cityName;
  const url ="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=653a1d51c7cb051a6c17cd0d29593c21&units=metric";
  https.get(url,function(response){
    console.log(response.statusCode);

    response.on('data',function(data){
      const weatherDate = JSON.parse(data);
      const temp = weatherDate.main.temp;
      const description = weatherDate.weather[0].description;
      const icon = weatherDate.weather[0].icon;
      const imageurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      console.log(temp);
      console.log(description);
      res.write("<h1>the website is under maintenance..</h1>");
      res.write("<h2>the temperature in "+city+" is "+temp +" degree celcius.</h2>");
      res.write("<li>the weather is like "+description+".</li>");
      res.write("<img src="+imageurl+">");
      res.send();
    });



  });

});




  app.listen(process.env.PORT || 3000 ,function(){
    console.log("its work");

});
