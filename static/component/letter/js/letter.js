
var aparted = false;

$("#open").click(function(){

	if(!aparted)
	{
		var typed = new Typed('.letter', {
			strings: ["^1000Dear&nbsp;&nbsp;Huan",
				"H^200uan<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I hope this letter finds you well and I'm very glad to receive your letter. I also like to be able to communicate through paper letters, but for the moment it is a bit of a luxury to me, especially in terms of energy. I hope the Internet can maintain a little romance while bringing us convenience. <a href='/en/letter/to-huan/' title='CLICK HERE TO CHECK REPLY.'>----------------------------\>\> Click here to check replay ^_^</a><br><p style='float:right; display:block; width:80px;'>^1000J^200eapo</p>"],
			typeSpeed: 90,
			backSpeed: 50
		});

		$('#open').find("span").eq(0).css('background-position', "0 -150px");

		aparted = true;

		var music = document.getElementById('music2');
		if (music.paused)
		{
			music.play();
			$('#music_btn2').css("opacity", "1");
		}
	}

});

function playPause()
{
    var music = document.getElementById('music2');
    var music_btn = $('#music_btn2');

    if (music.paused)
	{
        music.play();
		music_btn.css("opacity", "1");
    }
    else
	{
        music.pause();
		music_btn.css("opacity", "0.2");
    }
}


window.onload = function ()
{

	var currentUrl = window.location.href;
	var firstIndex = currentUrl.indexOf("#");
	if (firstIndex <= 0) window.location.href = currentUrl + "#contact";

	$('#music2').attr('src', bgmsrc);

	document.addEventListener('touchstart',function (event) { if(event.touches.length > 1) event.preventDefault(); });

	var lastTouchEnd = 0;

	document.addEventListener('touchend',function (event) {

		var now = (new Date()).getTime();
		if(now - lastTouchEnd <= 300) event.preventDefault();
		lastTouchEnd = now;

	}, false);

	document.addEventListener('gesturestart', function (event) { event.preventDefault(); });

	$('body').css('opacity', '1');
	$('#jsi-cherry-container').css('z-index', '-99');

}
