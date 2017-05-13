import { Stream, Sink, never, defaultScheduler, PropagateTask } from 'most';
import { MulticastSource } from '@most/multicast';

export class VarStream <T> {
  private _value: T = null
  private _source: MulticastSource<T>
  private _stream: Stream<T>
  private _running: Boolean = true

  constructor (initialValue?: T) {
    this._source = new MulticastSource<T>(never().source)
    this._stream = new Stream<T>(this._source)
    if (initialValue) {
      this._value  = initialValue
      defaultScheduler.asap(PropagateTask.event(this._value, this._source))
    }
  }

  public running (): Boolean {
    return this._running == true
  }

  public get (): T {
    return this._value
  }

  public set (value: T) {
    if ( this._running && value != this._value ) {
      this._value = value
      defaultScheduler.asap(PropagateTask.event(this._value, this._source))
      return value
    } else {
      return null
    }
  }

  public stream (): Stream<T> {
    return this._stream.startWith(this._value).filter( x => x != null )   // send current value, skip nulls
  }

  public error <Err extends Error> (err: Err) {
    defaultScheduler.asap(PropagateTask.error(err, this._source))
  }

  public end () {
    // Suppress get and set
    this._value = null
    this._running = false
    // Terminate the stream
    defaultScheduler.asap(PropagateTask.end(null, this._source))
  }

}
