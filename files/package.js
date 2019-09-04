module.exports = (project,description,author) => (
     {
	      "name": project,
		  "version": "1.0.0",
		  "description": description,
		  "main": "index.js",
		  "scripts": {
		    "test": "echo \"Error: no test specified\" && exit 1"
		  },
		  "author": author,
		  "license": "ISC",
		  "dependencies": {
		    "body-parser": "*",
		    "cors": "*",
		    "express": "*",
		    "mongoose": "*",
		    "nodemailer": "*",
		    "bcrypt": "*",
		    "jsonwebtoken": "*",
		    "http-errors":"*"
		  }
	}
)