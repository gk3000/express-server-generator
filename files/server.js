module.exports = project => (
   `const express  = require('express')
	const app      = express()
	const mongoose = require('mongoose')
	const port     = process.env.PORT || 8080
	const cors     = require('cors') 
	//==========================================================================
	const bodyParser = require('body-parser')
	app.use(bodyParser.urlencoded({extended: true}))
	app.use(bodyParser.json())
	//==========================================================================
	//=============== CHANGE THE NAME OF THE DATABASE ==========================
	//==========================================================================
	mongoose.connect('mongodb://127.0.0.1/database_name_here', { useNewUrlParser: true },()=>{
	    console.log('connected to mongodb')
	})
	//==========================================================================
	app.use(cors())
	//==========================================================================
	app.use('/test',require('./routes/routes.test.js'))
	//==========================================================================
	app.listen(port,()=>{
	    console.log('server running on port : ' +  port)
	})`
)