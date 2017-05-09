import { Stream }          from 'most'
import { run }             from 'most-test'

import { VarStream }       from '../dist/varStream.js'

import chai from 'chai'
var assert = chai.assert
var expect = chai.expect
var should = chai.should()

describe('The VarStream.set method', () => {

  it('should exist', () => {
    const vs = new VarStream("foo")
    assert.isDefined(vs.set)
    assert.isFunction(vs.set)
  })

  it('should change the value if the new value is different', () => {
    const vs = new VarStream("foo")
    vs.set("bar")
    assert.equal(vs.get(), "bar")
  })

  it('should return the new value if a change occured', () => {
    const vs = new VarStream("foo")
    assert.equal(vs.set("bar"), "bar")
  })

  it('should return null if no change occured', () => {
    const vs = new VarStream("foo")
    assert.equal(vs.set("foo"), null)
  })

  it('should cause the stream to emit the new value if it is different', (done) => {
    const vs = new VarStream("foo")
    const st = vs.stream()

    const acc =[]
    st.observe(x => acc.push(x))

    const env = run(st)
    env.tick(20)  // wait 20 ms for constructor to complete
      .then(
        result => {
          vs.set("bar")  // Trigger a new event
          return env.tick(20) // wait another 20 ms
        }
      ).then(
        result => {
          vs.set("bing")  // Trigger a new event
          return env.tick(20) // wait another 20 ms
        }
      ).then(
        result => {
          vs.set("bang")  // Trigger a new event
          return env.tick(20) // wait another 20 ms
        }
      ).then(
        result => {
          assert.deepEqual(acc, ["foo", "bar", "bing", "bang"])
          done()
        }
      ).catch(
        err => {
          console.log(err)
          assert.equal(err,null)
          done()
        }
      )
  })

  it('should not cause the stream to emit anything if it is the same', (done) => {
    const vs = new VarStream("foo")
    const st = vs.stream()

    const acc =[]
    st.observe(x => acc.push(x))

    const env = run(st)
    env.tick(20)  // wait 20 ms for constructor to complete
      .then(
        result => {
          vs.set("foo")  // Trigger a new event
          return env.tick(20) // wait another 20 ms
        }
      ).then(
        result => {
          vs.set("bar")  // Trigger a new event
          return env.tick(20) // wait another 20 ms
        }
      ).then(
        result => {
          vs.set("bar")  // Trigger a new event
          return env.tick(20) // wait another 20 ms
        }
      ).then(
        result => {
          assert.deepEqual(acc, ["foo", "bar" ])
          done()
        }
      ).catch(
        err => {
          console.log(err)
          assert.equal(err,null)
          done()
        }
      )
  })

})
