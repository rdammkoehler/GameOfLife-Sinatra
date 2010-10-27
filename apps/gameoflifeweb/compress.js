//js apps/gameoflifeweb/compress.js

include = {
    done : function(total){
        var compressed = include.collectAndCompress(total);
        new include.File('apps/gameoflifeweb/production.js').save(compressed);
        print("Compressed to 'apps/gameoflifeweb/production.js'.");
        include.plugins('documentation')
        var app = new include.Doc.Application(total, "gameoflifeweb");
        app.generate();
        print("Generated docs.");
        if(!window.MVCDontQuit) quit();
    },
    env: "compress"
}

load('jmvc/rhino/env.js');
Envjs('apps/gameoflifeweb/index.html', {scriptTypes : {"text/javascript" : true,"text/envjs" : true}});