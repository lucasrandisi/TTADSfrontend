//@ts-nocheck
import React, { useState, useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import {
	ApolloClient,
	NormalizedCacheObject,
	ApolloProvider,
	InMemoryCache,
} from "@apollo/client";
import { ToastContainer } from "react-toastify";
import * as serviceWorker from "./serviceWorker";
import Pages from "./Router";
import "./styles/app.css";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "./utils/token";
import AuthContext from "./context/authContext";

import Auth from "./auth";

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
	cache: new InMemoryCache(),
	uri: "http://localhost:4000/graphql",
	resolvers: {},
});

function App() {
	const [auth, setAuth] = useState("");

	useEffect(() => {
		const token = getToken();
		if (!token) {
			setAuth("");
		} else {
			setAuth(token);
		}
	}, []);

	const logout = () => {};

	const setUser = user => {
		setAuth(user);
	};

	const authData = useMemo(
		() => ({
			auth,
			logout,
			setUser,
		}),
		[auth]
	);

	return (
		<ApolloProvider client={client}>
			<AuthContext.Provider value={authData}>
				{!auth ? (
					<Auth />
				) : (
					<Pages />
				)}
				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar
					newestOnTop
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="colored"
				/>
			</AuthContext.Provider>
		</ApolloProvider>
	);
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
