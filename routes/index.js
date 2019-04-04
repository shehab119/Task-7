var express = require('express');
var router = express.Router();

var Index=require('../models/studentmodel'); /*conect with model.js*/


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


router.get('/table',function(req,res,next){
	Index.find(function(err,results){
    	if (err) return console.error(err);
    	else{
    		res.render('table',{info:results});
    	}
  	});
});



router.post('/', function(req, res, next) {

var stdid = req.body.stdid;
var stdname = req.body.stdname;

console.log(stdid + " " + stdname);
console.log("Login Sucessfully ");

var query={stdid:stdid};/*NEw pdate*/

Index.findOneAndUpdate(query,{
  $set:{
    stdname:stdname,
    stdid:stdid
  }
},{
  new:true,
  upsert:true
},function(err, doc){
  if (err) {
    console.log("Spmething Wrong!!!CANdy");
  }
});
  
  res.redirect('/table');
});


router.get('/edit/:id',function(req,res,next){
  var id = req.params.id;
  var query={_id:id};

    Index.find(query,
      function(err, results) {
        if (err) throw err;
        console.log(results);
        res.render('updateindex',{info:results});
    });


  });


router.get('/delete/:id',function(req,res,next){
	var id = req.params.id;
  	var query={_id:id};

  	Index.remove({
    	_id: id
  		}, function(err) {
    	if (err) throw err;
    	res.redirect('/table');
  });

});





module.exports = router;
