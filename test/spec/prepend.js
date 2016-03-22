var expect = require('chai').expect
  , fs = require('fs')
  , mkast = require('mkast')
  , Node = mkast.Node
  , parser = new mkast.Parser()
  , mkmsg = require('../../index')
  , utils = require('../util');

describe('mkmsg:', function() {

  it('should prepend to stream', function(done) {
    var source = 'test/fixtures/paragraph.md'
      , target = 'target/prepend.json.log'
      , data = parser.parse('' + fs.readFileSync(source))

    // mock file for correct relative path
    // mkcat normally injects this info
    data.file = source;

    var input = mkast.serialize(data)
      , output = fs.createWriteStream(target)
      , opts = {input: input, output: output, prepend: true};
    
    mkmsg(opts);

    output.once('finish', function() {
      var result = utils.result(target);

      // open document
      expect(result[0].type).to.eql(Node.DOCUMENT);

      // appended document (message)
      expect(result[1].type).to.eql(Node.DOCUMENT);
      expect(result[1].firstChild.type).to.eql(Node.PARAGRAPH);
      expect(result[1].firstChild.firstChild.type).to.eql(Node.TEXT);
      expect(result[1].firstChild.firstChild.literal)
        .to.eql('Generated by ');

      // EOF for injected document
      expect(result[2].type).to.eql(Node.EOF);

      // mock document paragraph
      expect(result[3].type).to.eql(Node.PARAGRAPH);

      // final EOF
      expect(result[4].type).to.eql(Node.EOF);
      done();
    })
  });

});
