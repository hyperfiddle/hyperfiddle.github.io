- **Nav:** [[Demos]] · [[Examples]] · [[Getting Started]] · [[Tutorial]] · [[Explanations]] · [[Guides]] · [FAQ](Electric FAQ) · [[Reference]] · [Blog](Blog) · [[Support]]
-
- Electric is a reactive Clojure DSL that simplifies full-stack web development by seamlessly merging frontend and backend code, using a **compiler** to manage the frontend/backend boundary. The compiler analyzes your unified codebase to infer the client/server boundary, and generate full-stack web apps with fully automatic network sync.
-
- ![](https://github.com/hyperfiddle/electric/raw/master/docs/electric-explainer-5.png)
- *Figure: This is not RPC or client-side ORM. The Electric compiler performs deep graph analysis of your unified frontend/backend program to automatically determine the optimal network cut, and then compile it into separate client and server target programs that cooperate and anticipate each other's needs.*
-
- Key features and benefits:
	- **Unified codebase:** Electric programs interweave frontend and backend logic in the same expression, function, or file, reducing the complexity and cognitive load associated with managing separate codebases for each part of the application.
	- **Automatic client/server boundary inference:** Electric extends Clojure by building client/server awareness directly into the language itself, allowing you to write one body of code that seamlessly blends frontend and backend code in the same expression, same function, same file.
	- **Seamless network synchronization:** Electric automatically handles the complex details of client/server network sync, making it faster to develop real-time applications and ensuring that the data is always up-to-date and consistent across the entire application.
	- **Streaming lexical scope:** Experience the power of seamlessly accessing values across client and server environments within the same scope. Electric's streaming lexical scope unifies your code and promotes readability, making it easier to maintain and understand the interactions between client and server components.
	- **Network-transparent composition:** Electric programs seamlessly compose functions that involve both client and server-side operations. The Electric compiler takes into account loops, recursion, closures, higher order functions, and deeply nested function calls, to determine the implied client/server boundary.
	- **Eliminate request waterfalls:**
	- **Fully Reactive**: Electric integrates reactivity directly into the programming language itself. Reactive-if, reactive-for, reactive try/catch. When everything is reactive, it feels like nothing is reactive. No observables! No async types! De-load your mind and focus on writing clean and concise code.
	- **Multiplayer-native:** Develop real-time multiplayer applications without any extra effort. The Electric reactivity graph can contain shared server state, which means that every application is automatically multiplayer-enabled, requiring no additional lines of code.
	- **Leverages the power of Clojure:** By extending Clojure, Electric inherits all of the language's powerful features, such as seamless Java and JavaScript interoperability, immutability, functional programming, cross-platform code sharing, and concise syntax, to create an expressive and productive full-stack web development experience.