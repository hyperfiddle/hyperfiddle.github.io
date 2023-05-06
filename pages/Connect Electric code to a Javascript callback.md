- Q: How can I call back to Electric from a JS callback, something like this?
	- ```clojure
	  (e/defn Todo-list []
	    (e/client
	      (.addEventListener (.getElementById js/document "button")
	        "click"
	        (fn [] (println "I really wish this was an electric function! eg, (new F)")))))
	  ```
- A:
	- m/observe
	- see slack thread: https://clojurians.slack.com/archives/C7Q9GSHFV/p1683292217371419
	- ```clojure
	  (e/defn Todo-list []
	    (e/client
	      (let [>click (m/observe (fn mount [emit!]
	                                (let [f (fn [e] (emit! e))]
	                                  (.addEventListener dom/node "click" f)
	                                  (fn unmount [] (.removeEventListener don/node "click" f)))))
	            ; >click is a discrete flow of events 
	            
	            click (new (m/reductions {} nil >click))  ; add initial value
	            ; add initial value, electric reactive values must never be undefined 
	            ]
	        
	        (when click
	          (println "now you can put electric code here!")))))
	  ```
-
- Related:
	- [[IntersectionObserver]]
	- ResizeObserver