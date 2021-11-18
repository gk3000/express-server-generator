module.exports = (project) =>
  `const app      = require('express')()
	const port     = process.env.PORT || 4444 

	app.use(require("express").urlencoded({extended: true}))
	app.use(require("express").json())

  (async function () {
    try {
      await require("mongoose").connect(process.env.MONGO, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });
      console.log("Connected to the DB ✅");
    } catch (error) {
      console.log("ERROR: Your DB is not running, start it up ☢️");
    }
  })();
  
	//==========================================================================
	app.use(require('cors')())
	//==========================================================================
	app.use('/test',require('./routes/routes.js'))
	//==========================================================================
	app.listen(port, () => console.log("🚀 Listening on port: " + port + " 🚀"));`;
