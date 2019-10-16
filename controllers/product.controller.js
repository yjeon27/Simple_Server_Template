const Product = require('../models/product.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.create = function (req, res) {
    let product = new Product({
        name: req.body.name,
        price: req.body.price
    });

    product.save(function(err) {
        if(err){
            return next(err);
        }
        res.send("Product Created Successfully");
    });
};

exports.details = function (req, res){
    Product.findById(req.params.id, function (err, product){
        if(err) return next(err);
        res.send(product);
    })
}

exports.update = function (req, res){
    Product.findByIdAndUpdate(req.params.id, {$set: req.body},
        function(err, product){
            if(err) return next(err);
            res.send("Product updated.");
        });
};

exports.delete = function (req, res){
    Product.findByIdAndRemove(req.params.id, function (err){
        if(err) return next(err);
        res.send("Deleted Successfully!");
    })
}