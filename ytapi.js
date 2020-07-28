const YOUR_API_KEY ='AIzaSyBT8KqHYsi_xy-5htqpZpe5PFuYDw-P6Qo';
const YOUR_CLIENT_ID ='686140872996-1lrtpumv3417vcpb2oh6ln5us2spo5p6.apps.googleusercontent.com';
var output = document.querySelector('#output');

function authenticate() {
  return gapi.auth2.getAuthInstance()
    .signIn({ scope: "https://www.googleapis.com/auth/youtube.readonly" })
    .then(function () { console.log("Sign-in successful"); },
      function (err) { console.error("Error signing in", err); });
}

function loadClient() {
  gapi.client.setApiKey(YOUR_API_KEY);
  return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    .then(function () { console.log("GAPI client loaded for API"); },
      function (err) { console.error("Error loading GAPI client for API", err); });
}

// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
  return gapi.client.youtube.videos.list({
    "part": [
      "snippet,contentDetails,statistics"
    ],
    "chart": "mostPopular",
    "maxResults": 10,
    "regionCode": "US"
  })
    .then(function (response) {
      // Handle the results here (response.result has the parsed body).
      var videoDetails = response.result.items;
      videoDetails.forEach(video => {
        output.innerHTML +=`
   <div class='card border border-primary p-3'>
   <h4 class='border-bottom'>${video.snippet.channelTitle}</h4>
   <iframe width = "1280" height = "720" src = "https://www.youtube.com/embed/${video.id}" frameborder = "0" allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen ></iframe>
   <p>${video.snippet.localized.title}<p>
   <button class='btn btn-primary'>${video.statistics.likeCount} Likes</button> 
   <button class='btn btn-danger'>${video.statistics.dislikeCount} Dislike</button>       
   </div>
  `;console.log(video.id);
      });

      console.log("Response", response);
    },
      function (err) { console.error("Execute error", err); });
}
gapi.load("client:auth2", function () {
  gapi.auth2.init({ client_id: YOUR_CLIENT_ID });
});

