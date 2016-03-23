var express = require('express');
var router = express.Router();
var data=require("../data.json");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getTransactionHistory',function(req,res){
  console.log('GET REST call...');
  res.send(data);
});

module.exports = router;
