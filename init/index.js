const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
if(process.env.NODE_ENV != "production"){  //development phase m sirf require ho otherwise log hmare secret dekh skte hagr logo ko hmara project accessible hua to
  require('dotenv').config();    // to access the env file in our project
}



const dbUrl = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

const initDB = async () => {
  await Listing.deleteMany({});
  //const cleanedData = initData.data.map((item) => ({
//   ...item,
//   image: typeof item.image === 'object' && item.image.url ? item.image : { url: item.image },
//   owner: "68a34169ede4f3d9b1ae584a",
// }));
initData.data = initData.data.map((obj) =>({...obj, owner: "68a34169ede4f3d9b1ae584a"}));

await Listing.insertMany(initData.data);

  console.log("data was initialized");
};

initDB();

