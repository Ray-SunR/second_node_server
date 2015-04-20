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

/* DELETE user*/
router.post('/deleteuser', function(req, res, next){
    console.log('request body is: ' + JSON.stringify(req.body));
    var db = req.db;
    var mongo = req.mongo;
    ObjectID = mongo.ObjectID;
    objid = ObjectID(req.body['_id']);
    db.collection('userlist').remove({_id: objid}, function(err, result){
        if (err == null){
            res.send({msg: ''});
        }
        else{
            res.send({msg: 'error: ' + err});
        }
    });

    /*
    var result = db.collection('userlist').findOne({_id: objid}, function(err, result){
        if (err == null){
            console.log(result.username);
            res.send('');
        }
        else{
            console.log('item with objectID: ' + JSON.stringify(mongo.toObjectID(req.body['_id'])) + 'not found');
            next();
        }
    });
    */
});

module.exports = router;
