const samplefile = require("fs");

samplefile.readFile("file.txt", "utf8", (err, data) => {
    const words = data.trim().split(/\s+/);
    const count = words.length;

    samplefile.writeFile("newfile.txt", `Word Count: ${count}`, () => {});
});
