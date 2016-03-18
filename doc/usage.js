var gen = require('../index')
  , ast = require('mkast')
  , walk = ast.walk();
walk
  .pipe(gen())
  .pipe(gen.serialize({indent: 2}))
  .pipe(process.stdout);
walk.end(ast.parse('This is a markdown paragraph.'));
