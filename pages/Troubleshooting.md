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
-