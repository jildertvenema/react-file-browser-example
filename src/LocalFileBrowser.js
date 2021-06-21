import React, { useEffect, useState } from "react";

import FileBrowser from "react-file-browser-component";
import FileEditor from "./FileEditor";

const fileApi = "http://localhost:3001/";

const initalDirectory = "/";

function pathJoin(parts, sep){
    var separator = sep || "/";
    var replace   = new RegExp(separator+"{1,}", "g");
    return parts.join(separator).replace(replace, separator);
 }

 const fetchPost = async (url, body) => {
    return await fetch(url, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
 };

const ExampleFileBrowser = () => {
    const [currentFiles, setCurrentFiles] = useState([]);
    const [currentDirectory, setCurrentDirectory] = useState(initalDirectory);

    const [history, setHistory] = useState([initalDirectory]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [locations, setLocations] = useState([]);
    const [selectedFile, setSeletedFile] = useState();
    const [fileContent, setFileContent] = useState(false);

    useEffect(() => {
        fetch(fileApi + "ls/" + encodeURIComponent(currentDirectory)).then(res => 
            res.json().then(jsonRes => {
                setCurrentFiles(() => jsonRes.map(file => ({ ...file, kind: file.isFolder ? "Folder" : "Document", size: file.size || file.fileSizeInBytes })));
            }));
    }, [currentDirectory]);

    useEffect(() => {
        fetch(fileApi + "locations").then(res => res.json().then(jsonRes => {
            setLocations(jsonRes);
        }));
    }, []);


    const onFileClick = (file) => {
        if (file.isFolder) {
            const nextDirectory = pathJoin([currentDirectory, file.name]) + "/";
            changeDirectory(nextDirectory);
        } else {
            setSeletedFile(file);
            getFileContent(file);
        }
    };

    const changeDirectory = (newDirectory) => {
        setCurrentDirectory(newDirectory);
        setHistory((prev) => [newDirectory, ...prev.slice(currentIndex)]);
        setCurrentIndex(0);
    };

    const getFileContent = (file) => {
        const filePath = pathJoin([currentDirectory, file.name]);
        try {
            fetch(fileApi + "read/" + encodeURIComponent(filePath)).then(res => {
                if (!res.ok) {
                    setFileContent("");
                }
                res.text().then(content => {
                    setFileContent(content);
                });
            });
        }  catch{
            setFileContent("");
        }
    };

    const onPreviousClick = () => {
        setCurrentDirectory(history[currentIndex + 1]);
        setCurrentIndex(currentIndex + 1);
    };

    const onNextClick = () => {
        setCurrentDirectory(history[currentIndex - 1]);
        setCurrentIndex(currentIndex - 1);
    };

    const saveContent = async (file, content) => {
        const filePath = pathJoin([currentDirectory, file.name]);
        await fetchPost(fileApi + "update/" + encodeURIComponent(filePath), { content });
    };

    if (selectedFile) {
        if (fileContent === false) {
            return "Opening File..";
        } else if (fileContent === "") {
            alert("File is empty or not readable");
            setSeletedFile("");
            setFileContent(false);
            return null;
        }
        return <FileEditor
            fileName={selectedFile.name}
            content={fileContent}
            onExit={() => {
                setSeletedFile("");
                setFileContent(false);
            }}
            onSave={(content) => {
                setFileContent(content);
                saveContent(selectedFile, content);
            }}
        />;
    }

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