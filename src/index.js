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
import Salle from "./components/Pages/Salle";
import First from "./components/Pages/First";
import Home from "./components/Pages/Home";
import Admin from "./components/Pages/Admin";
import Histo from "./components/Pages/History";
import Virtual from "./components/Pages/Virtual";
import Regulations from "./components/Pages/Regulations";
import Management from "./components/Pages/Management";
import PageNotFound from "./components/PageNotFound";
import AuthRoute from "./routes/AuthRoutes";
import Alertes from "./components/Pages/Alertes";
import Radar from "./components/Pages/Radar";
import { config} from "./datas/config";
import { ErrorBoundary } from 'react-error-boundary'
import ClockHOC from "./context/withClockHOC";
import MobileHOC from "./context/withMobileHOC";
import Back4AppHOC from  "./context/withBack4AppHoc";


import "./index.css";

const mountNode = document.getElementById("root");

const App = () => {


	const { loggedHeaderRadar,loginHeader, loggedHeaderAlertes, loggedHeaderAdmin,   loggedHeaderNotification, loggedHeaderHistory, loggedHeaderVirtual, loggedHeader, loggedHeaderSalle, loggedHeaderManagement, loggedHeaderRegulations } = config;
	const FirstPage = () => withHeaderFooter(null)(First);
	const PageLogin = () => withHeaderFooter(loginHeader)(Login);
	const PageAdmin = () => withHeaderFooter(loggedHeaderAdmin)(Admin);
	const PageHome = () => withHeaderFooter(loggedHeader)(Home);
	const PageSalle = () => withHeaderFooter(loggedHeaderSalle)(Salle);
	const PageManagement = () => withHeaderFooter(loggedHeaderManagement)(Management);
	const PageRegulations = () => withHeaderFooter(loggedHeaderRegulations)(Regulations);
	const PageVR = () => withHeaderFooter(loggedHeaderVirtual)(Virtual);
	const PageHistory = () => withHeaderFooter(loggedHeaderHistory)(Histo);
	const PageAlertes = () => withHeaderFooter(loggedHeaderAlertes)(Alertes);
	const PageRadar = () => withHeaderFooter(loggedHeaderRadar)(Radar);

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
					<AuthRoute type="private" exact path="/history">
						<PageHistory />
					</AuthRoute>
					<AuthRoute type="private" exact path="/vr">
						<PageVR />
					</AuthRoute>
					<AuthRoute type="private" exact path="/salle">
						<PageSalle />
					</AuthRoute>
					<AuthRoute type="private" exact path="/management">
						<PageManagement />
					</AuthRoute>
					<AuthRoute type="private" exact path="/regulations">
						<PageRegulations />
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
					<AuthRoute type="private" exact path="/alertes">
						<PageAlertes />
					</AuthRoute>
					<AuthRoute type="private" exact path="/radar">
						<PageRadar />
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
	
	/*
	const readRecord = () => {
		const Travel = Parse.Object.extend('Travel');
		const query = new Parse.Query(Travel);
		query.find().then(
		  (result) => {
			
			console.log("Travel="+JSON.stringify(result));	
		  },
		  (error) => {console.error(error)}
		);
	  };
	  readRecord(); 
	  */
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
