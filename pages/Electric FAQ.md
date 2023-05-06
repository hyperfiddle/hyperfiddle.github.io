- Hiccup support?
  id:: 643fee7f-8eb2-4066-bf4c-3db4e0a2c06c
	- See https://github.com/hyperfiddle/electric/issues/32
- You say the client/server boundary is inferred, but it seems like you're explicitly marking the boundaries?
  id:: 643fe93f-8534-4315-a318-ddf71c0daa20
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
	- A: use `:as-alias`:
		- ```
		  (ns foo
		    (:require [bar #?(:clj :as :cljs :as-alias) b]))
		  
		  (e/defn Foo []
		  	(e/server ::b/baz))
		  ```