const path = require("path");
const fs = require("fs");

const jsonDirPath = path.join(process.cwd(), "output", "properties");

function setImgLink(dirPath, link) {
  const jsonsInDir = fs.readdirSync(dirPath);

  jsonsInDir.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    jsonReader(fullPath, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        data.image = `${link}/${file}.png`;
        fs.writeFile(fullPath, JSON.stringify(data, null, 2), (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  });
}

function jsonReader(filePath, cb) {
  fs.readFile(filePath, "utf-8", (err, fileData) => {
    if (err) {
      return cb && cb(err);
    }
    try {
      const object = JSON.parse(fileData);
      return cb && cb(null, object);
    } catch (err) {
      return cb && cb(err);
    }
  });
}

setImgLink(
  jsonDirPath,
  "https://gateway.pinata.cloud/ipfs/QmUZjyFc4hGVmmgJ7m3fubWnenDCAQoRTZUg1zvZU8yK2p",
);
