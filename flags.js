const url = require('url')
const express = require('express')
const router = express.Router()
const needle = require('needle')
const apicache = require('apicache')

// Env vars
const API_BASE_URL = "https://api.fifa.com/api/v3/picture/flags-sq-2/"
const API_KEY_NAME = process.env.API_KEY_NAME
const API_KEY_VALUE = process.env.API_KEY_VALUE
console.log(API_BASE_URL) 
// Init cache
let cache = apicache.middleware

router.get('/', cache('2 minutes'), async (req, res, next) => {
  try {
   const term = req.query.q || "";
   
    const apiRes = await needle('get', `${API_BASE_URL}/${term}`)
   
    const data = apiRes.body
 
    // Log the request to the public API
    if (process.env.NODE_ENV !== 'production') {
      console.log(`REQUEST: ${API_BASE_URL}/${term}`)
    }

    res.status(200).send(data);
  } catch (error) {
    next(error)
  }
})

module.exports = router