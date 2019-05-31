exports.index = (req, res) => {
  res.render('index');
}

exports.dashboard = (req, res) => {
  res.render('dashboard', {
    'variable': 'Hello World'
  })
}