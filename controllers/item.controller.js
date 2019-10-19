const Item = require('../models/item.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    debugger;
    res.send('Greetings from the Test controller!');
};

exports.create = function (req, res) {
    let item = new Item({
        name: req.body.name,
        type: req.body.type,
        due: req.body.due
    });

    item.save(function(err) {
        if(err){
            return next(err);
        }
        res.send("Item Created Successfully");
    });
};

exports.details = function (req, res){
    debugger;
    console.log('DETAILS: Queried for '+req.params.id);
    Item.findById(req.params.id, function (err, item){
        if(err) return next(err);
        res.send(item);
    });
};

exports.getAll = function (req, res){
    debugger;
    console.log('GETALL: Queried for '+req.params.id);

    Item.find({}, 'name', function(err, item){
        if(err){
            console.log(err);
        }else{
            res.send(item);
            console.log('RETRIEVED CURRENT LIST OF '+item.length+" items");
        }
    });
};


exports.update = function (req, res){
    Item.findByIdAndUpdate(req.params.id, {$set: req.body},
        function(err, item){
            if(err) return next(err);
            res.send("Item updated.");
        });
};

exports.delete = function (req, res){
    Item.findByIdAndRemove(req.params.id, function (err){
        if(err) return next(err);
        res.send("Deleted Successfully!");
    });
};