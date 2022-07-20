var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('pages/index',{ page:'Home', menuId:'home'} );
});

router.get('/product', function (req, res) {
    res.render('pages/product',{ page:'Product', menuId:'product'} );
});

router.get('/senka-perfect-whip', function (req, res) {
    res.render('pages/product-detail',{ page:'Senka Perfect Whip', menuId:'product'} );
});

router.get('/all-clear-water-fresh', function (req, res) {
    res.render('pages/product-detail-2',{ page:'All Clear Water Fresh', menuId:'product'} );
});

router.get('/perfect-skin-fit-mask-brightenning', function (req, res) {
    res.render('pages/product-detail-3',{ page:'Perfect Skin Fit Mask Brightenning', menuId:'product'} );
});

router.get('/ask-senka', function(req, res) {
    res.render('pages/ask-senka', { page:'Ask Senka', menuId:'ask' });
});

router.get('/ask-senka-detail', function(req, res) {
    res.render('pages/ask-senka-detail', { page:'Ask Senka Detail', menuId:'ask' });
});

router.get('/stories', function(req, res) {
    res.render('pages/stories', { page:'Stories', menuId:'stories' });
});

router.get('/stories-detail', function(req, res) {
    res.render('pages/stories-detail', { page:'Stories Senka', menuId:'stories-detail' });
});

router.get('/about', function(req, res) {
    res.render('pages/about', { page:'About', menuId:'about' });
});

router.get('/contact-us', function(req, res) {
    res.render('pages/contact', { page:'Contact Us', menuId:'contact' });
});

router.get('/privacy-policy', function(req, res) {
    res.render('pages/privacy', { page:'Privacy Policy', menuId:'privacy' });
});

router.get('/thank-you', function(req, res) {
    res.render('pages/thanks', { page:'Thank You', menuId:'thanks' });
});

router.get('*', function(req, res){
  res.render('pages/template-404', { page: '404' });
});

router.get('/template-one', function(req, res) {
    res.render('pages/template-one', { page:'One', menuId:'about' });
});

router.get('/template-two', function(req, res) {
    res.render('pages/template-two', { page:'Two', menuId:'about' });
});

module.exports = router;
