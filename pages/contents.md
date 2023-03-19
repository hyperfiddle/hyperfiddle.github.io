- [[Hyperfiddle Docs]]
- [[Electric Clojure]]
	- [[Getting Started]]
	- [[Tutorials]]
	- Explanations
	  collapsed:: true
		- How it works
			- **Streaming lexical scope**
			- Network planner
				- Electric Clojure's network planner understands closures, loops, and deeply nested function calls, making it easier to manage client and server scope bindings.
		- [[Button callback explainer]]
		- How to reason about network transfers
	- Guides
		- Custom transit handlers
		- How do I run a dom side effect when something changes?
			- I’d like to use the highlight.js library and looking for a way to mutate a DOM element after it has been mounted.
			- I haven’t found an example yet that shows how to integrate with one of those good old-fashioned JS libraries that want a dom element to mess with (and don’t observe any DOM changes themselves)
			- This works:
				- ```clojure
				  (dom/code (dom/props {:class "language-clojure"})
				                     (dom/text "{:a :b}")
				                     (highlight/highlightElement dom/node))
				  ```
			- but this doesn't, since it doesn't re-run highlightElement:
				- ```
				  (dom/code (dom/props {:class "language-clojure"})
				                     (dom/text (e/server (pr-str project)))
				                     (highlight/highlightElement dom/node))
				  ```
			- Here is a solution, it requires you to think in terms of the DAG / reactivity graph
				-
	- [[Reference]]
	- [[Electric FAQ]]
	- [[Examples]]
- [[What is Hyperfiddle]]
- [[Blog]]
	-