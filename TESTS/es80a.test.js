var BME280Node = require('../es80a.js');


var forCreateNode = function (a, config) {
    a.on = function (a, func) {
        func(msg);
    };
    a.send = function () { return true; };
};
var registerType = function (type, func) {
    nodelist[type] = func;
};

var es80a_init = function () {
    this.nodes = {
        createNode: forCreateNode,
        registerType: registerType
    };
};

/*
describe('check properties', () => {
    test('is scl(PTE24) and sda(PTE25)', () => {
        var BME280 = new BME280_init();
        new BME280Node(BME280);
        var conf = {
            scl: 'PTE24',
            sda: 'PTE25'
        };
        msg = {
            payload: 'default'
        };
        nodelist.BME280(conf);
        expect(msg.payload.temperature).toBe(20);
        expect(msg.payload.humidity).toBe(30);
        expect(msg.payload.atmPressure).toBe(1013);
    });
});
*/