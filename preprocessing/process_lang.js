// Converts list of languages GDELT uses to JSON format
// Original txt file can be found at
// http://data.gdeltproject.org/api/v2/guides/LOOKUP-LANGUAGES.TXT

const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'LOOKUP-LANGUAGES.TXT');
const outputFile = path.join(__dirname, 'processedLanguages.json');

const processFile = () => {
    fs.readFile(inputFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        const lines = data.split('\n');
        const processedData = [];

        for (let i = 0; i < Math.min(10000, lines.length); i++) {
            const line = lines[i];
            const tokens = line.split('\t');

            if (!tokens[0]) continue;

            const firstToken = tokens[0];
            const secondToken = tokens[1];

            processedData.push({
                langCode: firstToken,
                langName: secondToken
            });
        }

        fs.writeFile(outputFile, JSON.stringify(processedData, null, 2), err => {
            if (err) {
                console.error('Error writing to the file:', err);
                return;
            }
            console.log('File has been written successfully');
        });
    });
};

processFile();


