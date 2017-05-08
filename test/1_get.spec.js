import { VarStream }       from '../dist/varStream.js'

import chai from 'chai'
var assert = chai.assert
var expect = chai.expect
var should = chai.should()

describe('The VarStream.get method', () => {

  it('should exist', () => {
    const vs = new VarStream("foo")
    assert.isDefined(vs.get)
    assert.isFunction(vs.get)
  })

  it('should fetch the data value', () => {
    const vs = new VarStream("foo")
    assert.equal(vs.get(), "foo")
  })

})
