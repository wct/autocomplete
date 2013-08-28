var express = require('express'),
    join = require('path').join,
    json = require('./data.json'),
    app = express(),
    response;

app.use(express.static(join(__dirname, '..')));

app.get('/search1/:query', function(req, res) {
  var query = req.params.query.toLowerCase(),
    maxItems = parseInt(req.headers["max-items"], 10) || 1000;

  var children = json.accounts.filter(function(item) {
    return ~item.accountName.toLowerCase().indexOf(query);
  });
  while (children.length > maxItems) children.pop();
  res.send( children );
});

app.get('/search2/:query', function(req, res) {
  var query = req.params.query.toLowerCase(),
    maxItems = parseInt(req.headers["max-items"], 10) || 1000;

  var children = json.accounts.filter(function(item) {
    return ~item.accountNumber.toLowerCase().indexOf(query);
  });
  while (children.length > maxItems) children.pop();
  res.send( children );
});

app.get('/', function(req, res) {
  res.sendfile(join(__dirname, 'test.html'));
});

app.listen(7000, function() {
  console.log('Listening on port 7000');
});
