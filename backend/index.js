/* eslint-disable */
const express = require("express");
const fs = require("fs");
var path = require("path");
const cors = require("cors");

const drivelist = require('drivelist');

const DARWIN = process.platform === 'darwin'

const app = express();
const port = 3001;
app.use(cors());

app.get("/os", (req, res) => {
    res.send(process.platform);
});

app.get("/ls/:dir", (req, res) => {
    let directory = req.params.dir;

    if (DARWIN) {
        directory = '/Volumes/' + directory
    }

    res.send(getFileInfoFromFolder(directory));
});

app.get("/ls", (req, res) => {
    res.send(getFileInfoFromFolder(""));
});

app.get("/locations", async (req, res) => {
    // MAC OS
    if (DARWIN) {
        const locations = fs.readdirSync("/Volumes", "utf8");
        res.send(locations.map(location => ({
            label: location,
            drive: location
        })));
    } else {
        // WINDOWS
        let drives = await drivelist.list();
        res.send(drives.map(drive => ({
            label: drive.description,
            drive: drive.mountpoints[0].path
        })));
    }
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
        const filePath = path.join(route, file);
        if (isUnixHiddenPath(filePath)) {
            response.push({ name: file, extension: "hidden", fileSizeInBytes: "--", isFolder: false });
        } else {
            const filePath = path.join(route, file);
            const extension = path.extname(filePath);
            let stats = {
                size: '?',
                isDirectory: () => '?'
            };
            
            try {
                stats = fs.statSync(filePath);
            } catch {
                console.log('error getting file info for file: ' + file)
            }
            
            const fileSizeInBytes = stats.size;
            const isFolder = stats.isDirectory();
            response.push({ name: file, extension, fileSizeInBytes: isFolder ? "--" : fileSizeInBytes, isFolder });
        }
    }
    return response;
  };
/* eslint-enable */