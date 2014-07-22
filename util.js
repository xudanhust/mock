var fs = require('fs'),
    iconv = require('iconv-lite');

var util = {
    readGBKText: function (pathName) {
        return iconv.decode(fs.readFileSync(pathName), 'gbk');
    },

    getRandomChineseCharacter: function(){
        var str = '老来候系式市者九里满段水里气不教路团近才很否由利龙何时想它存阶化细后他写制采选商况格感马力来术且成听土村年址大医适后为斯带共导清公示图格米花开土次存素会Y何平低励带事构许但个斯科安消米情克说证务候受节代状解李详至弦板克';
        return str.charAt(Math.floor(Math.random()*str.length));
    },

    getRandomStr: function(len){
        len = len || Math.floor(Math.random()*3) + 3;
        var word = '';
        while(len > 0){
            // eval( 'word +=' +  '"\\u' + (Math.round(Math.random() * 20901) + 19968).toString(16)+'"');
            word += this.getRandomChineseCharacter();
            len--;
        }
        return word;
    },

    getRandomArray: function(len){
        len = len || Math.floor(Math.random()*3) + 3;
        var arr = [];
        while(len > 0){
            arr.push(this.getRandomStr());
            len--;
        }        
        return arr;
    },

    generateFile: function(pathName, fileName, data){
        fs.writeFileSync(pathName + 'data-' + fileName + '.js', 'var ' + fileName + ' = ' + JSON.stringify(data));
    }
};

module.exports = util;

