- Hiccup support?
  id:: 643fee7f-8eb2-4066-bf4c-3db4e0a2c06c
  collapsed:: true
	- See https://github.com/hyperfiddle/electric/issues/32
- You say the client/server boundary is inferred, but it seems like you're explicitly marking the boundaries?
  id:: 643fe93f-8534-4315-a318-ddf71c0daa20
  collapsed:: true
	- From the clock tutorial:
		- > The Electric compiler infers the backend/frontend boundary and generates the full-stack app (client and server that coordinate)
	- But in the code, it appears that we're explicitly marking those boundaries
		- ```
		  (e/client
		    (let [c (e/client e/system-time-ms)
		          s (e/server e/system-time-ms)]
		    ...)
		  ```
	- Q: What other boundaries are being inferred?
	-
	- A: The inference is sophisticated when considering lambdas, loops, recursion etc. It's more accurate to think of the macros as marking *color* of an expression (i.e. *pinning* it to a site) rather than marking the actual client/server boundary. There may or may not be an actual transfer there depending on the context that the expression is embedded in and also depending on whether any bindings (e.g. `s`) are actually accessed. For example here on L2, there is an e/client inside of an e/client, so that is not actually a boundary. And based only on this local knowledge of the expression, we don't know if `s` was even needed on the client as argument to a client-colored expression, which means no transfer is necessary.
- How to resolve from `e/client` a keyword by namespace alias, when the :require directive is guarded to :clj only?
  id:: 643173b8-aa0d-44f7-a669-737fce8e5771
  collapsed:: true
	- A: use `:as-alias`:
		- ```
		  (ns foo
		    (:require [bar #?(:clj :as :cljs :as-alias) b]))
		  
		  (e/defn Foo []
		  	(e/server ::b/baz))
		  ```
- Why is doesn't Electric have fast incremental builds yet?
  id:: 645baf1a-3dd5-428a-9f2c-53bfec69b425
	- We are working on it. Today, the Electric network planner is implemented as a whole-program optimization pass. Some of the network optimizations are done in this compile-time analysis and the optimizations are non-local, i.e. an efficient network plan cannot be inferred without knowledge of the entire program. That's why, today, the whole Electric program (across all namespaces) is compiled all at once for every change. We are already deep into major Electric internals improvements which will unblock many quality of life improvements like incremental builds and function-by-function compilation. We are working towards moving certain network optimizations to runtime (i.e. a JIT compiler, like the JVM). That will enable incremental builds.