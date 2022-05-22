const Article = require('../models/Article')

exports.uploadArticle = (req, res, next) => {
  Article.findOne({ title: req.body.title })
    .then((article) => {
      if (!article) {
        const newArticle = new Article({
          title: req.body.title.trim(),
          img: req.body.img,
          body: req.body.body.trim(),
        })
        newArticle
          .save()
          .then((article) => {
            res
              .status(200)
              .json({ success: true, msg: 'imagen guardada', article: article })
          })
          .catch((err) => {
            next(err)
          })
      } else
        res.status(409).json({ success: false, msg: 'titulo ya existente' })
    })
    .catch((err) => {
      res.status(500).json({ error: err, msg: 'unknown error' })
    })
}

exports.getArticle = (req, res, next) => {
  Article.find({})
    .then((articles) => {
      if (articles) {
        res.status(200).json(articles)
      } else
        return res
          .status(401)
          .json({ success: false, msg: 'no se encontraron noticias' })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.deleteArticle = (req, res, next) => {
  Article.findOneAndDelete({ title: req.params.article_title.trim() })
    .then((article) => {
      if (article) {
        res.status(200).json({ success: true, msg: 'se elimino la noticia' })
      } else
        res
          .status(401)
          .json({ success: false, msg: 'no se encontro la noticia' })
    })
    .catch((err) => {
      console.log(err)
    })
}
