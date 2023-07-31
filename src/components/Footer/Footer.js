import React from 'react';
import './Footer.css';

export default function Footer() {
	const toTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
	return (
		<footer>
			<div>by Leif Nervick | Synaptic Software</div>
			<div id="backToTop" onClick={toTop}>
				<div className='toTopArrow'></div>
				<div className='toTopText'>To Top</div>
			</div>
		</footer>
	)
}