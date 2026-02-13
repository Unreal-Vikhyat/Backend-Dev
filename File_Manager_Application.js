const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("What you wanna do?");
console.log("1: Create File");
console.log("2: Delete File");
console.log("3: Copy File");

rl.question("Enter your choice: ", (choice) => {

    if (choice == 1) {
        rl.question("Enter file name: ", (filename) => {
            rl.question("Enter file content: ", (content) => {

                fs.writeFile(filename, content, (err) => {
                    if (err) {
                        console.log("Error creating file:", err.message);
                    } else {
                        console.log("File created successfully ");
                    }
                    rl.close();
                });

            });
        });
    }

    else if (choice == 2) {
        rl.question("Enter file name to delete: ", (filename) => {

            fs.unlink(filename, (err) => {
                if (err) {
                    console.log("Error deleting file:", err.message);
                } else {
                    console.log("File deleted successfully ");
                }
                rl.close();
            });

        });
    }

    else if (choice == 3) {
        rl.question("Enter source file name: ", (source) => {
            rl.question("Enter destination file name: ", (destination) => {

                fs.copyFile(source, destination, (err) => {
                    if (err) {
                        console.log("Error copying file:", err.message);
                    } else {
                        console.log("File copied successfully ");
                    }
                    rl.close();
                });

            });
        });
    }

    else {
        console.log("Invalid choice ");
        rl.close();
    }

});
