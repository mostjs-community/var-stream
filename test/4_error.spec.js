import { just }            from 'most'

import { VarStream }       from '../dist/varStream.js'

import chai from 'chai'
var assert = chai.assert
var expect = chai.expect
var should = chai.should()

describe('The VarStream.error method', () => {

  it('should exist', () => {
    const vs = new VarStream("foo")
    assert.isDefined(vs.error)
    assert.isFunction(vs.error)
  })

  it('should cause the stream to throw an error', (done) => {
    const vs = new VarStream()
    vs.stream()
      .drain()
      .catch( e => {
        assert.equal(e.message,"foo")
        done()
      })

    vs.error(new Error("foo"))
  })

})
