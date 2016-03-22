var expect = require('chai').expect
  , fs = require('fs')
  , mkast = require('mkast')
  , Node = mkast.Node
  , parser = new mkast.Parser()
  , mkmsg = require('../../index')
  , utils = require('../util');

describe('mkmsg:', function() {

  it('should return stream with no options', function(done) {
    var stream = mkmsg();
    expect(stream).to.be.an('object');
    done();
  });

  it('should append to stream', function(done) {
    var source = 'test/fixtures/paragraph.md'
      , target = 'target/append.json.log'
      , data = parser.parse('' + fs.readFileSync(source))

    // mock file for correct relative path
    // mkcat normally injects this info
    data.file = source;

    var input = mkast.serialize(data)
      , output = fs.createWriteStream(target)
      , opts = {input: input, output: output};
    
    mkmsg(opts);

    output.once('finish', function() {
      var result = utils.result(target);

      // open document
      expect(result[0].type).to.eql(Node.DOCUMENT);

      // mock document paragraph
      expect(result[1].type).to.eql(Node.PARAGRAPH);

      // appended document (message)
      expect(result[2].type).to.eql(Node.DOCUMENT);
      expect(result[2].firstChild.type).to.eql(Node.PARAGRAPH);
      expect(result[2].firstChild.firstChild.type).to.eql(Node.TEXT);
      expect(result[2].firstChild.firstChild.literal)
        .to.eql('Generated by ');

      // EOF for both documents
      expect(result[3].type).to.eql(Node.EOF);
      expect(result[4].type).to.eql(Node.EOF);

      done();
    })
  });

});
