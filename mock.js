var fs = require('fs'),
    iconv = require('iconv-lite'),
    $ = require('jquery'),
    util = require('./util.js');

var openTag = "{{",
    closeTag = "}}",
    loopStart = false;

var parser = function(code, data){
    code = code.replace(/^\s/, '');
    
    var split = code.split(' ');
    var key = split.shift();
    var args = split.join(' ');

    if(!loopStart){
        switch(key){
            case 'if':
                data[args] = true;
                break;

            case '/if':
                break;

            case 'each':
                var name = split[0];
                loopStart = true;
                data[name] = util.getRandomArray();
                break;

            case '/each':
                loopStart = false;
                break;

            default: 
                // normal varibles
                data[key] = util.getRandomStr();
                break;
        }
    }

    return data;
};

var arguments = process.argv.splice(2),
    pathname = arguments[0].slice(0, arguments[0].lastIndexOf('/') + 1),
    html = util.readGBKText(arguments[0]),
    $doc = $(html),
    $script = $doc.find('script[id]');

$script.each(function(i){
    var $this = $(this),
        id = $this.attr('id'),
        source = $this.text(),
        data = {};

    source = source.split(openTag);

    $.each(source, function(i){
        var code = source[i].split(closeTag);
        var $0 = code[0];
        var $1 = code[1];

        if(code.length === 2){
            data = parser($0, data);
        }
    });

    // console.log(data);
    util.generateFile(pathname, id, data);
});

