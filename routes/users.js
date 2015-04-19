var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/userlist', function(req, res, next) {
	var db = req.db;
	db.collection('userlist').find().toArray(function(err, items){
		res.json(items);
	});
});

/* POST to adduser*/
router.post('/adduser', function(req, res, next){
    var db = req.db;
    var item = req.body;
    db.collection('userlist').insert(item, function(err, result){
        res.send(
            (err == null) ? { msg: ' '} : {msg: err}
        );
    });
});

module.exports = router;
