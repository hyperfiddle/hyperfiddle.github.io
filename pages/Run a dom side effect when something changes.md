- Question: How do I integrate with a JS library that attaches to a DOM element reference? For example, I’d like to use the highlight.js library which attaches to and mutates a DOM element after it has been mounted.
-
- Answer: Here is a solution, it requires you to think in terms of the DAG / reactivity graph
	- ```clojure
	  (defn highlight! [node _] 
	    (highlight/highlightElement dom/node))
	  
	  (dom/code (dom/props {:class "language-clojure"})
	    (dom/text (e/server (pr-str project)))
	    (highlight! dom/node project)) ; establish reactive dependency on project
	  ```