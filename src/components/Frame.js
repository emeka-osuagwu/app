import React, { Component, ReactDOM } from 'react';

import { Stage, Layer, Rect, Text, Image, Group } from 'react-konva';
import Konva from 'konva';
import ReactCrop from 'react-image-crop';
import SweetAlert from 'react-bootstrap-sweetalert';
import "react-image-crop/dist/ReactCrop.css";

import words from '../config/words.json'
import aws from 'aws-sdk';
import aws_config from '../config/aws.json'

import Loader from 'react-loader-spinner'

import {
	FacebookIcon,
	TwitterIcon,
	TelegramIcon,
	WhatsappIcon,
	GooglePlusIcon,
	LinkedinIcon,
	PinterestIcon,
	VKIcon,
	OKIcon,
	RedditIcon,
	TumblrIcon,
	LivejournalIcon,
	MailruIcon,
	ViberIcon,
	WorkplaceIcon,
	EmailIcon,
	FacebookShareButton,
	GooglePlusShareButton,
	LinkedinShareButton,
	TwitterShareButton,
	TelegramShareButton,
	WhatsappShareButton,
	PinterestShareButton,
	VKShareButton,
	OKShareButton,
	RedditShareButton,
	TumblrShareButton,
	LivejournalShareButton,
	MailruShareButton,
	ViberShareButton,
	WorkplaceShareButton,
	EmailShareButton,
} from 'react-share';

import cooked from "../assets/images/cooked.png"
import mobile_header from "../assets/images/maggi_mobile.png"

import boss_lady from "../assets/images/boss_lady.jpg"
import caregiver from "../assets/images/caregiver.jpg"
import insert_text_image from "../assets/images/insert_text.jpg"
import chief_enjoyment_officer from "../assets/images/chief_enjoyment_officer.jpg"
import family_magnet from "../assets/images/family_magnet.jpg"
import oga_madam from "../assets/images/oga_madam.jpg"
import slayer from "../assets/images/slayer.jpg"
import ultimate_foodie from "../assets/images/ultimate_foodie.jpg"

aws.config.update(aws_config);

class Frame extends Component {

	constructor(props) {
		super(props);

		this.state = {
			profile_text: null,
			canvas_image: null,
			canvas_text_color: 'red',
			brand_logo: null,
			cardOneinnerHeight: null,
			cardOneinnertWidth: null,
			cardTwoinnerHeight: null,
			cardTwoinnertWidth: null,
			show_caption_input: false,
			new_caption: null,
			src: null,
			crop: {
				x: 10,
				y: 10,
				aspect: 1,
				height: 80
			},
			words: [],
			uploaded_url: '',
			share_caption: "How do you make a difference? Get your frame and let us know! www.SheMakesADifferenceFrames.com #SheMakesADifference.",
			show_social_icons: false,
			show_loader: false
		};

	  	this.cardElement1 = React.createRef();
	  	this.cardElement2 = React.createRef();
	  	this.imageElement = React.createRef();
	  	
	  	this.cardFliterElement1 = React.createRef();
	  	this.cardFliterElement2 = React.createRef();
	  	this.cardFliterElement3 = React.createRef();
	  	this.cardFliterElement4 = React.createRef();
	  	this.cardFliterElement5 = React.createRef();
	  	this.cardFliterElement6 = React.createRef();
	  	this.cardFliterElement7 = React.createRef();
	  	this.cardFliterElement8 = React.createRef();
	}

	componentWillMount() {

		window.addEventListener("orientationchange", function(screen) {
			console.log(screen)
		}, false);

		var arr = []
			for(var i = 0; i<words.Word.length; i++){
			arr.push(this.Ucfirst(words.Word[i].main))
		}
		
		this.setState({
			words: arr
		});

		const image = new window.Image();
		const brand_logo_image = new window.Image();
		
		image.src = boss_lady
		brand_logo_image.src = cooked
		
		image.onload = () => {
			this.setState({
				canvas_image: image,
				profile_text: "Boss Lady",
				brand_logo: brand_logo_image
			});
		};
	}

