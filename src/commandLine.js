import React, {useEffect, useState} from 'react';
import './commandstyles.css'
let CommandLine = () => {
    let [lines, setLines] = useState(["12311212323"]);
    let [activeLine, setActiveLine] = useState(0)
    useEffect(() => {
        document.addEventListener('keydown', function(event) {
            console.log(event.key)
            if (event.code.indexOf("Key") !== -1) {
                let newLines = [...lines];
                console.log('lines = ', lines)
                newLines[activeLine] += event.key; 
                setLines(newLines);
            }
          });
    }, [lines])
    return (
        <div className="container">
            {lines.map(e => {
                return <div>{e}</div>
            })}
        </div>
    )
}

export {CommandLine};