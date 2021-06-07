import React, { useEffect, useState } from "react";

import { Grid } from "@material-ui/core";
import FileWindow from "./components/FileWindow";
import FileList from "./components/FileList";
import LeftSideBar from "./components/LeftSideBar";
import Header from "./components/Header";

const fileApi = "http://localhost:3001/";

const FileBrowser = () => {
    const [currentFiles, setCurrentFiles] = useState([]);
    const [currentDirectory, setCurrentDirectory] = useState("/");

    const [history, setHistory] = useState(["/"]);
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
        setHistory(prev => [newDirectory, ...prev]);
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

    return <FileWindow>
        <LeftSideBar locations={locations} onLocationClick={location => changeDirectory("/Volumes/" + location.drive)}/>
        <Grid item xs={9}>
            <Header
                currentDirectory={currentDirectory}
                previousEnabled={history.length > currentIndex + 1}
                nextEnabled={currentIndex > 0 && history.length > 0}
                onPreviousClick={onPreviousClick}
                onNextClick={onNextClick}
            />
            <FileList files={currentFiles} onFileClick={onFileClick} />
        </Grid>
    </FileWindow>;
};


export default FileBrowser;