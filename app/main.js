// Allow console for reporting global errors
/* eslint no-console: 0 */

import React from "react";
import {render} from "react-dom";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {AppProvider} from "./context/AppContext";
import withHeader from "./components/Page";
import Login from "./components/Login";
import PageHome from "./components/PageHome";
import PageNotFound from "./components/PageNotFound";
import config from "./datas/config";
import Array from "./components/Array";
import AuthRoute from "./routes/AuthRoutes";

const mountNode = document.getElementById("root");

const App = () => {
	const {math, info} = config;
	const PageMath = () => withHeader(math)(Array);
	const PageInfo = () => withHeader(info)(Array);
	const PageLogin = () => withHeader(null)(Login);
	
	return (
		<BrowserRouter>
			<div>
				<Switch>

					<AuthRoute type="private" exact path="/mathematiques">
						<PageMath />
					</AuthRoute>
					<AuthRoute type="private" exact path="/informatique">
						<PageInfo />
					</AuthRoute>
					<AuthRoute type="guest" exact path="/">
						<PageLogin />
					</AuthRoute>
					<Route component={PageNotFound} />
				</Switch>
			</div>
		</BrowserRouter>
	);
};

/**
 * Check locale setup and start application given contexts providers and bootstrap tasks.
 *
 * @name main
 * @return {void}
 */
const main = () => {
	// Create webapp and attach to element
	render(
		<AppProvider>
			<App />
		</AppProvider>,
		mountNode
	);
};

// Start it up
main();
