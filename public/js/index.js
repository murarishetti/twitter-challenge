$(document).ready(function(){
   $(document).on('keyup', '#myInput', function(){
        var searchTerm = $("#myInput").val();
        console.log(searchTerm);
        var data = {
            term: searchTerm
        }
        var tweets = $.ajax({
            type: 'POST',
            url: "/search",
            data: data,
            dataType: "text",
            success: function(resultData, response) {
               var data = JSON.parse(resultData);
               if (data["success"].length > 0) {
                  $("#tweetsTableData").empty();
                  var tmp = "";
                  data["success"].forEach(function(obj){
                        var link = obj["_source"]["message"].substr(
                          obj["_source"]["message"].indexOf("http"), obj["_source"]["message"].legnth
                        );
                        obj["_source"]["message"] = obj["_source"]["message"].substr(0, obj["_source"]["message"].indexOf("http"))
                        tmp = tmp + "<tr> <td>" + obj["_source"]["time"] + "</td>" +
                                "<td>" + obj["_source"]["message"] + "<a href='" + link + "' target='blank'>" + link + "</a> </td>" +
                                "<td>" + obj["_source"]["user"] + "</td> </td>";
                    // console.log(obj["_source"]["message"]);
                  })
                  $("#tweetsTableData").append(tmp);
               }
               
            }
        });
       
    });
});