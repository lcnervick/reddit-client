import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import ROUTES from './routes/routes';

import './styles/styles.css';

import Header from "../components/Header/Header";
import Footer from '../components/Footer/Footer';

export default function App() {
	return (<>
		<Header />

		<Footer />
		</>
	);	  
}