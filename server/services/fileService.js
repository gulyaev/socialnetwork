const fs = require("fs");
const db = require("../db");
const config = require("config");

class fileService {
  createDir(file) {
    var filePath = "";

    filePath = `${config.get("filePath")}/${file.person_id}/${file.path}`;

    console.log("filePath " + filePath);

    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath);
          return resolve({ message: "File was created" });
        } else {
          return reject({ message: "File allready exists" });
        }
      } catch (error) {
        console.log(error);
        return reject({ message: "File error" });
      }
    });
  }
}

module.exports = new fileService();
