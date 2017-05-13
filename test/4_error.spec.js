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

  it('should cause the stream to throw an error', () => {
    const vs = new VarStream()
    const st = vs.stream()

    st.recoverWith((e) => {
      assert.equal(e.message,"foo")
      return just(2)
    }).observe((x) => {
      assert.equal(x, 2)
    })

    vs.error(new Error("foo"))
  })

})
