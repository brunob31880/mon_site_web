/* eslint-disable import/extensions */
/* eslint-disable react-hooks/exhaustive-deps */
// Allow console for reporting global errors
/* eslint no-console: 0 */

import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import withHeaderFooter from "./components/Page";
import Login from "./components/Pages/Login";
import Phys from "./components/Pages/Phys";
import First from "./components/Pages/First";
import Home from "./components/Pages/Home";
import Admin from "./components/Pages/Admin";
import Math from "./components/Pages/Math";
import Info from "./components/Pages/info";
import Aviation from "./components/Pages/Aviation";
import Management from "./components/Pages/Management";
import PageNotFound from "./components/PageNotFound";
import AuthRoute from "./routes/AuthRoutes";
import Maison from "./components/Pages/Maison";
import Astro from "./components/Pages/Astro";
import { config} from "./datas/config";
import { ErrorBoundary } from 'react-error-boundary'
import ClockHOC from "./context/withClockHOC";
import MobileHOC from "./context/withMobileHOC";
import Back4AppHOC from  "./context/withBack4AppHoc";


import "./index.css";

const mountNode = document.getElementById("root");

const App = () => {


	const { loggedHeaderAstro,loginHeader, loggedHeaderMaison, loggedHeaderAdmin,   loggedHeaderMath, loggedHeaderInfo, loggedHeader, loggedHeaderPhys, loggedHeaderManagement, loggedHeaderAviation } = config;
	const FirstPage = () => withHeaderFooter(null)(First);
	const PageLogin = () => withHeaderFooter(loginHeader)(Login);
	const PageAdmin = () => withHeaderFooter(loggedHeaderAdmin)(Admin);
	const PageHome = () => withHeaderFooter(loggedHeader)(Home);
	const PagePhys = () => withHeaderFooter(loggedHeaderPhys)(Phys);
	const PageManagement = () => withHeaderFooter(loggedHeaderManagement)(Management);
	const PageAviation = () => withHeaderFooter(loggedHeaderAviation)(Aviation);
	const PageInfo = () => withHeaderFooter(loggedHeaderInfo)(Info);
	const PageMath = () => withHeaderFooter(loggedHeaderMath)(Math);
	const PageMaison = () => withHeaderFooter(loggedHeaderMaison)(Maison);
	const PageAstro = () => withHeaderFooter(loggedHeaderAstro)(Astro);

	function ErrorFallback({ error, componentStack, resetErrorBoundary }) {
		return (
			<div role="alert">
				<p>Something went wrong:</p>
				<pre>{error.message}</pre>
				<pre>{componentStack}</pre>
				<button onClick={resetErrorBoundary}>Try again</button>
			</div>
		)
	}

	const [explode, setExplode] = React.useState(false);

	return (
		<ErrorBoundary
			FallbackComponent={ErrorFallback}
			onReset={() => setExplode(false)}
			resetKeys={[explode]}
		>
			<BrowserRouter>
				<Switch>	
					<AuthRoute type="private" exact path="/math">
						<PageMath/>
					</AuthRoute>
					<AuthRoute type="private" exact path="/info">
						<PageInfo />
					</AuthRoute>
					<AuthRoute type="private" exact path="/phys">
						<PagePhys />
					</AuthRoute>
					<AuthRoute type="private" exact path="/management">
						<PageManagement />
					</AuthRoute>
					<AuthRoute type="private" exact path="/aviation">
						<PageAviation />
					</AuthRoute>
					<AuthRoute type="private" exact path="/home">
						<PageHome />
					</AuthRoute>
					<AuthRoute type="guest" exact path="/login">
						<PageLogin />
					</AuthRoute>
					<AuthRoute type="private" exact path="/admin">
						<PageAdmin />
					</AuthRoute>
					<AuthRoute type="guest" exact path="/">
						<FirstPage />
					</AuthRoute>
					<AuthRoute type="private" exact path="/maison">
						<PageMaison />
					</AuthRoute>
					<AuthRoute type="private" exact path="/astro">
						<PageAstro />
					</AuthRoute>
					<Route component={PageNotFound} />
				</Switch>
			</BrowserRouter>
		</ErrorBoundary>
	);
};
async function registerSW() { 
	console.log("Registering PWA");
	if ('serviceWorker' in navigator) { 
	  try {
		await navigator.serviceWorker.register('./sw.js'); 
	  } catch (e) {
		alert('ServiceWorker registration failed. Sorry about that.'); 
	  }
	} else {
	  document.querySelector('.alert').removeAttribute('hidden'); 
	}
  }
/**
 * Check locale setup and start application given contexts providers and bootstrap tasks.
 *
 * @name main
 * @return {void}
 */
const main = () => {
	
	window.addEventListener('load', e => {
		registerSW(); 
	  });
	// Create webapp and attach to element
	render(
		<AppProvider>
			<ClockHOC>
				<MobileHOC>
					<Back4AppHOC>
					<App />
					</Back4AppHOC>
				</MobileHOC>
			</ClockHOC>
		</AppProvider>,
		mountNode
	);
};

// Start it up
main();
