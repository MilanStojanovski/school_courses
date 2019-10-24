const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({msg: 'Works'})
})

router.post('/', (req, res) => {

})

module.exports = router;