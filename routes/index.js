var express = require('express');
var axios = require('axios').default;
var router = express.Router();
var baseUrl = 'https://backend.senka.id';

router.get('/', async function (req, res) {
    const dataRender = {
        page:'Home',
        menuId:'home',
        slider: [],
        meta: {},
        section2: {},
        section3: {},
        section4: {},
        section5: {},
        section6: {},
        product: [],
        jenisKulit: [],
        masalahKulit: [],
        article: [],
    }
    try {
        var promSlider = axios({
            method: 'GET',
            url: `${baseUrl}/api/v1/homepages/banner`,
        });
        var promMeta = axios({
            method: 'GET',
            url: `${baseUrl}/api/v1/pagesetting/homepages-meta`,
        });
        var promSection2 = axios({
            method: 'GET',
            url: `${baseUrl}/api/v1/pagesetting/homepages-section-2`,
        });
        var promSection3 = axios({
            method: 'GET',
            url: `${baseUrl}/api/v1/pagesetting/homepages-section-3`,
        });
        var promProduct = axios({
            method: 'GET',
            url: `${baseUrl}/api/v1/homepages/productcategory`,
        });
        var promSection4 = axios({
            method: 'GET',
            url: `${baseUrl}/api/v1/pagesetting/homepages-section-4`,
        });
        var promSection5 = axios({
            method: 'GET',
            url: `${baseUrl}/api/v1/pagesetting/homepages-section-5`,
        });
        var promSection6 = axios({
            method: 'GET',
            url: `${baseUrl}/api/v1/pagesetting/subscriber-banner`,
        });
        var promJenisKulit = axios({
            method: 'GET',
            url: `${baseUrl}/api/v1/jeniskulit`,
        });
        var promMasalahKulit = axios({
            method: 'GET',
            url: `${baseUrl}/api/v1/masalahkulit`,
        });
        var promArticle = axios({
            method: 'GET',
            url: `${baseUrl}/api/v1/homepages/article?page=1&limit=4&sortBy=createdAt&order=ASC&search=`,
        });
        const [ resSlider, resMeta, resSection2, resSection3, resProduct, resSection4, resSection5, resArticle, resSection6, resJenisKulit, resMasalahKulit ] = await Promise.all([
            promSlider, promMeta, promSection2, promSection3, promProduct, promSection4, promSection5, promArticle, promSection6, promJenisKulit, promMasalahKulit,
        ]);
        var sliderData = resSlider.data;
        if (sliderData.success) {
            dataRender.slider = sliderData.data.rows;
        }
        var metaData = resMeta.data;
        if (metaData.success) {
            dataRender.meta = metaData.data.setting.web;
        }
        var section2Data = resSection2.data;
        if (section2Data.success) {
            dataRender.section2 = section2Data.data.setting.web;
        }
        var section3Data = resSection3.data;
        if (section3Data.success) {
            dataRender.section3 = section3Data.data.setting.web;
        }
        var productData = resProduct.data;
        if (productData.success) {
            dataRender.product = productData.data.rows;
        }
        var section4Data = resSection4.data;
        if (section4Data.success) {
            dataRender.section4 = section4Data.data.setting.web;
        }
        var section5Data = resSection5.data;
        if (section5Data.success) {
            dataRender.section5 = section5Data.data.setting.web;
        }
        var section6Data = resSection6.data;
        if (section6Data.success) {
            dataRender.section6 = section6Data.data.setting.web;
        }
        var jenisKulitData = resJenisKulit.data;
        if (jenisKulitData.success) {
            dataRender.jenisKulit = jenisKulitData.data.rows;
        }
        var masalahKulitData = resMasalahKulit.data;
        if (masalahKulitData.success) {
            dataRender.masalahKulit = masalahKulitData.data.rows;
        }
        var articleData = resArticle.data;
        if (articleData.success) {
            dataRender.article = articleData.data.rows;
        }

        return res.render('pages/index', dataRender);
    } catch (error) {
        console.log(error)
        return res.render('pages/index', dataRender);
    }
});

router.get('/product', async function (req, res) {
    const dataRender = {
        page:'Product', 
        menuId:'product',
        banner: {},
        product: [],
        meta: {}
    }
    try {
        var promBanner = axios({
            method: 'GET',
            url: `${baseUrl}/api/v1/pagesetting/product-banner`,
        });
        var promProduct = axios({
            method: 'GET',
            url: `${baseUrl}/api/v1/product/list/productcategory`,
        });
        var promMeta = axios({
            method: 'GET',
            url: `${baseUrl}/api/v1/product/list/productcategory`,
        });
        const [ resBanner, resProduct, resMeta ] = await Promise.all([
            promBanner, promProduct, promMeta
        ]);
        var BannerData = resBanner.data;
        if (BannerData.success) {
            dataRender.banner = BannerData.data.setting.web;
        }

        var productData = resProduct.data;
        if (productData.success) {
            dataRender.product = productData.data.rows;
        }
        var metaData = resMeta.data;
        if (metaData.success) {
            dataRender.meta = metaData.data.setting.web;
        }
        return res.render('pages/product', dataRender);
    } catch (error) {
        console.log(error)
        return res.render('pages/product', dataRender);
    }
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

router.get('/ask-senka-result', function(req, res) {
    res.render('pages/ask-senka-detail', { page:'Ask Senka Result', menuId:'ask' });
});

router.get('/stories',  async function(req, res) {
    const dataRender = {
        page:'Stories', 
        menuId:'stories',
        meta: {},
        banner: {},
        article: [],
        articlePage: 1,
    }
    try {
        var promMeta = axios({
            method: 'GET',
            url: `${baseUrl}/api/v1/pagesetting/senkastories-meta`,
        });
        var promBanner = axios({
            method: 'GET',
            url: `${baseUrl}/api/v1/pagesetting/senkastories-banner`,
        });
        var promArticle = axios({
            method: 'GET',
            url: `${baseUrl}/api/v1/article?page=1&limit=6&sortBy=createdAt&order=DESC`,
        });
        const [ resMeta, resBanner, resArticle ] = await Promise.all([
            promMeta, promBanner, promArticle
        ]);
        var metaData = resMeta.data;
        if (metaData.success) {
            dataRender.meta = metaData.data.setting.web;
        }
        var bannerData = resBanner.data;
        if (bannerData.success) {
            dataRender.banner = bannerData.data.setting.web;
        }
        var articleData = resArticle.data;
        if (articleData.success) {
            dataRender.article = articleData.data.rows;
            dataRender.articlePage = articleData.data.total_page;
        }

        res.render('pages/stories', dataRender);
    } catch (error) {
        console.log(error)
        res.render('pages/stories', dataRender);
    }
});

router.get('/stories/:permalink', async function(req, res) {
    const permalink = req.params.permalink;
    const dataRender = {
        page:'Stories Senka', 
        menuId:'stories-detail',
        meta: {},
        article: {},
    }
    try {
        var promArticle = axios({
            method: 'GET',
            url: `${baseUrl}/api/v1/article/${permalink}`,
        });
        const [ resArticle ] = await Promise.all([
            promArticle
        ]);
        var articleData = resArticle.data;
        if (articleData.success) {
            dataRender.article = articleData.data;
            dataRender.meta = {
                meta_title: articleData.data.title,
                meta_desc: articleData.data.description,
            }
        }

        res.render('pages/stories-detail', dataRender);
    } catch (error) {
        console.log(error)
        res.render('pages/stories-detail', dataRender);
    }
    // res.render('pages/stories-detail', { page:'Stories Senka', menuId:'stories-detail' });
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
