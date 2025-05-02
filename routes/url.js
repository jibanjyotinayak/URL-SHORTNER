const express = require ('express')
const router = express.Router()
const {handleGenerateNewShortUrl,handleGetAnalytics, updateAnalytics,getRedirectUrl}=require ('../controllers/url')

router.post('/newurl',handleGenerateNewShortUrl)
router.get('/analytics/:shortId',handleGetAnalytics)
router.get ('/:shortid',updateAnalytics)
router.get ('/geturl/:shortId',getRedirectUrl)

module.exports = router