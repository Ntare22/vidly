const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('Grinding all my life is my favorite song')
  })

module.exports = router;