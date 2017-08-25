var express = require('express');
var app = express();

module.exports = class Starter {
    getOne() {
        return new Promise((resolve, reject) => { resolve("1 is One") });
    }
};