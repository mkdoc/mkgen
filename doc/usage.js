var msg = require('../index')
  , ast = require('mkast');
ast.src('This is a markdown paragraph.')
  .pipe(msg())
  .pipe(ast.stringify({indent: 2}))
  .pipe(process.stdout);
