var fs = require('fs'),
    iconv = require('iconv-lite'),
    $ = require('jquery'),
    art = require('art-template'),
    util = require('./util.js');

// var openTag = "{{",
//     closeTag = "}}",
//     loopStart = false;

// var parser = function(code, data){
//     code = code.replace(/^\s/, '');
    
//     var split = code.split(' ');
//     var key = split.shift();
//     var args = split.join(' ');

//     if(!loopStart){
//         switch(key){
//             case 'if':
//                 // 将逻辑判断中的括号去掉
//                 args = args.replace(/[()]/g, '');
//                 // 将逻辑运算符去掉
//                 args = args.replace(/(&&|\|\|)/g, '#');
//                 args = args.split('#');
//                 for(var i=0, len=args.length; i<len; i++){
//                     var str = args[i].trim();
//                     str = str.replace(/\s(!==|!=|==|===)\s/g, ':');
//                     str = str.split(':');
//                     data[str[0]] = str[1].replace(/['|"]/g, '');
//                     // console.log(str);
//                 }
//                 // console.log(args);
//                 // data[args] = util.getRandomStr();
//                 break;

//             case '/if':
//                 break;

//             case 'each':
//                 var name = split[0];
//                 loopStart = true;
//                 data[name] = util.getRandomArray();
//                 break;

//             case '/each':
//                 loopStart = false;
//                 break;

//             default: 
//                 // normal varibles
//                 data[key] = util.getRandomStr();
//                 break;
//         }
//     }

//     return data;
// };

var arguments = process.argv.splice(2),
    pathname = arguments[0].slice(0, arguments[0].lastIndexOf('/') + 1),
    headerCode = "'use strict';var $utils=this,$helpers=$utils.$helpers,",
    footerCode = ",$string=$utils.$string",
    reg = /'use\sstrict';var\s\$utils=this,\$helpers=\$utils.\$helpers,(.*),\$string=\$utils.\$string/,
    html = util.readGBKText(arguments[0]),
    $doc = $(html),
    $script = $doc.find('script[id]');

$script.each(function(i){
    var $this = $(this),
        id = $this.attr('id'),
        source = $this.text(),
        data = {};

    source = art.compile(source).toString();
    source = source.match(reg);
    if(source){
        source = source[1];
        source = source.replace('$escape=$utils.$escape,', '');
        source = source.split(',');
        for(var i=0, len=source.length; i<len; i++){
            var attr = source[i].split('=')[0];
            data[attr] = util.getRandomStr();
            // str = str.replace(/\s(!==|!=|==|===)\s/g, ':');
            // str = str.split(':');
            // data[str[0]] = str[1].replace(/['|"]/g, '');
            // console.log(source[i]);
        }
    }
    // console.log(source);


    // source = source.split(openTag);

    // $.each(source, function(i){
    //     var code = source[i].split(closeTag);
    //     var $0 = code[0];
    //     var $1 = code[1];

    //     if(code.length === 2){
    //         data = parser($0, data);
    //     }
    // });

    console.log(data);
    // util.generateFile(pathname, id, data);
});

