import React, { useEffect, useState } from "react";

import FileBrowser from "react-file-browser-component";

const fileApi = "http://localhost:3001/";

const initalDirectory = "/";

function pathJoin(parts, sep){
    var separator = sep || "/";
    var replace   = new RegExp(separator+"{1,}", "g");
    return parts.join(separator).replace(replace, separator);
 }

const ExampleFileBrowser = () => {
    const [currentFiles, setCurrentFiles] = useState([]);
    const [currentDirectory, setCurrentDirectory] = useState(initalDirectory);

    const [history, setHistory] = useState([initalDirectory]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [locations, setLocations] = useState([]);

    useEffect(() => {
        fetch(fileApi + "ls/" + encodeURIComponent(currentDirectory)).then(res => 
            res.json().then(jsonRes => {
                setCurrentFiles(() => jsonRes.map(file => ({ ...file, kind: file.isFolder ? "Folder" : "Document", size: file.size || file.fileSizeInBytes })));
            }));
    }, [currentDirectory]);

    useEffect(() => {
        fetch(fileApi + "locations").then(res => res.json().then(jsonRes => {
            console.log({ jsonRes });
            setLocations(jsonRes);
        }));
    }, []);


    const onFileClick = (file) => {
        if (file.isFolder) {
            const nextDirectory = pathJoin([currentDirectory, file.name]) + "/";
            changeDirectory(nextDirectory);
        } else {
            console.log("file click", file);
        }
    };

    const changeDirectory = (newDirectory) => {
        setCurrentDirectory(newDirectory);
        setHistory((prev) => [newDirectory, ...prev.slice(currentIndex)]);
        setCurrentIndex(0);
    };

    const onPreviousClick = () => {
        setCurrentDirectory(history[currentIndex + 1]);
        setCurrentIndex(currentIndex + 1);
    };

    const onNextClick = () => {
        setCurrentDirectory(history[currentIndex - 1]);
        setCurrentIndex(currentIndex - 1);
    };

    return <FileBrowser
        currentDirectory={currentDirectory}
        currentFiles={currentFiles}
        locations={locations}
        nextEnabled={currentIndex > 0 && history.length > 0}
        onFileClick={onFileClick}
        onLocationClick={location => changeDirectory(location.drive)}
        onNextClick={onNextClick}
        onPreviousClick={onPreviousClick}
        previousEnabled={history.length > currentIndex + 1}
    />;
};


export default ExampleFileBrowser;