	componentDidMount() {
		this.setState({
			carOneinnerWidth: this.cardElement1.current.offsetWidth,
			cardOneinnerHeight: this.cardElement1.current.offsetHeight,
			cardTwoinnerWidth: this.cardElement1.current.offsetWidth,
			cardOneinnerHeight: this.cardElement1.current.offsetHeight,

		});

		this.cardFliterElement1.current.classList.add('active')
	}

	getBinary(encodedFile, file) {
		var base64Image = encodedFile.split("data:" + file.type + ";base64,")[1];
		var binaryImg = atob(base64Image);
		var length = binaryImg.length;
		var ab = new ArrayBuffer(length);
		var ua = new Uint8Array(ab);
		
		for (var i = 0; i < length; i++) {
			ua[i] = binaryImg.charCodeAt(i);
		}

		var blob = new Blob([ab], {
			type: "image/jpeg"
		});

		return ab;
	}

	// uploadImage(e) {
	// 	e.preventDefault();

	// 	let reader = new FileReader();
	// 	let file = e.target.files[0];

	// 	let image = new window.Image();
	// 	image.src = URL.createObjectURL(file)

	// 	image.onload = () => {
	// 		this.setState({
	// 			canvas_image: image,
	// 		});
	// 	};
	// }

	uploadImage(e) {

		this.setState({
			show_loader: false,
			show_social_icons: false
		})

		e.preventDefault();

		let reader = new FileReader();
		let file = e.target.files[0];
		let image = new window.Image();
		
		image.src = URL.createObjectURL(file)
		
		image.onload = () => {
			
			this.setState({
				canvas_image: image
			});
		
			reader.onloadend = () => {

				this.setState({}, function(){

					if(this)
						image.src = URL.createObjectURL(file);

						let rekognition = new aws.Rekognition();

						var params = {
							Image: {
								Bytes:this.getBinary(reader.result, file),
							},
						};

						rekognition.detectFaces(params, function(err, data) {
							if (data.FaceDetails.length) {

								const image = new window.Image();
								
								image.src = URL.createObjectURL(file)

								image.onload = () => {
									this.setState({
										canvas_image: image
									});
								};
							}
							else{
								var image = new window.Image();
								
								image.src = boss_lady
								
								image.onload = () => {
									this.setState({
										canvas_image: image,
										profile_text: "Boss Lady"
									});

								};
							}
						}.bind(this));

						rekognition.detectModerationLabels(params, function(err, data) {
							console.log(data)

							if (data.ModerationLabels.length) {

								var image = new window.Image();
								
								image.src = boss_lady
								
								image.onload = () => {
									console.log(image)
									this.setState({
										canvas_image: image,
										profile_text: "Boss Lady"
									});
								};

							}
							else{

							}

						}.bind(this));
				})
			}

			console.log(this.state.verified, "fjhvdfjhvdjfhvdjfhd")

			reader.readAsDataURL(file)
			image.onload = () => {

			this.setState({
			image: image,file:file,screen_width:this.width,screen_height:this.height
			});

			};
		};
	}

	shareImage() {
		this.setState({
			show_loader: true
		})

		var image = this.stageRef.getStage().toDataURL({mimeType: 'image/png', quality: 1.0});
		
		let formData = new FormData();
		formData.append('image', image);

		fetch("http://localhost:5000", {
			method: 'POST',
			body: formData
		})
		.then(res => res.json())
		.then(res => {
			console.log(res)
			if (res.status == "200") {
				this.setState({
					uploaded_url: res.data.url,
					show_social_icons: true,
					show_loader: false
				})				
			}
			else{
				alert('image upload error, please try again')
			}
		})
		.catch(error => {
			console.log(error, "error")
		})
	}

