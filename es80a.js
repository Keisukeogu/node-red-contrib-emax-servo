module.exports = function(RED) {
    'use strict';
    function es80aNode(n) {
        RED.nodes.createNode(this,n);
        this.gpioPin = Number(n.gpioPin);
        this.angle = (Number(n.angle) * 10 ) + 600;
        
        console.log("gpioPin is " + this.gpioPin + " PWM is " +this.angle );
        var node = this;
        var timer;

        var Gpio = require('pigpio').Gpio,
        motor = new Gpio(node.gpioPin, {mode: Gpio.OUTPUT}),
        pulseWidth = node.angle;

        
        node.on('input', function (msg) {

            var timer;

            function start_supply(_motor,_angle){
                console.log("interval");
                timer = setInterval(function(){
                    move(_motor,_angle);
                },1000);
                return true;
            }

            move(motor,node.angle); //即時実行
            console.log('start1');
            start_supply(motor,node.angle);
            
            setTimeout(function(){
                stop_supply(timer);
                node.send(msg);
            },1500);
            
        });
    
        node.on('close',function(){
            stop_supply(timer);
        });
    }
    RED.nodes.registerType("ES80A",es80aNode);

    function stop_supply(func){
        console.log('stop');
        clearInterval(func);
        return true;
    }
    
    function move(_motor,_angle){
        _motor.servoWrite(_angle);
        return true;
    }
}