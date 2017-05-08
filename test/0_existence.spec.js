import { VarStream }       from '../dist/varStream.js'

import chai from 'chai'
var assert = chai.assert
var expect = chai.expect
var should = chai.should()

describe('The VarStream class', function() {

  it('should exist', function() {
    assert.isDefined(VarStream)
    assert.isFunction(VarStream)
  })

  it('should construct with no arguments', function() {
    const foo = new VarStream()
    foo.should.be.an.instanceof(VarStream)
  })

  it('should construct with one argument', function() {
    const foo = new VarStream("foo")
    foo.should.be.an.instanceof(VarStream)
  })

})
