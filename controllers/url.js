const URL = require("../models/url");
const shortid = require("shortid") ;
require("dotenv").config()

async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required" });

  try {
    const shortID = shortid(8);
    await URL.create({
      shortId: shortID,
      redirectURL: body.url,
      visitHistory: [],
    });

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    return res.json({ shortUrl: `${baseUrl}/${shortID}` });

  } catch (error) {
    return res.status(500).json({ error: "Internal server error" ,message:error.message});
  }
}


async function getRedirectUrl(req, res) {
  //const shortId = req.body.shortId;
  const shortId = req.params.shortId;
  const result = await URL.findOneAndUpdate({ shortId },{
    $push: {
      visitHistory: {
        timestamp: Date.now(),
      },
    },  
  });
  if (!result) return res.status(404).json({ error: "URL not found" });
  //return res.status(200).json({redirectUrl:result.redirectURL});
  return res.redirect(result.redirectURL);//redirect to the redirect url
} 


async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

// async function updateAnalytics(req, res) {
//   const shortId = req.params.shortid;
//   console.log(shortId);
  
//   const result = await URL.findOneAndUpdate(
//     { shortId},
//     {
//       $push: {
//         visitHistory: {
//           timestamps: Date.now(),
//         },
//       },
//     }
//   );
//   return res.redirect(result.redirectURL)
// }

async function updateAnalytics(req, res) {
  const shortId = req.params.shortid;
  console.log(shortId);

  const result = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(), // corrected typo: "timestamps" → "timestamp"
        },
      },
    },
    { new: true } // return the updated document
  );

  if (!result) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  return res.redirect(result.redirectURL);
}

module.exports = {
  handleGenerateNewShortUrl,
  handleGetAnalytics,
  updateAnalytics,
  getRedirectUrl
};
