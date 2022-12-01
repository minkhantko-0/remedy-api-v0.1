const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then((res) => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });
