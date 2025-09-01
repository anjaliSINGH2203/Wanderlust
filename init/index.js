const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
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

