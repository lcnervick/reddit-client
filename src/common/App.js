import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import ROUTES from './routes/routes';

export default function App() {
	return (<>
		<h1>Hello, World!</h1>

		<Router>
			<nav className="navigation">
				<ul>
				<li>
					<NavLink to={ROUTES.books()}>
					Books
					</NavLink>
				</li>
				<li>
					<NavLink to={ROUTES.movies()}>
					Movies
					</NavLink>
				</li>
				<li>
					<NavLink to={ROUTES.songs()}>
					Songs
					</NavLink>
				</li>
				</ul>
			</nav>
		</Router>
		</>
	);	  
}