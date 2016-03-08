var canvas;
var stage;

var main;

var tkr = new Object;

//preloader
var preloader;
var manifest;
var totalLoaded = 0;

var titleView = new Container();

function Main()
{
    canvas = document.getElementById('EnSeeDeStage');
    stage = new Stage(canvas);
    
    stage.mouseEventsEnabled = true;
    
    preloader = new PreloadJS();
    preloader.onProgress = handleProgress;
    preloader.onComplete = handleComplete;
    preloader.onFileLoad = handleFileLoad;
    preloader.loadManifest(manifest);
 
    /* Ticker */
     
    Ticker.setFPS(30);
    Ticker.addListener(stage);
}

function handleProgress(event)
{
    //use event.loaded to get the percentage of the loading
}
 	
function handleLoadComplete(event) 
{
 
   totalLoaded++;
    
   if (manifest.length == totalLoaded)
   {
       addTitleView();
   }
} 

function handleFileLoad(event) {
         //triggered when an individual file completes loading
             
         switch(event.type)
         {
            case PreloadJS.IMAGE:
            //image loaded
             var img = new Image();
              img.src = event.src;
              img.onload = handleLoadComplete;
              window[event.id] = new Bitmap(img);
            break;
 
            case PreloadJS.SOUND:
            //sound loaded
            handleLoadComplete();
            break;
         }
}

function addTitleView()
{
    //console.log("Add Title View");
    startB.x = 240 - 31.5;
    startB.y = 160;
    startB.name = 'startB';
     
    creditsB.x = 241 - 42;
    creditsB.y = 200;
     
    TitleView.addChild(main, startB, creditsB);
    stage.addChild(bg, TitleView);
    stage.update();
     
    // Button Listeners
     
    startB.onPress = tweenTitleView;
    creditsB.onPress = showCredits;
}