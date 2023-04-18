- Architecture diagram
- hyperfiddle.electric
	- e/defn
	  collapsed:: true
		- We capitalize them (like react components)
	- new
	  collapsed:: true
		- Electric uses new to call electric functions
			- (e/defn Teeshirt-orders-view [x] ...)
			  (Teeshirt-orders-view. x)
			  (new Teeshirt-orders-view x)
		- This is like how Reagent uses square brackets [] to call Reagent components
		- Why is this needed? Because, Clojure is dynamically typed, so in certain cases the compiler can't infer whether a value is an Electric lambda or Clojure lambda and thus userland must specify the call convention with syntax.
			- example:
	- e/fn
	- e/def
	- e/watch
	- e/client, e/server
	- e/for-by
	- e/on-unmount
- hyperfiddle.electric-dom2
- hyperfiddle.ui4