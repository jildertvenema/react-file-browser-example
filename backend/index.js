/* eslint-disable */
const express = require("express");
const fs = require("fs");
var path = require("path");
const cors = require("cors");

const app = express();
const port = 3001;
app.use(cors());

app.get("/ls/:dir", (req, res) => {
    const directory = req.params.dir;
    console.log({directory});
    res.send(getFileInfoFromFolder(directory));
});
app.get("/ls", (req, res) => {
    res.send(getFileInfoFromFolder(""));
});

app.get("/locations", (req, res) => {
    const locations = fs.readdirSync("/Volumes", "utf8");
    res.send(locations);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const isUnixHiddenPath = function (path) {
    return (/(^|\/)\.[^\/\.]/g).test(path);
};

const getFileInfoFromFolder = (route) => {
    const files = fs.readdirSync(route, "utf8");
    const response = [];
    for (let file of files) {
        if (isUnixHiddenPath(file)) {
            response.push({ name: file, extension: "hidden", fileSizeInBytes: "--", isFolder: false });
        } else {
            const filePath = path.join(route, file);
            const extension = path.extname(filePath);
            const stats = fs.statSync(filePath);
            
            const fileSizeInBytes = stats.size;
            const isFolder = stats.isDirectory();
            response.push({ name: file, extension, fileSizeInBytes: isFolder ? "--" : fileSizeInBytes, isFolder });
        }
    }
    return response;
  };
/* eslint-enable */