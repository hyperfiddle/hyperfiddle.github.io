- Question: I haven’t found an example yet that shows how to integrate with one of those good old-fashioned JS libraries that want a dom element to mess with (and don’t observe any DOM changes themselves)
- User story: I’d like to use the highlight.js library and looking for a way to mutate a DOM element after it has been mounted.
- This works:
	- ```clojure
	  (dom/code (dom/props {:class "language-clojure"})
	    (dom/text "{:a :b}")
	    (highlight/highlightElement dom/node))
	  ```
- but this doesn't, since it doesn't re-run highlightElement:
	- ```clojure
	  (dom/code (dom/props {:class "language-clojure"})
	    (dom/text (e/server (pr-str project)))
	    (highlight/highlightElement dom/node))
	  ```
-
- Answer: Here is a solution, it requires you to think in terms of the DAG / reactivity graph
	- ```clojure
	  (defn highlight! [node _] 
	    (highlight/highlightElement dom/node))
	  
	  (dom/code (dom/props {:class "language-clojure"})
	    (dom/text (e/server (pr-str project)))
	    (highlight! dom/node project)) ; establish reactive dependency on project
	  ```
	-
- Perhaps we should include a macro for this, something like
	- `(e/re-run! (highlight/highlightElement dom/node) project)`
- which macroexpands something like
	- `((fn [project] (highlight/highlightElement dom/node)) project)`