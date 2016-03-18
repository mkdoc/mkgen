var gen = require('../index')
  , ast = require('mkast')
  , walk = ast.walk()
  , stream = gen();
walk
  .pipe(stream)
  .pipe(gen.serialize({indent: 2}))
  .pipe(process.stdout);
walk.end(ast.parse('This is a markdown paragraph.'));
