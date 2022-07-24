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

router.get('/product/:permalink', async function (req, res) {
    var slug = req.params.permalink;
    var dataRender = {
        page:'Senka Perfect Whip', 
        menuId:'product',
        meta: {},
        product: {}
    }
    try {
        var promProduct = axios({
            method: 'GET',
            url: `${baseUrl}/api/v1/product/detail/${slug}`,
        });
        const [resProduct] = await Promise.all([
            promProduct
        ])
        var productData = resProduct.data;
        if (productData.success) {
            dataRender.product = productData.data;
            dataRender.meta.meta_title = productData.data.name
            dataRender.meta.meta_desc = 'Product Detail: ' + productData.data.name
        }
        res.render('pages/product-detail', dataRender );
    } catch (error) {

        res.render('pages/product-detail', dataRender );
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

router.get('/ask-senka', async function(req, res) {
    const dataRender = {
        page:'Ask Senka', 
        menuId:'ask',
        meta: {},
        banner: {},
        jenisKulit: [],
        masalahKulit: [],
    }
    try {
        var promMeta = axios({
            method: 'GET',
            url: `${baseUrl}/api/v1/pagesetting/asksenka-meta`,
        });
        var promBanner = axios({
            method: 'GET',
            url: `${baseUrl}/api/v1/pagesetting/asksenka-banner`,
        });
        var promJenisKulit = axios({
            method: 'GET',
            url: `${baseUrl}/api/v1/jeniskulit`,
        });
        var promMasalahKulit = axios({
            method: 'GET',
            url: `${baseUrl}/api/v1/masalahkulit`,
        });
        const [resMeta, resBanner, resJenisKulit, resMasalahKulit ] = await Promise.all([
            promMeta, promBanner, promJenisKulit, promMasalahKulit
        ]);
        var metaData = resMeta.data;
        if (metaData.success) {
            dataRender.meta = metaData.data.setting.web;
        }
        var bannerData = resBanner.data;
        if (bannerData.success) {
            dataRender.banner = bannerData.data.setting.web;
        }
        var jenisKulitData = resJenisKulit.data;
        if (jenisKulitData.success) {
            dataRender.jenisKulit = jenisKulitData.data.rows;
        }
        var masalahKulitData = resMasalahKulit.data;
        if (masalahKulitData.success) {
            dataRender.masalahKulit = masalahKulitData.data.rows;
        }

        res.render('pages/ask-senka', dataRender);
    } catch (error) {
        console.log(error)
        res.render('pages/ask-senka', dataRender);
    }
});

router.get('/ask-senka-result', async function(req, res) {
    const jenisKulitId = req.query.jenis;
    const masalahKulitId = req.query.masalah;
    const dataRender = {
        page:'Ask Senka Result', 
        menuId:'ask',
        meta: {
            meta_title: '',
            meta_desc: '',
        },
        skintips: {}
    }
    try {
        var promSkintips = axios({
            method: 'GET',
            url: `${baseUrl}/api/v1/skintips?skin_problem_id=CyJzZ9MWpAbUWc1UmdyEL&skin_type_id=LKdUjRXoTQIWqXy5d8VNp`,
        });
        const [ resSkintips, ] = await Promise.all([
            promSkintips,
        ]);
        var skintipsData = resSkintips.data;
        if (skintipsData.success) {
            dataRender.skintips = skintipsData.data;
            dataRender.meta.meta_title = skintipsData.data.title;
            dataRender.meta.meta_desc = skintipsData.data.description;
        }

        res.render('pages/ask-senka-detail', dataRender);
    } catch (error) {
        console.log(error)
        res.render('pages/ask-senka-detail', dataRender);
    }
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
});

router.get('/about', async function(req, res) {
    var dataRender = {
        page:'About', 
        menuId:'about',
        meta: {},
        banner: {},
        content: {}
    }
    try {
        var promMeta = axios({
            method: 'GET',
            url: `${baseUrl}/api/v1/pagesetting/about-meta`,
        });

        var promBanner = axios({
            method: 'GET',
            url: `${baseUrl}/api/v1/pagesetting/about-banner`,
        });

        var promContent = axios({
            method: 'GET',
            url: `${baseUrl}/api/v1/pagesetting/about-content`,
        });

        const [ resMeta, resBanner, resContent ] = await Promise.all([
            promMeta, promBanner, promContent
        ]);

        var metaData = resMeta.data;
        if (metaData.success) {
            dataRender.meta = metaData.data.setting.web;
        }
        var bannerData = resBanner.data;
        if (bannerData.success) {
            dataRender.banner = bannerData.data.setting.web;
        }
        var contentData = resContent.data;
        if (contentData.success) {
            dataRender.content = contentData.data.setting.web;
        }

        res.render('pages/about', dataRender);
    } catch (error) {
        console.log(error)
        res.render('pages/about', dataRender);
    }
});

router.get('/contact-us', async function(req, res) {
    var dataRender = {
        page:'Contact Us', 
        menuId:'contact',
        meta: {},
        banner: {},
        subs: {}
    }
    try {
        var promMeta = axios({
            method: 'GET',
            url: `${baseUrl}/api/v1/pagesetting/contact-meta`,
        });
    
        var promBanner = axios({
            method: 'GET',
            url: `${baseUrl}/api/v1/pagesetting/contact-banner`,
        });

        var promSubs = axios({
            method: 'GET',
            url: `${baseUrl}/api/v1/pagesetting/subscriber-banner`,
        });
    
        const [ resMeta, resBanner, resSubs ] = await Promise.all([
            promMeta, promBanner, promSubs
        ]);
    
        var metaData = resMeta.data;
        if (metaData.success) {
            dataRender.meta = metaData.data.setting.web;
        }
        var bannerData = resBanner.data;
        if (bannerData.success) {
            dataRender.banner = bannerData.data.setting.web;
        }
        var subsData = resSubs.data;
        if (subsData.success) {
            dataRender.subs = subsData.data.setting.web;
        }
    
        res.render('pages/contact', dataRender);
    } catch (error) {
        console.log(error)
        res.render('pages/contact', dataRender);
    }
});

router.get('/privacy-policy', function(req, res) {
    var dataRender = {
        page:'Privacy Policy', 
        menuId:'privacy',
        meta: {
            meta_title: 'S E N K A | Privacy Policy',
            meta_desc: 'Privacy Policy'
        }
      }
    res.render('pages/privacy', dataRender);
});

router.get('/thank-you', async function(req, res) {
    var dataRender = {
        page:'Thank You', 
        menuId:'thanks',
        meta: {
            meta_title: 'S E N K A | Thank You',
            meta_desc: 'Thank You Page'
        },
        subs: {}
    }
    try {
        var promSubs = axios({
            method: 'GET',
            url: `${baseUrl}/api/v1/pagesetting/subscriber-banner`,
        });

        const [resSubs] = await Promise.all([
             promSubs
        ]);

        var subsData = resSubs.data;
        if (subsData.success) {
            dataRender.subs = subsData.data.setting.web;
        }
        res.render('pages/thanks', dataRender);
    } catch (error) {
        console.log(error);
        res.render('pages/thanks', dataRender);
    }
});

router.get('*', function(req, res){
  var dataRender = {
    page: '404',
    meta: {
        meta_title: '404 Not Found',
        meta_desc: '404 Not Found'
    }
  }
  res.render('pages/template-404', dataRender);
});

module.exports = router;
