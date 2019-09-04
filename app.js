const fs       = require('fs')
const readline = require('readline')
const rl = readline.createInterface({
  input  : process.stdin,
  output : process.stdout
})

const package = require('./files/package.js')
const server  = require('./files/server.js')
const user_route = require('./files/routes/routes.test.js')
const user_controller = require('./files/controllers/controllers.test.js')
const user_model = require('./files/models/models.test.js')
//==========================================================================================
//==========================================================================================
//==========================================================================================
const init = () => {
  rl.question('Do you want to create a new express project, if yes wich name do you want to use? ', (project) => {
    if(project === 'not')return rl.close()
    if(fs.existsSync(`./${project}`) ){ console.log(`Project ${project} already exist`);return rl.close()} 
    rl.question('Give a little description of your project? ', (description) => {
        rl.question('Who is the author of the project? ', (author) => {	 
              fs.mkdirSync(`./${project}`)  
              json(project,description,author)
       });
    });
  });
}
init() 
//==========================================================================================
//==========================================================================================
//==========================================================================================
const json = (project,description,author) => { 
    fs.writeFile(`./${project}/package.json`, JSON.stringify(package(project,description,author),null,2) , (err) => {
	    if (err) throw err;
	    fs.mkdirSync(`./${project}/models`)
	    fs.mkdirSync(`./${project}/controllers`)
	    fs.mkdirSync(`./${project}/routes`)
	    fs.mkdirSync(`./${project}/helpers`)
        index(project)
	}); 
}
//==========================================================================================
//==========================================================================================
//==========================================================================================
const index = project => {
    fs.writeFile(`./${project}/index.js`, server(project) , (err) => {
        if (err) throw err;
        route(project)
    })
}
//==========================================================================================
//==========================================================================================
//==========================================================================================
const route = project => {
	fs.writeFile(`./${project}/routes/routes.test.js`, user_route(project) , (err) => {
        if (err) throw err;
        controller(project)
    })
}
//==========================================================================================
//==========================================================================================
//==========================================================================================
const controller = project => {
	fs.writeFile(`./${project}/controllers/controllers.test.js`, user_controller(project) , (err) => {
        if (err) throw err;
        model(project)
    })
}
//==========================================================================================
//==========================================================================================
//==========================================================================================
const model = project => {
	fs.writeFile(`./${project}/models/models.test.js`, user_model() , (err) => {
        if (err) throw err;
        ignore(project)
    })
}
//==========================================================================================
//==========================================================================================
//==========================================================================================
const ignore = project => {
  fs.writeFile(`./${project}/.gitignore`, '', (err) => {
        if (err) throw err;
        config(project)
    })
}
//==========================================================================================
//==========================================================================================
//==========================================================================================
const config = project => {
	fs.writeFile(`./${project}/config.js`, `module.exports = {}` , (err) => {
        if (err) throw err;
        console.log('files created')
        rl.close()
    })
}