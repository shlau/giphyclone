const YOUR_API_KEY = "3ROM94mJAtgC2aPffCeTWNZSDDTSaZ0i";
window.onload = function() {
    let offset = 0;
    const content = document.querySelector(".content");
    function loadImages() {
        const xhr = $.get(`http://api.giphy.com/v1/gifs/trending?api_key=${YOUR_API_KEY}&limit=20&offset=${offset}`);
        xhr.done(function(data) { 
            let result = [];
            console.log("success got data", data); 
            const gifs = data['data'];
            result.push(`<div class="item">`)
            gifs.forEach(element => {
                const url = element['images']['original_still']['url'];

                result.push(`<img src=${url} style="width:248px; height:auto;">`)

            });
            result.push(`</div>`)
            content.innerHTML += result.join("");
        

            /* switch between static image and gif on hover */
            $(".content img").hover(function(){
                const src = $(this).attr("src");
                $(this).attr("src",src.replace("giphy_s","giphy"));
            },
            function() {
                const src = $(this).attr("src");
                const length = src.length;
                const newSrc = src.substring(0, length-9) + "giphy_s.gif";
                $(this).attr("src",newSrc);
            })
        });
    }

    loadImages();
    /* load images when end of page is reached */
    window.onscroll = function(ev) {
        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
          // you're at the bottom of the page
          offset += 40;
          console.log("Bottom of page ", offset );
          loadImages();
        }
      };
}

