import React, { useEffect, useState } from "react";

import FileBrowser from "react-file-browser-component";

const fileApi = "http://localhost:3001/";

const initalDirectory = "/";

const ExampleFileBrowser = () => {
    const [currentFiles, setCurrentFiles] = useState([]);
    const [currentDirectory, setCurrentDirectory] = useState(initalDirectory);

    const [history, setHistory] = useState([initalDirectory]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [locations, setLocations] = useState([]);

    useEffect(() => {
        fetch(fileApi + "ls/" + encodeURIComponent(currentDirectory)).then(res => 
            res.json().then(jsonRes => {
                setCurrentFiles(() => jsonRes.map(file => ({ ...file, kind: file.isFolder ? "Folder" : "Document" })));
            }));
    }, [currentDirectory]);

    useEffect(() => {
        fetch(fileApi + "locations").then(res => res.json().then(jsonRes => {
            setLocations(jsonRes.map(location => ({ label: location, drive: location })));
        }));
    }, []);


    const onFileClick = (file) => {
        if (file.isFolder) {
            const nextDirectory = currentDirectory + file.name + "/";
            changeDirectory(nextDirectory);
        }
    };

    const changeDirectory = (newDirectory) => {
        setCurrentDirectory(newDirectory);

        if (currentIndex > 0) {
            setHistory(() => [newDirectory, initalDirectory]);
        } else {

        setHistory(prev => [newDirectory, ...prev]);
        }
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
        onLocationClick={location => changeDirectory("/Volumes/" + location.drive)}
        onNextClick={onNextClick}
        onPreviousClick={onPreviousClick}
        previousEnabled={history.length > currentIndex + 1}
    />;
};


export default ExampleFileBrowser;