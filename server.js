const path = require( 'path' );
const express = require( 'express' );
const formData = require('express-form-data')
const cloudinary = require('cloudinary');
const bodyParser = require( 'body-parser' );
const cors = require('cors')

const router = express.Router();
const app = express();
app.use(formData.parse())

cloudinary.config({ 
	cloud_name: 'arm', 
	api_key: '169264285654842', 
	api_secret: 'M_8S1mNBX_Q4s8KCUrCJDk4wI0g' 
});

/**
 * Configure the middleware.
 * bodyParser.json() returns a function that is passed as a param to app.use() as middleware
 * With the help of this method, we can now send JSON to our express application.
 */
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );
app.use(cors({ 
	origin: process.env.CLIENT_ORIGIN || "http://localhost:3000" 
})) 


app.post('/', (req, res) => {

	cloudinary.v2.uploader.upload(req.body.image)
	.then( data => {
		var response = {
			status: 200,
			data
		}
		return res.json(response);
	})
	.catch( error => {

		var response = {
			status: 400,
			error
		}
		return res.json(response);
	})
	
})

// Combine react and node js servers while deploying( YOU MIGHT HAVE ALREADY DONE THIS BEFORE
// What you need to do is make the build directory on the heroku, which will contain the index.html of your react app and then point the HTTP request to the client/build directory

app.use( express.static( 'build' ) );
app.get( '*', ( req, res ) => res.sendFile( path.resolve( __dirname, 'build', 'index.html' ) ) );

app.listen(process.env.PORT || 5000, () => console.log('running ......... 👍'))