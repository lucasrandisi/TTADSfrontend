import React from "react";
import ReactDOM from "react-dom";
import {
	ApolloClient,
	NormalizedCacheObject,
	ApolloProvider,
	InMemoryCache,
} from "@apollo/client";

import * as serviceWorker from "./serviceWorker";
import Pages from "./Router";
import "./styles/app.css";

import Auth from "./auth";

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
	cache: new InMemoryCache(),
	uri: "http://localhost:4000/graphql",
	resolvers: {},
});

function App() {
	const auth = false;
	return (
		<ApolloProvider client={client}>
			{!auth ? (
				<Auth />
			) : (
				<div>
					<Pages />
				</div>
			)}
		</ApolloProvider>
	);
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
