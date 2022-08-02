const fs = require("fs");
const path = require("path");
const root = require("./root.js");

module.exports = {
    updateRepo() {
        const exec = require("child_process").exec;

        return new Promise((resolve, reject) => {
            try {
                exec(`cd ${root} && cd ../ && ./update-repo`, (err, out) => {
                    if (err) return resolve(err);
                    resolve(out);
                });
            } catch (err) {
                resolve(err);
            }
        })
    }
}