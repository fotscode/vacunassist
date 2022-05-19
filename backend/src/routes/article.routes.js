const router = require('express').Router()
const articleCtrl = require('../controllers/article.controller')

router.post("/uploadArticle",articleCtrl.uploadArticle)
router.get("/getArticles",articleCtrl.getArticle)
router.delete("/deleteArticle/:article_title",articleCtrl.deleteArticle)

module.exports=router
