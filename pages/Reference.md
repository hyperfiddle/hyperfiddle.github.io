- Architecture diagram
- Electric entrypoint
  id:: 645badcc-deba-4f2c-b551-e3bdca23b05e
  collapsed:: true
	- Q: Where is the compiled electric program injected into the ring middleware stack?
	- What I found out from the sources:
		- start fn user(.clj)/main .
		- main loads shadow and later starts the server.
		- shadow compiles cljs from entry user(.cljs)/start.
		- start calls electric-boot.
		- because electric functions are macros, they are compiled and because clj and shadow use the same Repl the compiled electric program is available in clj.
	- Q: from here, how does it get into the ring stack?
		- A: search for “jetty” we have an example jetty server which hosts the websocket, each websocket gets an instance of the server DAG
	- Q: ok, there is `electric-ws-message-handler` and `electric-ws-message-handler`. I looked into the source code, but I am not able to figure out how the DAG is arriving there. Is there a `def dag (atom)` or ` def ^dynamic dag` or how is this achieved?
		- Today IIRC the clojurescript build is responsible for both server and client
		- the client is compiled all the way down: Electric -> DAG IR -> CLJS -> JS
		- the server is compiled by the clojurescript build Electric -> DAG IR, and the server DAG value (IR, think bytecode) is embedded into the javascript artifact. The browser client will bootstrap the server by sending up the DAG value to the server in the first frame of the websocket, and then the server interprets the DAG IR at runtime.
		- (Yes, that means the Electric frontend is compiled all the way to JS but the Electric backend is only partially compiled and then interpreted)
		  There may be minor errors in this explanation but this is the gist of it.
		  We have a branch that bakes the server DAG into the java artifact rather than bootstrapping from the client, i forget our exact plans for this but there will be changes this summer
- Electric compiler internals
- hyperfiddle.electric
	- e/defn
		- We capitalize them (like react components)
		- evaluation rules
			- https://gist.github.com/dustingetz/a6f4f8abd62eec4e2a5a4c91b2f9a3cd
			- https://clojurians.slack.com/archives/C7Q9GSHFV/p1681912874990159
	- new
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
	- do
		- (do (dom/div) (dom/div)) will mount both divs. think of them as components not statements. if they contain reactive dependencies then they will be maintained concurrently. Note that (do (println 1) (println 2)) will mount the printlns in order (and then never touch them again as the exprs are constant), so this is backwards compatible with clojure
	- try/catch
		- https://clojurians.slack.com/archives/C7Q9GSHFV/p1682972314489469
- hyperfiddle.electric-dom2
	- reactive point writes orchestrated by Electric
	- dom/node
	- dom/text
		- Think of (dom/text x) as having the same evaluation rules as (println x)
- hyperfiddle.ui4
- missionary
	- m/observe
		- m/observe is the key primitive that adapts an event listener callback interface to a discrete flow, note m/observe also forces you to define the cleanup code in the same place to unregister the callback and destroy the codemirror (which missionary will call during teardown)
		- `(m/observe (fn [!] (def ! !) #()))`