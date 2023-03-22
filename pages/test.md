publish:: false

- ```cljs :results
  ^:hiccup [:div {:style {:color "blue"}} "Woot"]
  ```
- {renderer: :dustin}
- @@html: <b>hi</b>@@
- @@html: <query-portal /> @@
- [:b "hello"]
	- [:div {:is "query-portal"}] `user/two-clocks
- @@html: <div is="query-portal" /> @@
-
-