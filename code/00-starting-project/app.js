// built in node.js method to read/write e.g. json file
const fileSystem = require("fs");
// built in node.js method to easily get the path where the required file is there
const path = require("path");
// set which port is used for the data traffic
const port = 3000;

// express is a third-party package
const express = require("express");
const app = express();

// set("views, path") method set the directory where the templates what we want to use for dynamic html where is it
app.set("views", path.join(__dirname, "views"));
// set("view engine") method use for set the require engine that we want to use for create template for dynamc html file. The second parameter the name of engine
app.set("view engine", "ejs")

// static () is an express's middleware method that listen to the incoming request. If that would require a static file e.g. .css or image file, the method will send back.
// the "public" parameter is the folder where the static files is stored
app.use(express.static("public"));

// express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays. This is also a meddleware method.
app.use(express.urlencoded({extended: false}));


app.get("/", (req, res) => {
  // render() method generates html from the .ejs file. This is now a dynamic page
  // the first parameter defined the file, and the second parameter defined the dynamic content e.g. javascript object
  res.render("index");
  // const htmlFilePath = path.join(__dirname, "views", "index.html");
  // res.sendFile(htmlFilePath);
})

app.get("/restaurants", (req, res) => {
  const filePath = path.join(__dirname, "data", "restaurants.json");

  const restaurantsData = fileSystem.readFileSync(filePath);
  const storedRestaurantData = JSON.parse(restaurantsData);

  res.render("restaurants", {
    numberOfRestaurants: storedRestaurantData.length,
    restaurants: storedRestaurantData
  });
  // const htmlFilePath = path.join(__dirname, "views", "restaurants.html");
  // res.sendFile(htmlFilePath);
})

app.get("/recommend", (req, res) => {
  res.render("recommend");
  // const htmlFilePath = path.join(__dirname, "views", "recommend.html");
  // res.sendFile(htmlFilePath);
})

app.post("/recommend", (req, res) => {
  const incomingData = req.body;
  const filePath = path.join(__dirname, "data", "restaurants.json");

  const restaurantsData = fileSystem.readFileSync(filePath);
  const storedRestaurantData = JSON.parse(restaurantsData);

  storedRestaurantData.push(incomingData);
  fileSystem.writeFileSync(filePath, JSON.stringify(storedRestaurantData));

  // redirect() method defined a determined path for the browser to load a specific page in response
  res.redirect("/confirm");
})

app.get("/confirm", (req, res) => {
  res.render("confirm");
  // const htmlFilePath = path.join(__dirname, "views", "confirm.html");
  // res.sendFile(htmlFilePath);
})

app.get("/about", (req, res) => {
  res.render("about");
  // const htmlFilePath = path.join(__dirname, "views", "about.html");
  // res.sendFile(htmlFilePath);
})


// listen all request and send respond via port (in this case that port is: 3000)
app.listen(port);