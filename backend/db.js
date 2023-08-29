const mongoose = require("mongoose");
const mongoURL =
  "mongodb+srv://<username>:<password>@gofoodcluster.bdb5ntk.mongodb.net/goFoodMERN?retryWrites=true&w=majority";


const MongoDB = () => {
  mongoose.connect(mongoURL, { useNewUrlParser: true })
    .then( () => {
      console.log("Database Connected");

      const fetch_data = mongoose.connection.db.collection("foot-items");

      fetch_data.find({}).toArray()
      .then(data => {

        const foodCategory = mongoose.connection.db.collection("foot-category");

        foodCategory.find({}).toArray()
        .then(categoryData =>{
          global.footItems = data;
          global.foodCategory = categoryData;

        })
        .catch( (err) => {
          console.log(err);
        })

        global.footItems = data;
      })
      .catch(err => {
        console.log("Error fetching data:", err);
      });
    })
    .catch( (err) => {
      console.log(err);
    })
};

 module.exports = MongoDB;
