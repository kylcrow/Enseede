/// <reference path="assets/easeljs.d.ts" />
var canvas;
var stage;
var main;
var imgCrow;
var screenWidth = 480;
var screenHeight = 320;

var manifest;
var totalLoaded = 0;

var titleView = new createjs.Container();
var gameView = new createjs.Container();

function Main()
{
    canvas = document.getElementById('EnSeeDeStage');
    stage = new createjs.Stage(canvas);
    
    stage.mouseEventsEnabled = true;

    manifest = [
                { src:"assets/images/CrowSprite.png", id:"imgCrow"}
            ];

    var queue = new createjs.LoadQueue(false);
    
    queue.on("complete", handleComplete, this);
    queue.on("progress", handleProgress, this);
    queue.on("fileload", handleFileLoad, this);
    queue.loadManifest(manifest);

    /* Ticker */     
    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick", stage);
}

function handleProgress(event)
{
    //use event.loaded to get the percentage of the loading
}
 	
function handleComplete(event)
{
    //use event.loaded to get the percentage of the loading
}

function handleLoadComplete(event) 
{
    totalLoaded++;
    
    if (manifest.length == totalLoaded)
    {
        AddTitleView();
    }
} 

function handleFileLoad(event) 
{
     var item = event.item; // A reference to the item that was passed in to the LoadQueue
     var type = item.type;

    //triggered when an individual file completes loading        
    switch (type)
    {
     case createjs.LoadQueue.IMAGE:
        //image loaded
            var img = new Image();
            img.src = item.src;
            img.onload = handleLoadComplete;
            window[item.id] = new createjs.Bitmap(img);
            break;

        case createjs.LoadQueue.SOUND:
            //sound loaded
            handleLoadComplete();
            break;
        default:
            break;
    }
}

function AddTitleView()
{
    imgCrow.x = (screenWidth / 2) - (imgCrow.image.width / 2);
    imgCrow.y = (screenHeight / 2) - (imgCrow.image.height / 2);
    imgCrow.name = 'imgCrow';
    
    imgCrow.addEventListener('click', onCrowClick);

    titleView.addChild(main, imgCrow);
    stage.addChild(imgCrow, titleView);
    stage.update();
}

function onCrowClick()
{
    var rect = new createjs.Rectangle(0, 0, 100, 100);    
    rect.x = 10;
    rect.y = 10;
    
    gameView.addChild(main, rect);
    stage.addChild(rect, gameView);
    stage.update();    
}