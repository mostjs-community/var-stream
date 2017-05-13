import { just }            from 'most'

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

  it('should cause running to return false', () => {
    const vs = new VarStream()
    vs.set("foo")
    vs.end()
    assert.equal(vs.isRunning(), false)
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

  it('should cause the stream to terminate', (done) => {
    const vs = new VarStream()

    const acc = []
    vs.stream().observe((x) => acc.push(x))

    vs.set("foo")
    vs.end()
    vs.set("bar")
    vs.set("bing")

    setTimeout( () => {
      assert.deepEqual(acc, ["foo"])
      done()
    }, 10 )
  })


})
