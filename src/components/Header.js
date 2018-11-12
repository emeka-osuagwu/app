import React, { Component } from 'react';
import logo from "../assets/images/logo.png"
class Header extends Component {
	render() {
		return (
		<div className="page_header">
			<img src={logo} className="header_image d-none d-lg-block"></img>
			<ul class="nav justify-content-end">
				<li class="nav-item">
					<a class="nav-link">#SheMakesADifference</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="https://www.facebook.com/MaggiNigeria/" target="_blank">
						<i className="fa  fa-facebook-square"></i>
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="https://twitter.com/maggi_nigeria" target="_blank">
						<i className="fa  fa-twitter-square"></i>
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="https://www.instagram.com/maggi_nigeria/" target="_blank">
						<i className="fa  fa-instagram"></i>
					</a>
				</li>
			</ul>
		</div>
		);
	}
}

export default Header;
