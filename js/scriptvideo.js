
// YouTube API Key
const apiKey = 'AIzaSyDW9m6pJchs9QkG3_MiaSo66XJTHNpb3MA';


backend_url = "http://127.0.0.1:5000/"



function get_video_summary(videoId){
    return function(e){
        e.preventDefault();
        $("#loaderPlaceholder").html(`<div id="loaderPlaceholder" class="loader-container">
                                            <!-- Loader element -->
                                            <div class="loader"></div>
                                        </div>`)
    
        $.ajax({
            type: "POST",
            url: backend_url + "summary",
            data: JSON.stringify({
                "input": [videoId]
            }),// now data come in this function
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (resp, status, jqXHR) {
                console.log("done", videoId)
                outputList = resp['data'][videoId]
                htmlBody = `<h5>Video Summary</h5><br>`
                htmlBody += `<ol class="center">`
                for (var i = 0; i<outputList.length; ++i){
                    htmlBody += `<li>${outputList[i]}</li>`
                }
                htmlBody += `</ol>`

                $("#summaryVideo").append(htmlBody)
    
                $("#loaderPlaceholder").html("")
            },
    
            error: function (jqXHR, status) {
                // error handler
                console.log(jqXHR);
                alert('fail' + status.code);
    
                $("#loaderPlaceholder").html("")
            }
        });
    }
   
}

function init_calling(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const skill = urlParams.get('skill')
    const idx = urlParams.get('idx')

    // init link value in navbar
    $("#linkVideo1").attr("href",`video.html?skill=${skill}&idx=0`)
    $("#linkVideo2").attr("href",`video.html?skill=${skill}&idx=1`)
    $("#linkVideo3").attr("href",`video.html?skill=${skill}&idx=2`)
    $("#projectIdea").attr("href",`project.html?skill=${skill}`)

    console.log(skill, idx)
    if (idx==0){
        fetch_video_link(skill)
    } else {
        listVideo = JSON.parse(localStorage.listVideo)
        console.log(listVideo)    
        videoId = listVideo[idx]

        

        // Video ID and Description
        const videoDescription1 = 'Short description for Video 1.';

        // Fetch Video Thumbnail
        fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                const video1 = document.getElementById('video1');
                const videoTitle = data.items[0].snippet.title;
                const videoThumbnail = data.items[0].snippet.thumbnails.medium.url;

                video1.innerHTML += `
                    <h2>${skill}</h2>
                    <br>
                    <iframe width="600" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                    <br> <br>
                    <button  id="buttonGenerateSummary" class="btn btn-dark mt-auto">Generate Video Summary</button>`;
                document.getElementById("buttonGenerateSummary").addEventListener("click", get_video_summary(videoId));
            });

    }


    
}

function fetch_video_link(keyword){
    $.ajax({
        type: "POST",
        url: backend_url + "search",
        data: JSON.stringify({
            "input": keyword
        }),// now data come in this function
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resp, status, jqXHR) {
            localStorage.listVideo = JSON.stringify(resp['data'])
            listVideo = JSON.parse(localStorage.listVideo)
            videoId = listVideo[0]

            // Video ID and Description
            const videoDescription1 = 'Short description for Video 1.';

            // Fetch Video Thumbnail
            fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    const video1 = document.getElementById('video1');
                    const videoTitle = data.items[0].snippet.title;
                    const videoThumbnail = data.items[0].snippet.thumbnails.medium.url;

                    const queryString = window.location.search;
                    const urlParams = new URLSearchParams(queryString);
                    const skill = urlParams.get('skill')

                    video1.innerHTML += `
                        <h2>${skill}</h2>
                        <br>
                        <iframe width="600" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                        <br> <br>
                        <button  id="buttonGenerateSummary" class="btn btn-dark mt-auto">Generate Video Summary</button>`;
                    document.getElementById("buttonGenerateSummary").addEventListener("click", get_video_summary(videoId));
                });
        },

        error: function (jqXHR, status) {
            // error handler
            console.log(jqXHR);
            alert('fail' + status.code);
        }
     });
}

init_calling()

