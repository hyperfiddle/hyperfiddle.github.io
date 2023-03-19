- What's the difference between Hyperfiddle and Electric Clojure?
	- [Hyperfiddle](https://www.hyperfiddle.net/) is a managed code playground for building cloud GUIs. Coming 2024! (This is how we pay for all the cool FOSS stuff)
	- Electric Clojure is a reactive Clojure DSL that simplifies full-stack web development by seamlessly merging frontend and backend code, using a compiler to manage the frontend/backend boundary.
- Beginner FAQ
  title:: Electric FAQ
  collapsed:: true
	- To a noob like me, can someone explain what joining the frontend and backend means? What is meant by abstracting the networking between frontend and backend?
		- https://www.reddit.com/r/Clojure/comments/11ot83k/libraries_that_join_front_and_back_end/
	- I don't get it, how is it different than X
		- I think I fail to see the advantage in the example given. Is the point that there's a server side call attached to the UI component directly? How is this any different than what can already be done with old school full stack like Rails or even smaller libraries like Sinatra/Flask.
		- PHP doesn't reactively and selectively propagate changes between client and server, nor would it be feasible to write such a library in PHP itself. You could maybe achieve something similar with code generation of PHP and JS.
		- PHP lets you have a piece of server code that can see the local variables of the client code it's enclosed in? And it's all reactive? That's amazing!
- HN FAQ
  collapsed:: true
	- Objection: Separation of concerns?
	  collapsed:: true
		- code organization
			- Also nearly all the example have db transact/query code mixed with UI in the same file much like a PHP file. It wouldn't be a problem to extract that out into a separate namespace to reuse and expose to a traditional REST api for mobile apps?
		- I fear that it would make it really easy to write horribly inefficient apps, interspersing client and server code willy-nilly, ending up with an entangled async mess that noone can really reason about. I saw this unfolding first-hand in functional reactive codebases...
		- looks very overcomplicated for generating an html table, building something more powerful would result in even more complex code. There's a reason why these things get decoupled
		- However I think it’s missing the point of de-coupling. Security would be very hard to reason about, as would handling of intermittent network connections when the real structure of the client and server are abstracted away from you. Ultimately I think GraphQL with live queries is the best model for this type of reactive work. You get a decoupled client/server, reactivity, support for mobile clients as you have an API, as well as full type-safety on the client.
		- But there are a bunch of things that it makes a pain-in-the-ass. I've encountered this most with data-heavy apps, where I want to do some analysis on the server (e.g. Python/Pandas), but I want low-latency recalculations on the client in cases where the data is small enough. Doing it “right” requires implementing the same data-level logic in both Python and Javascript. Nobody has time for that, so we end up in our current world of laggy janky SaaS that needs to run off to the server every time you click a button.
		- This syntax is insanely hard to read, is non-standard, and is unclear what is server side and what is client side processed without purple and red highlighting. Maybe I’ve been in Node.js land too long, but I don’t get why this is better for my productivity or my ability to create efficient web apps.
	- Security?
	  collapsed:: true
		- if you're passing environments back and forth, how secure can this feasibly be? Is there an automated limit on what will be considered based on the generated code? How do you handle malicious environments?
		- This sounds absolutely terrifying from a security perspective... What's to stop a malicious client? What if your runtime state includes an  flag or similar? How do you guarantee that this state remains server-side when the entire language conflates server/client side code?
		- My first thought reading the article was security. After a quick ctrl-f, it was a little disconcerting to find that the only mention of security is in a tacked-on bullet list under the heading "risks"...
	- Objection: this is all very new and feels risky (did Mark say this?)
	  collapsed:: true
		- Show a demo that:
			- feel smooth
			- feel heavy load (chat client or something)
			- reasonable presentation views (todomvc)
			- OOM improvement in dev time - LOC
			- Low cognitive load - not learning anything new, in fact learning less. Forget how to serialize etc
			- Note that the launch to Clojure community - none of those are real leads, we just want mindshare and ppl talking about us.
	- List of tradeoffs?
	  collapsed:: true
		- I think its a serious question whether apps built with this are more performant, easier to use, (and so on) than the equivalent PHP-approach.
		- I'm not familiar with the computer sciencey magic that's going on to make all this possible so I'm not capable of assessing the tradeoffs vs a traditional backend and mobile app/web frontend codebase.
		- garbage collectors - people thought you'd never get the same speed, you'd have to manually manage memory
		- abtract the network? will it meet my perf goals?
		- note even a bad network planner is doing better than what dysfunctional commercial teams are doing in practice, same as with GC
		- I'm not familiar with the computer sciencey magic that's going on to make all this possible so I'm not capable of assessing the tradeoffs vs a traditional backend and mobile app/web frontend codebase.
	- State management?
	  collapsed:: true
		- This is cool, but how is state managed here? Does the server need to maintain any per-client state between renders? Does that have scalability or concurrency implications? I'm having trouble discerning the ramifications.
			- https://news.ycombinator.com/item?id=31217448#31222862
	- How does the network work?
		- (communication fail) the datalog planner here making the cut across the network connection specifically to minimize data motion
	- network unreliability, performance / chattiness
		- network unreliability
		  collapsed:: true
			- https://www.reddit.com/r/Clojure/comments/vizdcc/hyperfiddlephoton_progress_update/idk0dy5/
			- I think that several of the fallacies of distributed computing are being ignored here. https://en.wikipedia.org/wiki/Fallacies_of_distributed_computing
			- On the surface it looks really cool, but I'm deeply skeptical because they've intentionally put off handling what I think is the hardest part making the idea production ready: handling network unreliability.
			  collapsed:: true
			  
			  from the talk: "Photon is at least as reliable as today-era web applications, there are lots of well-understood ways to approach reconnecting local-first etc. We have not done this work yet"
			  
			  I think this really understates the truly immense amount of engineering work that goes into making modern web system software appear reliable to users. Maybe Photon has a good solution but if my years in engineering have taught me anything it's that every line of code written and design decision made before tackling the hardest part of a problem need to be redone, so you should start with the hardest part first.
			  
			  I am hopeful that I'm proved wrong though :)
			  — https://news.ycombinator.com/item?id=31219819
				- (Speaker here) We appreciate your concern, the risk is real, and you're right – the hard parts cannot be put off. And we have not put them off. We've already thought through how to implement recovery, resync, long running sessions. We have several wiki pages worth of notes answering questions like how we will deal with network partitions, reconciliation, durable session state, dealing with OS sleep timer state, OTA code updates, etc.
				  What we have not yet done is the implementation work, because our pilot use case driving our eng priorities – an internal support app for a Series B SAAS startup – does not actually have this theoretical problem you describe. Photon's protocol today is tolerant to arbitrary delays, IFF you can guarantee message delivery and ordering, which is the problem TCP solves. We do already have pending/loading states, which are trapped locally through reactive try/catch.
				- BTW, the Photon codebase is only 2k LOC (analyzer, compiler & interpreter for JVM and JS targets, standard library) and a substantial part of that is redoing parts of the Clojure/Script analyzer infrastructure.
				- "truly immense amount of engineering work that goes into making modern web system software appear reliable to users"
				  That's a bit much for me. The current industry state of commercial SAAS/crud apps is a dumpster fire, Photon's speed and responsiveness is already miles ahead of literally every laggy SAAS tool we all suffer where programmers have manually hand-coded the network in the form of REST calls, manually split HTTP routes, backends-for-frontends, client side ORM, GraphQL resolvers, etc. How often do you Cmd-R your gmail or notion because it stopped working? React.js-era software is rotting to death, "reliable" is not a word that remotely describes my daily experience with web software today.
		- Request waterfalls
			- I saw this but I admit I have no idea what any of this means. Generally speaking Server Components/Islands do this dance, but they are done in a careful way so as not to cause waterfalls. I can't make heads or tails of what I'm looking at here and if it guards against that.
				- Hi from YAIG, yes request waterfalls are the exact problem that this compiler solves. We treat the frontend/backend as one program and let a network planner solve for an optimal network boundary and automatically manage the streaming state sync. Backend-for-frontend as a compiler
		- chattiness
		  collapsed:: true
			- tatut on slack: the readme mentions network planner improvements, is that related to the chattiness of the WS connection? it looks that currently clicking a checkbox in a todo item sends ~40 messages and ~6kb of data. It works very well locally.
	- Heavy abstraction?
	  collapsed:: true
		- It seems to me inefficient and error prone
		- convoluted
		  collapsed:: true
			- It does seem a bit convoluted after going through it a couple of times, but I'm down to try it if my reagent React interop still works, e.g. `[:> MyJsComponent {...}]`.
		- edge cases
		  collapsed:: true
			- I think the main risk for this kind of framework is that you spend as much time ironing out these kinds of "edge cases" (debounce, transition states, error states, transactions, authorization, url bar state, scroll bar position, paging, efficient re-renders, etc. etc.), which in practice are crucial to most non-trivial software, as you would have just writing the usual boilerplate and retaining fine-grained control.
		- magic (easy things easier, hard things much harder)
		  collapsed:: true
			- When the framework does so much for you, I always worry about what it looks like at scale when you need to start optimizing. Can you instrument all the plumbing, if something breaks can you get at it to fix it? How will you add caches at various different layers? On the browser, http cache, db cache, CDN, etc.? If the generated JavaScript that’s ultimately running on the browser has a bug, how many layers of library do I have to sift through to fix it? When I want to simulate the network for testing or deal with intermittent connection failures on the frontend how hard it is to plug in? What do schema migrations look like? What do deployments across a fleet of servers look like (there’s some point in time when some servers are old and some servers are new…)? These are problems with any framework, but the more all-in-one a framework attempts to be the harder it is to get in between the joints with your glue gun to fix things up. That said, this is Clojure and usually you have pretty easy access to all the intermediate bits and bobs and macros so maybe it’ll be great.
			- ORM frameworks also unify the value domain and the language semantics of the database and the host app, and make it very easy to shoot yourself in the foot with the N+1 query issue and such. This will suffer from the same issues once you move beyond toy examples.
				- (speaker here) Photon is not an object mapper, we do not have an N+1 problem and in fact that is the exact topic of this talk.
				  Photon is designed to scale in complexity without loss of performance or ability to reason. The computational structure that achieves this is single directional dataflow with pure functions; the abstraction is “referentially transparent” which means it composes mathematically the way pure functions compose.
				- Strong composition as a basis for abstraction scalability (in the domain of UI) is the core innovation here.
			- The problem with this type of system in my experience is that it’s great until you hit a bug, and then you realize you have no idea what’s going on under all the automagical stuff and you go crazy
			- Lots of people saying it’s like PHP or liveview with elixir. We kinda have that with livewire[1] and inertia[2] and as awesome as they are (no separate api etc) they also suffer from the “magic”
			- It's great that people are innovating and creating new abstractions, and I'm sure there are apps where the tradeoff is worth it (internal CRUD-focused enterprise stuff comes to mind), but my knee-jerk reaction for a large app is that it will make easy things easier and hard things much harder.
		- impedance mismatch?
		  collapsed:: true
			- Optimal data layout for storage and for processing / presentation can be quite different. Automatically mapping one to another I think can not be efficiently implemented in automatic fashion. I've tried different frameworks that claim to achieve it but at some point you always hit the wall. As a result I've long abandoned all those attempts and do manual transformation in code that are optimal for my particular situations
	- Debugging?
	  collapsed:: true
		- Regarding debugging – we're seeing a 10x reduction in LOC rebuilding the sister project Hyperfiddle (a spreadsheet-like tool for UI development). So the tradeoff is: 10x less code to debug, but as this is essentially a new runtime (comparable to the JVM or BEAM) yes there is a bootstrapping problem. The JVM has a debugger
		- You're right, it's true that the program is less inspectable than before, and that there is a high level abstraction between you and the metal. We're aware of the issue and have already begun – we landed async stack traces a while ago (which works about the same as in React.js).
		- And yet. It's also true that HLL (high level languages) like C, Java, Python all faced the same issue. The benefit is a huge gain in terms of ability to reason about ever larger programs. Java gave us garbage collection. Not everyone liked that; C++ developers want to manage their own memory. But at what cost?
		- Our thinking is: first get the semantics right. Then polish the experience (today we are here). Then add observability tools. Then make it fast. And if we've screwed up the semantics, then the project will fail for the reasons you describe.
		- The saving grace is we're seeing 10x LOC reduction (18k to 2k) in rebuilding Electric's sister project, Hyperfiddle (a spreadsheet like tool for robust UI development), as well as massive gains in performance and ability to reason about the code.
		- This code weight reduction actually doesn't come from not managing the network — you can just add more layers of JS meta frameworks for that.
		- The real weight reduction comes from eliminating all those layers and flattening it down
		- eliminating all the javascript framework crap that permeates everything
		- because Electric is a strong abstraction in the mathematical sense. It's a language, not a framework.
		- It's because Electric is a strong abstraction in the functional programming / mathematical sense. By abstracting the web architecture, we can think clearly about our business problem and not
		- Applications do not compose today, not really. We have "functional core imperative shell"
		- We think step changes in programming come in the form of programming languages.
		- you're right, it's true
		  collapsed:: true
			- we are aware of the issue, we will address it (have already begun)
			- and yet it's also true that
				- Python, JVM, React.js - all these engines have the same problem
				- if the argument was true, HLLs wouldn't be useful.
				- Problem:
					- it's bad if you compromise on inspectability, but wee will address this problem
			- we just needed to validate the approach
			- now we will focus on performance, observability, developer experience
	- Protocol standard?
	  collapsed:: true
		- Is this going to be just an implementation framework that generates language specific server and ui code, or are will there be any thinking of a **well defined protocol to create a harder definition of this generalized concept** rather than just be one specific framework?
		- certainly as open source nerds we think about it, it's a hard problem though, our wire protocol is in the same problem space as "defunctionalized continuation"
		- https://blog.sigplan.org/2019/12/30/defunctionalization-everybody-does-it-nobody-talks-about-it/
	- hot reloading?
	  collapsed:: true
		- I like how client and server code is separated, but I do wonder how changes in expressions are evaluated.
	- 3rd party GUI libs, membrane, web components
	  collapsed:: true
		- membrane: https://clojurians.slack.com/archives/C7Q9GSHFV/p1676473712160549
	- Comparison to React/Remix/Solid/Astro
	- Offline-first?
	- Databases supported?
	- Objection: Types and schemas
	  collapsed:: true
		- would be nicer if this was just types and schemas, so you didn't have to use a full-stack framework to get full-stack accelerations and linting
	- Objection: Clojure
	  collapsed:: true
		- Syntax
			- it makes me shiver to look at the code and not understand it
			- They chose a parenthesis-language, interesting choice. I don’t think the syntax is going to attract many web devs.
	- Clojure Haters
	  collapsed:: true
		- I'd love to know why any time I read something about clojure, it's inevitably cluttered with big words that the author (or some other Clojurist) invented that have a lot of deep and important meaning, that make it impenetrable to anyone else.
	- Serverless architecture
	  collapsed:: true
		- https://clojurians.slack.com/archives/C7Q9GSHFV/p1678979540476409
- Clojurist FAQ
  collapsed:: true
	- Hiccup
	  collapsed:: true
		- I think once it has a bit more reagent/hiccup support I could see myself plugging this into an existing project I'm working on for sections I want "live."  I could see using electric as my main websocket backend, running alongside my existing backend instead of going through the hassle of using sente and a mix of re-frame events/subs.
	- Datomic
	  collapsed:: true
		- Not an option for me as it has an immutable database as a dependency. My project is invested in PostgreSQL.
	- Fulcro
	  collapsed:: true
		- Interesting how no one has mentioned Fulcro. There seems to be a lot of overlap between the two. Anyone who has used both and mind comparing them?
	- Reframe
	- Piecemeal adoption
	  collapsed:: true
		- I could see using electric as my main websocket backend, running alongside my existing backend instead of going through the hassle of using sente and a mix of re-frame events/subs.
	- Home grown DOM framework bad
	  collapsed:: true
		- the docs seem to point to use a homegrown DOM library, rather than one of the major players. How easily would this work with a library like Reagent, Helix, or UIx?
			- L: if you have the right foundation, you can implement an incr dom lib in 100 lines of code. Reactive rendering is orthogonal
			- People think React, Solid etc solve a hard problem and thus dismiss solutions that don't use them. The actu
			- The language is already reactive, React has been generalized. React adds nothing that a reactive language doesn't already have. Electric-dom is 300 LOC of macros for JSX-y syntax on top of point effects (document.createElement).
			- React is pure overhead
			- Functional effect system
			- P: the only reason to think about React is interop to reuse existing code; here is an example ...
	- How dynamic is it? Do you have eval?
	  collapsed:: true
		- [https://clojurians.slack.com/archives/C7Q9GSHFV/p1676911681159639](https://clojurians.slack.com/archives/C7Q9GSHFV/p1676911681159639)
		- the e/defn macro, today, just creates an ordinary def and saves the quoted Electric code as metadata on the clojure var, the whole program is compiled all at once at the application entrypoint
		- IIUC, for "dynamic data path" you have if statements which switch between pieces of DAG (imagine train track switch), as well as e/fn Electric lambdas which are higher order DAG values
		- Compiler does full program analysis today
		- no eval, no dynamic linking
		- future: JIT, dynamic linking (means do more network planning at runtime - like JVM)
		- this is fine and probably the end state
- [[Deployment FAQ]]
- Triage
	- https://www.reddit.com/r/Clojure/comments/ufbzp6/uis_are_streaming_dags_hyperfiddlephoton_a/
	- https://www.reddit.com/r/Clojure/comments/uhdak7/uis_are_streaming_dags/
	- https://www.reddit.com/r/Clojure/comments/wo43rw/clojure_single_codebase/
	- network unreliability https://www.reddit.com/r/Clojure/comments/vizdcc/hyperfiddlephoton_progress_update/
	- https://www.reddit.com/r/Clojure/comments/11ot83k/libraries_that_join_front_and_back_end/
	- https://www.reddit.com/r/Clojure/comments/wejzdt/hyperfiddle_compiler_managed_network_connections/
	- https://fullctxdev.substack.com/p/weekly-tech-hype-4