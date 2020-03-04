const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/customers", (req, res) => {
  res.send([
    {
      id: 1,
      img: "https://placeimg.com/64/64/1",
      name: "Thor",
      birth: "950413",
      gender: "male",
      job: "son of odin"
    },
    {
      id: 2,
      img: "https://placeimg.com/64/64/2",
      name: "Natasha",
      birth: "920222",
      gender: "female",
      job: "Black Widow"
    },
    {
      id: 3,
      img: "https://placeimg.com/64/64/3",
      name: "Peter Quill",
      birth: "910413",
      gender: "male",
      job: "Star Lord"
    }
  ]);
});
app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
