import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from '../components/Footer/Footer';

import './styles/styles.css';
import './styles/animations.css';
import './utilities/helperFuncs';

export default function App() {

	return (<>
		<Header />
			<main>
				<Outlet />
			</main>
		<Footer />
		</>
	);	  
}