var gen = require('../index')
  , commonmark = require('commonmark')
  , parser = new commonmark.Parser()
  , stream = gen();
stream.end(parser.parse('This is a markdown paragraph.'));
