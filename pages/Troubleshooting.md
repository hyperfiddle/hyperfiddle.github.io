- Electric requires :jvm-opts `-Xss2m` to compile
  id:: 642f2d7e-0fb2-428b-9bbb-3517f3b919d9
	- The default of 1m ThreadStackSize is exceeded by the Electric compiler due to large macroexpansions resulting in false StackOverflowError during analysis.
- `Unbound var.`
	- Usually means accessed a binding from the wrong site, i.e. accessed server-only binding on client.
- How to resolve from e/client a keyword by namespace alias, when the require spec is :clj only?
	- ```
	  (ns foo
	    (:require [bar #?(:clj :as :cljs :as-alias) b]))
	  
	  (e/defn Foo []
	  	(e/server ::b/baz))
	  ```
-