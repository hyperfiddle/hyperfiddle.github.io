- https://clojurians.slack.com/archives/C7Q9GSHFV/p1678988187329129
-
-
- in this case the try/catch is not needed at all. When the event handler finishes it is unmounted, so you can use on-unmount
	- ```clojure
	  (e/defn Toggle []
	    (e/client
	      (dom/button
	        (dom/on "click" (e/fn [e]
	                          (.preventDefault e)
	                          (swap! !state assoc :status :submited)
	                          (e/on-unmount #(swap! !state assoc :status :idle))
	                          (e/server
	                            (e/offload
	                              #(let [foo "foo"]
	                                 (prn "BAZ")
	                                 (Thread/sleep 500)
	                                 (prn "FOO")
	                                 foo)))))
	        (dom/text "click"))
	      (dom/pre (dom/text (pr-str (e/watch !state))))))
	  ```
- you can also use the `case` idiom to do something after a loading state resolves:
	- ```clojure
	  (e/defn Toggle []
	    (e/client
	      (dom/button
	        (dom/on "click" (e/fn [e]
	                          (.preventDefault e)
	                          (swap! !state assoc :status :submited)
	                          (case (e/server
	                                  (e/offload
	                                    #(let [foo "foo"]
	                                       (prn "BAZ")
	                                       (Thread/sleep 500)
	                                       (prn "FOO")
	                                       foo)))
	                            (swap! !state assoc :status :idle))))
	        (dom/text "click"))
	      (dom/pre (dom/text (pr-str (e/watch !state))))))
	  ```
	- `(case (e/server ...) X)` is the interesting part, the `case` here only runs the body `X` when the pending state is resolved
	- We are still thinking about this usage of `case` and how to do this better
-