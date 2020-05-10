//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(express.static("public"));


app.get("/macros-to-calories", function(req, res) {

  res.sendFile( __dirname + "/index.html");

  res.render("macToCal", {
    caloriesTemplate: "0",
    carbsTemplate: "Grams Carbs",
    proteinsTemplate: "Grams Proteins",
    fatsTemplate: "Grams Fats"
  });


});

app.post("/macros-to-calories", function (req, res) {

  var carbs = parseFloat(req.body.carbs);
  var proteins = parseFloat(req.body.proteins);
  var fats = parseFloat(req.body.fats);

  var calories = (carbs*4) + (proteins*4) + (fats*9);
  //res.send("The resulting calorie count is: " + calories);
  res.render("macToCal", {
    caloriesTemplate: calories,
    carbsTemplate: carbs,
    proteinsTemplate: proteins,
    fatsTemplate: fats
  });

});

app.post("/resetMacToCal", function(req, res) {

  res.redirect("/macros-to-calories");

  //have index display option between macros->calories or calores->macros
  //upon click, redirect to path with option selected

});

app.post("/resetCalToMac", function(req, res) {

  res.redirect("/calories-to-macros");

  //have index display option between macros->calories or calores->macros
  //upon click, redirect to path with option selected

});


app.get("/calories-to-macros", function(req, res) {

  res.render("calToMacOptions");

});

app.post("/keto-macros", function(req, res) {

  //calculate the macro split
  let totalCalories = req.body.calories;
  let caloriesFromProtein = 0.35*totalCalories;
  let caloriesFromCarb = 0.05*totalCalories;
  let caloriesFromFat = 0.6*totalCalories;

  let gramsProtein = Math.round(caloriesFromProtein/4);
  let gramsCarb = Math.round(caloriesFromCarb/4);
  let gramsFat = Math.round(caloriesFromFat/9);

  //render template output
  res.render("calToMacOutput", {
    lifestyleTemplate: req.body.submit,
    totCaloriesTemplate: totalCalories,
    proteinTemplate: gramsProtein,
    carbsTemplate: gramsCarb,
    fatsTemplate: gramsFat

  });

});

app.post("/high-protein-macros", function(req, res) {

  //calculate the macro split
  let totalCalories = req.body.calories;
  let caloriesFromProtein = 0.50*totalCalories;
  let caloriesFromCarb = 0.25*totalCalories;
  let caloriesFromFat = 0.25*totalCalories;

  let gramsProtein = Math.round(caloriesFromProtein/4);
  let gramsCarb = Math.round(caloriesFromCarb/4);
  let gramsFat = Math.round(caloriesFromFat/9);

  //render template output
  res.render("calToMacOutput", {
    lifestyleTemplate: req.body.submit,
    totCaloriesTemplate: totalCalories,
    proteinTemplate: gramsProtein,
    carbsTemplate: gramsCarb,
    fatsTemplate: gramsFat

  });

});

app.post("/default-macros", function(req, res) {

  //calculate the macro split
  let totalCalories = req.body.calories;
  let caloriesFromProtein = 0.3*totalCalories;
  let caloriesFromCarb = 0.4*totalCalories;
  let caloriesFromFat = 0.3*totalCalories;

  let gramsProtein = Math.round(caloriesFromProtein/4);
  let gramsCarb = Math.round(caloriesFromCarb/4);
  let gramsFat = Math.round(caloriesFromFat/9);

  //render template output
  res.render("calToMacOutput", {
    lifestyleTemplate: req.body.submit,
    totCaloriesTemplate: totalCalories,
    proteinTemplate: gramsProtein,
    carbsTemplate: gramsCarb,
    fatsTemplate: gramsFat

  });

});



app.get("/", function (req, res) {

  res.render("landing");

});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started on port 3000!!!!");
});
