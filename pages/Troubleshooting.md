- **Question not answered here? Please ask in slack!**
-
- [Electric Changelog](https://github.com/hyperfiddle/electric/blob/master/docs/CHANGELOG.md)
- Electric requires :jvm-opts `-Xss2m` to compile
  id:: 642f2d7e-0fb2-428b-9bbb-3517f3b919d9
	- The default of 1m ThreadStackSize is exceeded by the Electric compiler due to large macroexpansions resulting in false StackOverflowError during analysis.
- `Unbound var.`
	- Usually means accessed a binding from the wrong site, i.e. accessed server-only binding on client.
- `Can't take value of macro _`
  id:: 6456707b-72aa-4897-8935-95acfc4849f3
	- This usually means you have a cljc file with macros but didn't do `#?(:cljs (:require-macros foo))`
- Electric var is nil from Clojure
  id:: 645670dd-98a8-4c15-bd25-9fd44bcd517d
	- Q: It seems like the value of electric-lang vars is nil is clojure-land. Is this expected?
		- ```clojure
		  (e/defn E [])
		  (def m {"k" E})
		  (println m)
		  ```
	- A: this is internals and could change. today, `e/def` quotes the body and saves it as metadata for a later compiler phase. electric things are only visible from inside/under the electric entrypoint
- I think Electric is leaking memory?
  id:: 64567f50-8f32-4023-87e6-32283a6b1833
	- Confirmed not leaking, see https://clojurians.slack.com/archives/C7Q9GSHFV/p1682009368316359
	- VisualVM is the tool you need to debug memory usage