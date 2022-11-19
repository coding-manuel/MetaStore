const B2 = require("backblaze-b2");
const dotenv = require("dotenv").config();

const b2 = new B2({
  applicationKeyId: "0045c810c306c1c0000000004", // or accountId: 'accountId'
  applicationKey: process.env.APPLICATION_KEY, // or masterApplicationKey
});

async function getBucket (req, res) {
  try {
    await b2.authorize(); // must authorize first (authorization lasts 24 hrs)

    const myBucket = "a53cf841b0fc8390864c011c";

    const url = await b2.getUploadUrl({bucketId: myBucket});

    res.send(url.data)
  } catch (err) {
    console.log("Error getting bucket:", err);
  }
}

module.exports = { getBucket };
