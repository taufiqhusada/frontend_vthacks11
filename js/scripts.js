/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

backend_url = "http://127.0.0.1:5000/"

function getSkillList(event){
    event.preventDefault();
    var input = $("#inputJobDesc").val();
    console.log("loading get skill list")

    $("#loaderPlaceholder").html(`<div id="loaderPlaceholder" class="loader-container">
                                        <!-- Loader element -->
                                        <div class="loader"></div>
                                    </div>`)
    
    data = {
        "input": input
    };

    $.ajax({
        type: "POST",
        url: backend_url + "skills",
        data: JSON.stringify(data),// now data come in this function
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resp, status, jqXHR) {
            let htmlBody = `<h4 class="fw-bolder" justify-content-center text-center >Important Skills</h4>
                            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center" id="skillPage">
                            <br>
                            `
            console.log(resp)
            
            output = resp['data']
            for (var i = 0; i<output.length; ++i){
                htmlBody += `
                                <div class="col mb-5">
                                    <div class="card h-100">
                                        <div class="card-body p-4">
                                            <div class="text-center">
                                                <h5 class="fw-bolder">${output[i]}</h5>
                                                
                                            </div>
                                        </div>
                                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="video.html?skill=${output[i]}&idx=0">Start Learn</a></div>
                                        </div>
                                    </div>
                                </div>
                            
                            `
            }
            htmlBody += "</div>"
            console.log(htmlBody)

            $("#loaderPlaceholder").html(``)

            $("#skillPage").append(htmlBody)

        },

        error: function (jqXHR, status) {
            // error handler
            console.log(jqXHR);
            alert('fail' + status.code);
        }
     });
}

document.getElementById("buttonSubmitJobDesc").addEventListener("click", getSkillList)