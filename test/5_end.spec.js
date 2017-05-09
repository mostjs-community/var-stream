import { just }            from 'most'
import { run }             from 'most-test'

import { VarStream }       from '../dist/varStream.js'

import chai from 'chai'
var assert = chai.assert
var expect = chai.expect
var should = chai.should()

describe('The VarStream.end method', () => {

  it('should exist', () => {
    const vs = new VarStream("foo")
    assert.isDefined(vs.end)
    assert.isFunction(vs.end)
  })

  it('should cause get to return null', () => {
    const vs = new VarStream() 
    vs.set("foo")
    vs.end()
    assert.equal(vs.get(), null)
  })

  it('should cause set to return null', () => {
    const vs = new VarStream()
    vs.set("foo")
    vs.end()
    assert.equal(vs.set("bar"), null)
  })

  it('should cause the stream to terminate', () => {
    const vs = new VarStream()
    const st = vs.stream()

    st.continueWith((e) => {
      return just(2)
    }).observe((x) => {
      assert.equal(x, 2)
    })

    vs.end()
    vs.set("foo")

  })


})
