# var-stream
Stateful interface object that stores and reactively streams a variable. 

Comments welcome.  I'm new to typescript.

## Purpose

Useful on the boundary between a declarative (get, set) code base and a reactive (streaming) code base.  Uses Most.js for streams. 

## Use

Refer to the test specs for the ground truth.  Summarizing:

```javascript

import { VarStream } from '@tdsfugal/var-stream'

const vs_default     = new VarStream()                               // default value is null
const vs_initialized = new VarStream({ foo: 1, bar: "duck" })        // value = { foo: 1, bar: "duck" } 
const vs_typed       = new VarStream<string>("walks like a ")        // value can be typed if in a typescript environment

// VarStreams work exactly as any object with getters and setters would
vs_default.set("If it ")                                             // Getters and setters work as expected. 
console.log(vs_typed.get() + vs_initialized.get().bar)               // Prints "walks like a duck"

// To push values from stateful to streaming use .stream() to get a multicast stream:
const ds1 = vs_default.stream()                                      // ds1 is a most.js stream. Emits the initial value "If it"
const ds2 = vs_default.stream()                                      // ds2 is a most.js stream. Emits the initial value "If it"

vs_default.set("Walks like a duck")                                  // ds1 and ds2 emit "Walks like a duck" 
vs_default.set("And talks like a duck")                              // ds1 and ds2 emit "And talks like a duck" 
vs_default.set("It must be a duck")                                  // ds1 and ds2 emit "It must be a duck" 

// To push values from the streaming to the stateful side call .set() within a .observe() terminator:
const ping = Most.constant("ping", Most.periodic(1000))              // Stream that emits "ping" every second.  
ping.observe( x => vs_default.set(x))                                // Duplicate values are ignored.  ds1 and ds2 emit "ping" only once.  

// To shut the reactions down, use this irreversable call:
vs_default.end()                                                     // terminates streams ds1 and ds2, ends vs_default
vs_default.set("foo")                                                // throws an error
x = vs_default.get()                                                 // throws an error
ds3 = vs_default.stream()                                            // throws an error

```

## License: MIT
