import { Stream, Sink, just, never, defaultScheduler, PropagateTask } from 'most';
import { MulticastSource } from '@most/multicast';

export class VarStream <T> {
  private _value: T = null
  private _source: MulticastSource<T>
  private _stream: Stream<T>

  constructor (initialValue?: T) {
    this._source = new MulticastSource<T>(never().source)
    this._stream = new Stream<T>(this._source)
    if (initialValue) {
      this._value  = initialValue
      defaultScheduler.asap(PropagateTask.event(this._value, this._source))
    }
  }

  public stream () {
    return this._stream
  }

  public set (value: T) {
    if ( value != this._value) {
      this._value = value
      defaultScheduler.asap(PropagateTask.event(this._value, this._source))
    }
  }

  public get () {
    return this._value
  }

  public error <Err extends Error> (err: Err) {
    defaultScheduler.asap(PropagateTask.error(err, this._source))
  }

  public end () {
    defaultScheduler.asap(PropagateTask.end(null, this._source))
  }

}
