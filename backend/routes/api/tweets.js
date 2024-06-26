const express = require('express');
const { asyncHandler } = require('../../utils');

const router = express.Router();
const db = require('../../db/models');

const { Tweet } = db;

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const tweets = await Tweet.findAll();
    res.json(tweets);
  })
);

//Need to define a post route. use the express object!
router.post(
  '/',
  asyncHandler(async (req, res) => {
      const newTweet = await Tweet.create(req.body);

      res.json(newTweet);
  })
);

module.exports = router;
