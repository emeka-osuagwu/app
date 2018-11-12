import React, { Component } from 'react';

import Frame from "./Frame"
import Header from "./Header"
import Footer from "./Footer"

import background_image from "../assets/images/background.png"

class App extends Component {
	render() {
		return (
			<div>
				<Header />
				<div className="main_body" style={{backgroundImage: `url(${background_image})`}}>
					<Frame />
				</div>
			</div>
		);
	}
}

export default App;
