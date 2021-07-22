// Declare variables for the search input and the gif area where we'll be storing our newly created gifs.
const $gifArea = $("#gif-area");
const $searchInput = $("#search");

/* use ajax result to add a gif */
// Create a variable that stores the number of responses, and randomly picks one to pass along. 
// It then appends that new div onto the DOM
function addGif(res) {
    let numResults = res.data.length;
    if (numResults) {
        let randomIdx = Math.floor(Math.random() * numResults);
        let $newCol = $("<div>", { class: "col-md-4 col-12 mb-4" });
        let $newGif = $("<img>", {
            src: res.data[randomIdx].images.original.url,
        });
        $newCol.append($newGif);
        $gifArea.append($newCol);
    }
}

/* handle form submission: clear search box & make ajax call */
// Stop the submit from refreshing the page, clear the search input value, get the search results from giphy API and pass them back to addGif
$("form").on("submit", async function (evt) {
    evt.preventDefault();

    let searchTerm = $searchInput.val();
    $searchInput.val("");

    const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
        params: {
            q: searchTerm,
            api_key: "EkJtzxFrXu3qcv5k6Q5KSmkRni46Rnq2"
        }
    });
    addGif(response.data);
});

/* remove gif */
// Self explanatory; empties the gifArea of newly created divs. All of them, I might add. 
$("#remove").on("click", function () {
    $gifArea.empty();
});