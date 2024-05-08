// Converts list of themes GDELT uses to JSON format
// Original txt file can be found at
// http://data.gdeltproject.org/api/v2/guides/LOOKUP-GKGTHEMES.TXT

const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'LOOKUP-GKGTHEMES.TXT');
const outputFile = path.join(__dirname, 'processedThemes.json');

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
            const firstToken = line.split('\t')[0];
            if (!firstToken) continue;

            const adjustedToken = firstToken.toLowerCase().replace(/_/g, ' ');

            processedData.push({
                key: adjustedToken,
                value: firstToken
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