	onSelectFile = e => {
		if (e.target.files && e.target.files.length > 0) {
			const reader = new FileReader();
			
			reader.addEventListener("load", () =>
				this.setState({ src: reader.result })
			);
			
			reader.readAsDataURL(e.target.files[0]);
		}
	};

	onImageLoaded = (image, pixelCrop) => {
		this.imageRef = image;
	};

	onCropComplete = async (crop, pixelCrop) => {
		const croppedImageUrl = await this.getCroppedImg(this.imageRef, pixelCrop, "newFile.jpeg");
		this.setState({ croppedImageUrl });
	};

	onCropChange = crop => {
		this.setState({ crop });
	};

	getCroppedImg(image, pixelCrop, fileName) {
		const canvas = document.createElement("canvas");
		canvas.width = pixelCrop.width;
		canvas.height = pixelCrop.height;
		const ctx = canvas.getContext("2d");

		ctx.drawImage(
			image,
			pixelCrop.x,
			pixelCrop.y,
			pixelCrop.width,
			pixelCrop.height,
			0,
			0,
			pixelCrop.width,
			pixelCrop.height
		);

		return new Promise((resolve, reject) => {
			canvas.toBlob(file => {
			file.name = fileName;
			window.URL.revokeObjectURL(this.fileUrl);
			this.fileUrl = window.URL.createObjectURL(file);
			resolve(this.fileUrl);
			}, "image/jpeg");
		});
	}

