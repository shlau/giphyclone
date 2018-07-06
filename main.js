const YOUR_API_KEY = "3ROM94mJAtgC2aPffCeTWNZSDDTSaZ0i";
window.onload = function() {
    let offset = 0;
    let xhr = $.get(`http://api.giphy.com/v1/gifs/trending?api_key=${YOUR_API_KEY}&limit=20&offset=${offset}`);
    xhr.done(function(data) { console.log("success got data", data); });

    $("img").hover(function(){
        const src = $(this).attr("src");
        $(this).attr("src",src.replace("giphy_s","giphy"));
    },
        function() {
            const src = $(this).attr("src");
            const length = src.length;
            const newSrc = src.substring(0, length-9) + "giphy_s.gif";
            $(this).attr("src",newSrc);
        })
}

