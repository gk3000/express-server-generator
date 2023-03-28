#!/usr/bin/env node

const fs = require("fs");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const package = require("./files/package.js");
const server = require("./files/server.js");
const user_route = require("./files/routes/routes.js");
const user_controller = require("./files/controllers/controllers.js");
const user_model = require("./files/models/models.js");

//===

const init = () => {
  rl.question(
    "Please enter the name of your project or 'no' to stop ",
    (project) => {
      if (project === "no") return rl.close();
      if (fs.existsSync(`./${project}`)) {
        console.log(`Project ${project} already exist`);
        return rl.close();
      }
      rl.question(
        "Give a brief description of your project? ",
        (description) => {
          rl.question("Who is the author of the project? ", (author) => {
            fs.mkdirSync(`./${project}`);
            json(project, description, author);
          });
        }
      );
    }
  );
};
init();

//===

const json = (project, description, author) => {
  fs.writeFile(
    `./${project}/package.json`,
    JSON.stringify(package(project, description, author), null, 2),
    (err) => {
      if (err) throw err;
      fs.mkdirSync(`./${project}/models`);
      fs.mkdirSync(`./${project}/controllers`);
      fs.mkdirSync(`./${project}/routes`);
      index(project);
    }
  );
};

//===

const index = (project) => {
  fs.writeFile(`./${project}/index.js`, server(project), (err) => {
    if (err) throw err;
    route(project);
  });
};

//===

const route = (project) => {
  fs.writeFile(`./${project}/routes/routes.js`, user_route(project), (err) => {
    if (err) throw err;
    controller(project);
  });
};

//===

const controller = (project) => {
  fs.writeFile(
    `./${project}/controllers/controllers.js`,
    user_controller(project),
    (err) => {
      if (err) throw err;
      model(project);
    }
  );
};

//===

const model = (project) => {
  fs.writeFile(`./${project}/models/models.js`, user_model(), (err) => {
    if (err) throw err;
    env(project);
  });
};

//===

const env = (project) => {
  fs.writeFile(`./${project}/.env`, 'MONGO=mongodb://127.0.0.1/newdatabase\nPORT=4444', (err) => {
    if (err) throw err;
    ignore(project);
  });
};

//===

const ignore = (project) => {
  fs.writeFile(`./${project}/.gitignore`, "", (err) => {
    if (err) throw err;
    rl.close();
    console.log("\x1b[1m","\x1b[32m",
      `\n\n\n🥚 🐣 🐥 🐓 🍗\n\nYou server has been created.\n\nTo start using it do the following:${"\x1b[37m"}\n\n     cd ${project}\n     npm i\n     node index.js ${"\x1b[31m"}OR ${"\x1b[37m"}nodemon\n\n${"\x1b[32m"}Please check .env file to modify the URL of the mongoDB and a PORT variable\n\n${"\x1b[35m"}Happy coding from Barcelona Code School!\n`)
  });
};

