backend_url = "http://127.0.0.1:5000/"

// function formatProjectDescription(input) {
//     const lines = input.split('\n');
//     let isCodeBlock = false;
//     let formattedHTML = '';
  
//     lines.forEach((line) => {
//       // Check if the line indicates the start or end of a code block
//       if (line.trim() === "```") {
//         isCodeBlock = !isCodeBlock;
//         if (isCodeBlock) {
//           // Start a code snippet block
//           formattedHTML += '<div class="code-snippet">';
//         } else {
//           // End the code snippet block
//           formattedHTML += '</div>';
//         }
//       }
  
//       if (isCodeBlock) {
//         // Wrap code block lines in <code> tags
//         formattedHTML += `<code>${line}</code><br>`;
//       } else {
//         // Wrap regular text lines in <p> tags
//         formattedHTML += `<p>${line}</p>`;
//       }
//     });
  
//     return formattedHTML;
//   }
function formatProjectDescription(input) {
    const lines = input.split('\n');
    let isCodeBlock = false;
    let formattedHTML = '';
  
    lines.forEach((line) => {
      // Check if the line indicates the start or end of a code block
      if (line.trim().substr(0,3) === "```") {
        isCodeBlock = !isCodeBlock;
        if (isCodeBlock) {
          // Start a code snippet block
          formattedHTML += '<div class="code-snippet">';
        } else {
          // End the code snippet block
          formattedHTML += '</div>';
        }
      }
  
      if (isCodeBlock) {
        // Wrap code block lines in <code> tags and trim leading/trailing whitespace
        formattedHTML += `<code>${line}</code><br>`;
      } else {
        // Wrap regular text lines in <p> tags
        formattedHTML += `<p>${line}</p>`;
      }
    });
  
    return formattedHTML;
  }

function generateProjectIdea(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const skill = urlParams.get('skill')
    const idx = urlParams.get('idx')

    $("#loaderPlaceholder").html(`<div id="loaderPlaceholder" class="loader-container">
                                            <!-- Loader element -->
                                            <div class="loader"></div>
                                        </div>`)

    $.ajax({
        type: "POST",
        url: backend_url + "project",
        data: JSON.stringify({
            "skill":skill,
            "key_points":""
        }),// now data come in this function
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resp, status, jqXHR) {
            htmlBody = ""
            htmlBody += `<h2>Project Idea about ${skill}</h2>`
            htmlBody += formatProjectDescription(resp['data'])

            $("#projectIdeaPlaceholder").append(htmlBody)
            $("#loaderPlaceholder").html("")
            console.log(resp)
        },

        error: function (jqXHR, status) {
            // error handler
            console.log(jqXHR);
            $("#loaderPlaceholder").html("")

            alert('fail' + status.code);
        }
     });   
}
generateProjectIdea();