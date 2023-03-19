- https://clojurians.slack.com/archives/C7Q9GSHFV/p1678988187329129
- Question: Hi, is this code valid:
	- ```clojure
	  (dom/on "click" (e/fn [e]
	                    (.preventDefault e)
	                    (try
	                      (e/server
	                        (e/offload
	                          #(let [foo "foo"]
	                            (prn "BAZ")
	                            (Thread/sleep 10000)
	                            (prn "FOO")
	                            foo)))
	                       (catch Pending _
	                         (swap! !state assoc :status :submited)
	                         (e/on-unmount #(swap! !state assoc :status :idle))))
	  ```
	- I never see the `FOO` print. Like if the `Thread/sleep` was ignored. I don’t understand why.
- What's happening
	- dom/on is listening for Pending to know when the callback has successfully run on the server
	- don't silence the Pending exception inside the callback and it will work. Meaning, don't catch and discard (if you catch here you must rethrow)
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