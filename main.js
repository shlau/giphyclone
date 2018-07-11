const YOUR_API_KEY = "3ROM94mJAtgC2aPffCeTWNZSDDTSaZ0i";
window.onload = function() {
    let searchClicked = false;
    let offset = 0;
    let searchVal;
    const content = document.querySelector(".content");
    const button = this.document.querySelector(".search img");
 
    /**
     * Inserts GIFS into html
     * @param {JSON object} data - The data returned from a Giphy API call
     */
    function displayImages(data) { 
        let result = [];
        console.log("success got data", data); 
        const gifs = data['data'];
        result.push(`<div class="item">`)
        gifs.forEach(element => {
            const url = element['images']['original_still']['url'];

            result.push(`<img src=${url} style="width:248px; height:auto;">`);

        });
        result.push(`</div>`);

        const firstLoad = (offset == 0);
        firstLoad ? content.innerHTML = result.join("") : content.innerHTML += result.join("");
    

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
    }

    /**
     * Load trending GIFS
     */
    function loadImages() {
        const xhr = $.get(`http://api.giphy.com/v1/gifs/trending?api_key=${YOUR_API_KEY}&limit=40&offset=${offset}`);
        xhr.done(displayImages);
    }

    loadImages();
    
    /* load images when end of page is reached */
    window.onscroll = function(ev) {
        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
          offset += 40;
          console.log("Bottom of page ", offset );
          searchClicked ? loadSearch() : loadImages();
        }
      };

      /**
       * Load GIFS based on search query
       */
      function loadSearch() {
          const formattedSearch = searchVal.replace(" ", "+");
          console.log("search value", formattedSearch);
          const xhr = $.get(`http://api.giphy.com/v1/gifs/search?q=${formattedSearch}&api_key=${YOUR_API_KEY}&limit=40&offset=${offset}`);
          xhr.done(displayImages);

      }

      /**
       * update search query when a search is made
       */
      function handleSearch() {
          searchVal = document.querySelector("input").value;
          searchClicked = true;
          offset = 0;
          const headerText = document.querySelector(".trending h3");
          headerText.innerHTML = searchVal.toUpperCase();
          loadSearch();
      }
      button.addEventListener('click', handleSearch);
}

