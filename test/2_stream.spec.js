import { Stream } from 'most'

import { VarStream }       from '../dist/varStream.js'

import chai from 'chai'
var assert = chai.assert
var expect = chai.expect
var should = chai.should()

describe('The VarStream.stream method', () => {

  it('should exist', () => {
    const vs = new VarStream("foo")
    assert.isDefined(vs.stream)
    assert.isFunction(vs.stream)
  })

  it('should return a Most Stream', () => {
    const vs = new VarStream("foo")
    const st = vs.stream()

    expect(st).to.be.instanceof(Stream)
  })

})