	Ucfirst(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	handleDownload(){
		var image = this.stageRef.getStage().toDataURL({mimeType: 'image/png', quality: 1.0})
		var url = image.replace(/^data:image\/[^;]+/, 'data:application/');
		this.setState({download:url})
	}

	switchFrame(event, image_url, profile){

		let image = new window.Image();

		image.src = image_url

		image.onload = () => {
			this.setState({
				canvas_image: image,
				profile_text: profile
			});
		};

		this.cardFliterElement1.current.classList.remove('active')
		this.cardFliterElement2.current.classList.remove('active')
		this.cardFliterElement3.current.classList.remove('active')
		this.cardFliterElement4.current.classList.remove('active')
		this.cardFliterElement5.current.classList.remove('active')
		this.cardFliterElement6.current.classList.remove('active')
		this.cardFliterElement7.current.classList.remove('active')
		this.cardFliterElement8.current.classList.remove('active')
		
		event.target.classList.add('active')

		if (profile == "Insert Text") {
			this.setState({
				show_caption_input: true
			})
		}
		else{
			this.setState({
				show_caption_input: false
			})	
		}
	}

	switchTextColor(color){
		this.setState({
			canvas_text_color: color
		});
	}

	renderLoader(){
		if (this.state.show_loader) {
			return (
				<div className="loader_con">
					<Loader type="ThreeDots" color="red" height={80} width={80} />
				</div>
			)
		}
	}

	renderImage(){
		return <Image image={this.state.canvas_image} width={this.state.carOneinnerWidth} height={this.state.cardOneinnerHeight} />;
	}

	updateCaption(e){
		this.setState({profile_text:this.Ucfirst(e.target.value)},function(){
			for(var i=0; i<this.state.profile_text.split(" ").length; i++){
				if(this.state.words.includes(this.Ucfirst(this.state.profile_text.split(" ")[i])))
				{
					alert('Invalid keyword detected')
					this.setState({
						profile_text: ""
					})
				}
				else
				{
					console.log('good')
				}
			}
		})
	}

	renderBrandLogoImage(){
		return <Image image={this.state.brand_logo} ref={this.imageElement} width={this.state.carOneinnerWidth - 100} height={150} y={this.state.cardOneinnerHeight - 170} x={60} />;
	}

	renderHashTagText(){
		return <Text text={'#SheMakesADifference'}
			fontSize={20}
			fill={this.state.canvas_text_color}
			fontFamily={'Hand_Of_Sean'}
			shadowOffsetX={2}
			shadowOffsetY={2}
			x={10}
			y={this.state.cardOneinnerHeight - 100}
			shadowEnabled={true}
			shadowColor={'white'}
		/>
	}

	renderProfileText(text){
		return <Text 
			text={this.state.profile_text} 
			fontSize={42} 
			fill={this.state.canvas_text_color} 
			fontFamily={'Hand_Of_Sean'} 
			shadowOffsetX={2} 
			shadowOffsetY={2} x={10} 
			y={this.state.cardOneinnerHeight - 150}
			shadowEnabled={true}
			shadowColor={'white'}
		/>
	}

	renderFrameFliter(){
		return (
			<div className="btn-toolbar frame_fliter" role="toolbar" aria-label="Toolbar with button groups">
				<div className="btn-group mr-2" role="group" aria-label="First group">
					<button onClick={(event) => this.switchFrame(event, boss_lady, "Boss Lady")} type="button" class="btn btn-secondary frame_fliter_item" ref={this.cardFliterElement1}></button>
					<button onClick={(event) => this.switchFrame(event, caregiver, "Boss Lady")} type="button" class="btn btn-secondary frame_fliter_item" ref={this.cardFliterElement2}></button>
					<button onClick={(event) => this.switchFrame(event, ultimate_foodie, "Ultimate Foodie")} type="button" class="btn btn-secondary frame_fliter_item" ref={this.cardFliterElement3}></button>
					<button onClick={(event) => this.switchFrame(event, slayer, "Slayer")} type="button" class="btn btn-secondary frame_fliter_item" ref={this.cardFliterElement4}></button>
					<button onClick={(event) => this.switchFrame(event, family_magnet, "Family Magnet")} type="button" class="btn btn-secondary frame_fliter_item" ref={this.cardFliterElement5}></button>
					<button onClick={(event) => this.switchFrame(event, oga_madam, "Oga Madam")} type="button" class="btn btn-secondary frame_fliter_item" ref={this.cardFliterElement6}></button>
					<button onClick={(event) => this.switchFrame(event, chief_enjoyment_officer, "Chief_Enjoyment Officer")} type="button" class="btn btn-secondary frame_fliter_item" ref={this.cardFliterElement7}></button>
					<button onClick={(event) => this.switchFrame(event, insert_text_image, "Insert Text")} type="button" class="btn btn-secondary frame_fliter_item" ref={this.cardFliterElement8}></button>
				</div>
			</div>
		)
	}

	renderActionOptions(){
		return (
			<div className="btn-toolbar frame_color_frame_action" role="toolbar" aria-label="Toolbar with button groups">
				<div className="btn-group mr-2" role="group" aria-label="First group">
					<span class="btn btn-secondary frame_action btn-file" onChange={(e) => this.uploadImage(e)}>
					    Upload <input type="file"></input>
					</span>
					<a href={this.state.download} download="maggi.jpeg" onClick={this.handleDownload.bind(this)}>
						<span class="btn btn-secondary frame_action btn-file">
						    Download
						</span>
					</a>
					<button onClick={() => this.shareImage()} type="button" class="btn btn-secondary frame_action">Share</button>
				</div>
			</div>
		)
	}

	renderTextInput(){
		if (this.state.show_caption_input) {
			return (
				<div class="form-group">
					<input value={this.state.profile_text} type="email" onChange={(e)=>{this.updateCaption(e)} } class="form-control profile_input_text" placeholder="Enter Text"></input>
				</div>
			)
		}
	}

	renderColorFliter(){
		return (
			<div className="btn-toolbar frame_color_fliter_con" role="toolbar" aria-label="Toolbar with button groups">
				<div className="btn-group mr-2" role="group" aria-label="First group">
					<button onClick={() => this.switchTextColor("red")} type="button" class="btn btn-secondary frame_color_fliter red"></button>
					<button onClick={() => this.switchTextColor("yellow")} type="button" class="btn btn-secondary frame_color_fliter yellow"></button>
					<button onClick={() => this.switchTextColor("black")} type="button" class="btn btn-secondary frame_color_fliter black"></button>
				</div>
			</div>
		)
	}

	renderCanvas(){
		return (
			<Stage width={this.state.carOneinnerWidth - 40} height={this.state.cardOneinnerHeight - 40} ref={node => { this.stageRef = node}}>
			  <Layer width={this.state.carOneinnerWidth} height={this.state.cardOneinnerHeight}>
			  	{this.renderImage()}
			  	{this.renderProfileText('Boss Lady')}
			  	{this.renderHashTagText()}
			  	{this.renderBrandLogoImage()}
			  </Layer>
			</Stage>
		)
	}

	renderMobileCanvas(){
		return (
			<Stage width={this.state.carOneinnerWidth} height={this.state.cardOneinnerHeight - 40} ref={node => { this.stageRef = node}}>
			  <Layer width={this.state.carOneinnerWidth} height={this.state.cardOneinnerHeight}>
			  	{this.renderImage()}
			  	{this.renderProfileText('Boss Lady')}
			  	{this.renderHashTagText()}
			  	{this.renderBrandLogoImage()}
			  </Layer>
			</Stage>
		)
	}

	renderCardHeader(){
		return (
			<div>
				<div class="card-header d-none d-lg-block">
				  	<div className="row">
				  		<div className="col-12 col-md-12">
				  			<div className="col col-12 header_text_con header_lead_text_con">
				  				<h1 className="header_lead_text">HOW DO YOU MAKE</h1>
				  				<h1 className="header_lead_text">A diffrence?</h1>
				  			</div>
				  			<div className="col col-12 header_text_con">
				  				<span className="header_sub_text">pick a frame, insert your</span>
				  				<span className="header_sub_text">picture and share it using</span>
				  			</div>
				  			<div className="col col-12 header_text_con">
								<span className="header_sub_text header_sub_text--hashtag">#SheMakesADifference</span>
				  			</div>
				  		</div>
				  	</div>
				</div>

				<div class="card-header--mobile d-block d-sm-none">
					<div className="row">
						<img className="mobile_header_image" src={mobile_header} class="img-fluid" alt="Responsive image"></img>
					</div>
				</div>
			</div>
		)
	}

	renderSocialIcons(){
		if (this.state.show_social_icons) {
			return (
				<div className="row">
					<div className="col col-12 social_button_con">
						<div class="btn-group" role="group" aria-label="Basic example">
							<button type="button" class="btn social_btn_btn_con">
								<FacebookShareButton
									url={this.state.uploaded_url}
									quote={this.state.share_caption}
									className="Demo__some-network__share-button">
									<FacebookIcon
									size={32}
									round 
								/>
								</FacebookShareButton>
							</button>
							<button type="button" class="btn social_btn_btn_con">
								<WhatsappShareButton
									url={this.state.uploaded_url}
									quote={this.state.share_caption}
									className="Demo__some-network__share-button">
									<WhatsappIcon
									size={32}
									round 
								/>
								</WhatsappShareButton>
							</button>
							<button type="button" class="btn social_btn_btn_con">
								<TwitterShareButton
									url={this.state.uploaded_url}
									quote={this.state.share_caption}
									className="Demo__some-network__share-button">
									<TwitterIcon
									size={32}
									round 
								/>
								</TwitterShareButton>
							</button>
						</div>
					</div>
				</div>
			)
		}
	}

	render() {
		const { croppedImageUrl } = this.state;
		return (
			<div class="row">
				<div class="card col-12 col-md-3 offset-md-1 frame_container">
					{this.renderCardHeader()}

					<div class="card-body d-none d-lg-block" ref={this.cardElement1}>
						{this.renderCanvas()}
					</div>

					<div class="card-footer text-muted">
						{this.renderTextInput()}
						{this.renderFrameFliter()}
						{this.renderColorFliter()}
						{this.renderActionOptions()}
						{this.renderSocialIcons()}
						{this.renderLoader()}
					</div>
				</div>
			</div>
		);
	}
}

export default Frame;
