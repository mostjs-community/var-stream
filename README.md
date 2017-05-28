# var-stream
Stateful interface object that stores and reactively streams a variable. 

## Purpose

Useful on the boundary between a declarative (get, set) code base and a reactive (streaming) code base.  Uses Most.js for streams. 

## Use

```javascript

import { VarStream }         from '@tdsfugal/var-stream'

const vs_default     = new VarStream()                               // default value is null
const vs_initialized = new VarStream({ foo: 1, bar: "duck" })        // value = { foo: 1, bar: "duck" } 
const vs_typed       = new VarStream<string>("Walks like a ")        // value can be typed if in a typescript environment

console.log(vs_typed.get() + vs_initialized.get().bar)               // Getters and setters work as expected. Prints "Walks like a duck"

const ds = vs.default.stream()                                       // ds is a most.js stream

vs_default.set("Must be a duck")                                     // ds immediately emits "Must be a duck" 

```

## License: MIT
