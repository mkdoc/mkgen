var through = require('through3')
  , mkast = require('mkast')
  , Node = mkast.Node;

function Message(opts) {
  this.prepend = opts.prepend;
  this.node = opts.node;
  this.sent = false;
  this.open = 0;
}

/**
 *  Stream transform.
 *
 *  @private
 */
function transform(chunk, encoding, cb) {

  if(Node.is(chunk, Node.EOF)) {
    this.open--; 
  }

  // append to end before last eof node
  if(!this.sent && !this.prepend
    && Node.is(chunk, Node.EOF) && this.open === 0) {
    this.push(this.node);
    this.push(Node.createNode(Node.EOF));
    this.sent = true;
  }

  // pass through the existing data
  this.push(chunk);

  // prepend to start after first document node
  if(!this.sent && this.prepend && Node.is(chunk, Node.DOCUMENT)) {
    this.push(this.node);
    this.push(Node.createNode(Node.EOF));
    this.sent = true;
  }

  if(Node.is(chunk, Node.DOCUMENT)) {
    this.open++; 
  }

  cb();
}

module.exports = through.transform(transform, {ctor: Message});
