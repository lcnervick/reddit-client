import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from '../components/Footer/Footer';

import './styles/styles.css';

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