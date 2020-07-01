$(document).ready(function(){
    setInterval(()=>{
        var $obj = $('#erList');
        var data = {
            size:$('.jumbotron').length,
            caseno:$('.jumbotron:first').attr('data--case-no'),
        }
        //$obj.html(jom.loading);
        $.post(jom.url+'misc/erLab/refresh',{data:data},(output)=>{
            $obj.replaceWith(output);
            var $audio = $('#errAudio');
            if($audio.length > 0){
                $audio.get(0).play();
                $audio.get(0).play();
                $audio.get(0).play();
            }
        });
    },2000);
});