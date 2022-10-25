//@ts-nocheck
import React, { useState, useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import {
	ApolloClient,
	NormalizedCacheObject,
	ApolloProvider,
	InMemoryCache,
	HttpLink,
	ApolloLink,
	concat
} from "@apollo/client";
import { ToastContainer } from "react-toastify";
import * as serviceWorker from "./serviceWorker";
import Pages from "./Router";
import "./styles/app.css";
import "react-toastify/dist/ReactToastify.css";
import { getToken, decodeToken } from "./utils/token";
import AuthContext from "./context/authContext";

import Auth from "./auth";

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });
const authMiddleware = new ApolloLink((operation, forward) => {
	// add the authorization to the headers
	operation.setContext(({ headers = {} }) => ({
	  headers: {
		...headers,
		token: getToken() || null,
	  }
	}));
  
	return forward(operation);
  })

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
	cache: new InMemoryCache(),
	resolvers: {},
	link: concat(authMiddleware, httpLink),
});

function App() {
	const [auth, setAuth] = useState(null);

	useEffect(() => {
		const token = getToken();
		if (!token) {
			setAuth("");
		} else {
			setAuth(decodeToken(token));
		}
    }, []);
    
    // if (!auth) {
    //     return null;
    // }

	return (
		<ApolloProvider client={client}>
			<AuthContext.Provider value={{auth, setAuth}}>
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
