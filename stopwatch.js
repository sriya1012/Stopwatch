$(function(){

//variables
    var mode=0;//App mode  
    var timeCounter=0;//time counter
    var lapCounter=0;//lap counter
    var action;//variable for setInterval
    var lapNumber=0;//Number of laps
    var timeMinutes, timeSeconds, timeCentiseconds, lapMinutes, lapSeconds, lapCentiseconds;
    //minutes,seconds,centiseconds for time and lap

    //On app load show start and lap buttons
    hideshowButtons("#startButton","#lapButton");
    //click on startButton
    $("#startButton").click(function(){
        //mode on
        mode=1;
    //show stop and lap buttons
        hideshowButtons("#stopButton","#lapButton");
    //start counter
         startAction();
    });
  


    //click on stopButton
    $("#stopButton").click(function(){
        //show resume and reset buttons
        hideshowButtons("#resumeButton","#resetButton");
        clearInterval(action);
        //start action
    }); 
    
    //click on resume button
    $("#resumeButton").click(function(){
        //show stop and lap buton
        hideshowButtons("#stopButton","#lapButton");
        
        //start action
        startAction();
    });

    //click on resetButton
    $("#resetButton").click(function(){
    
        
            //reload the page
        location.reload();
        
    });
        

    //click on lapButton
    $("#lapButton").click(function(){
        //if mode is ON
        if(mode){
            clearInterval(action);
            //stop action
            clearInterval(action);
            //resetLap and print lap details
            lapCounter=0;
            addLap();
            startAction();
            //start action
        }
        
    });
        


    //functions
function hideshowButtons(x,y){
    $(".control").hide();
    $(x).show();
    $(y).show();
}
    
function startAction(){
    action=setInterval(function(){
        timeCounter++;
        if(timeCounter==100*60*100){
            timeCounter=0;
        }
        lapCounter++;
          if(lapCounter==100*60*100){
            lapCounter=0;
          }
        updateTime();
    },10);
}
function updateTime(){
    //1min=60*100centiseconds=6000seconds
    timeMinutes=Math.floor(timeCounter/6000);
   //1 sec=100 centiseconds 
    timeSeconds=Math.floor((timeCounter%6000)/100);
    timeCentiseconds=(timeCounter%6000)%100;
        $("#timeMinute").text(format(timeMinutes));
        $("#timeSecond").text(format(timeSeconds));
        $("#timeCentisecond").text(format(timeCentiseconds));
     //1min=60*100centiseconds=6000seconds
lapMinutes=Math.floor(lapCounter/6000);
   //1 sec=100 centiseconds 
    lapSeconds=Math.floor((lapCounter%6000)/100);
    lapCentiseconds=(lapCounter%6000)%100;
    
        $("#lapMinute").text(format(lapMinutes));
        $("#lapSecond").text(format(lapSeconds));
        $("#lapCentisecond").text(format(lapCentiseconds));
}
    
function format(number){
    if(number<10){
        return '0'+number;
    } 
    else{
        return number;   
    }
}
    function addLap(){
        lapNumber++;
        var lapDetails = '<div class="lap">'+
            '<div class="laptimetitle">' +
            'Lap' + lapNumber + '</div>' +
            '<div class="laptime">' + 
            '<span>' + format(lapMinutes) + '</span>' +
            ':<span>' + format(lapSeconds)+ '</span>' +
            ':<span>' + format(lapCentiseconds) + '</span>' +
            '</div>' +
        '</div>'
        $(lapDetails).prependTo("#laps");
    }
});