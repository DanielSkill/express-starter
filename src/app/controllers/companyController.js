var models = require('../models');

exports.index = (req, res) => {
  return res.json(models.Company.findAll())
}

exports.create = (req, res) => {
  var company = models.Company.create({
    name: req.query.name
  })
  .then (company => {
    return res.json(company)
  })
}

exports.update = (req, res, next) => {
  models.Company.update({
      name: req.query.name,
    },
    {
      where: {id: req.params.id}
    }
  )
  .then(function (rowsUpdated) {
    res.json({updated: true})
  })
  .catch(next)
}

exports.delete = (req, res) => {
  models.Company.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.json({deleted: true})
  })
}