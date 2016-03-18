var through = require('through3')
  , mkast = require('mkast')
  , Serialize = require('mkast/lib/serialize')
  , Node = mkast.Node
  , parser = new mkast.Parser()
  , MSG = 'Generated by [mkdoc](https://github.com/mkdoc/mkdoc).'

/**
 *  Stream transform.
 *
 *  @private
 */
function generator(node, prepend) {
  var sent = false
    , open = 0;

  function transform(chunk, encoding, cb) {

    if(Node.is(chunk, Node.DOCUMENT)) {
      open++; 
    }else if(Node.is(chunk, Node.EOF)) {
      open--; 
    }

    //console.error(chunk);

    // append to end before last eof node
    if(!sent && !prepend && Node.is(chunk, Node.EOF) && open === 0) {
      this.push(node);
      this.push(Node.createNode(Node.EOF));
      sent = true;
    }

    // pass through the existing data
    this.push(chunk);

    // prepend to start after first document node
    if(!sent && prepend && Node.is(chunk, Node.DOCUMENT)) {
      this.push(node);
      this.push(Node.createNode(Node.EOF));
      sent = true;
    }

    cb();
  }

  var Generator = through.transform(transform);
  return new Generator();
}

/**
 *  Append or prepend a message string.
 *
 *  The message string is parsed as markdown and written to the end of the 
 *  document unless `prepend` is given.
 *
 *  The document node itself is omitted; it's content nodes are written to 
 *  the stream.
 *
 *  @function gen
 *  @param {Object} [opts] processing options.
 *  @param {Function} [cb] callback function.
 *
 *  @option {Readable} [input] input stream.
 *  @option {Writable} [output] output stream.
 *  @option {String} [message] generator message.
 *  @option {Boolean} [prepend] prepend message to the stream.
 *
 *  @returns an output stream.
 */
function gen(opts, cb) {

  opts = opts || {};
  opts.input = opts.input;
  opts.output = opts.output;

  var message = opts.message || MSG
    , node = parser.parse(message)
    , stream = generator(node, opts.prepend)
    , serialize = new Serialize();

  if(!opts.input || !opts.output) {
    return stream; 
  }

  // pass through stream, we append or prepend
  mkast.parser(opts.input)
    .pipe(stream)
    .pipe(serialize)
    .pipe(opts.output);

  if(cb) {
    opts.output
      .once('error', cb)
      .once('finish', cb);
  }

  return opts.output;
}

module.exports = gen;
