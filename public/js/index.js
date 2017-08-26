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
              console.log(resultData);
              display(resultData);
            }
        });
       
    });

});
function display(resultData) {
   var data = JSON.parse(resultData);
                  $("#tweetsTableData").empty();
                  var tmp = "";
                  data["success"].forEach(function(obj){
                        
                        var row = obj["highlight"]["message"][0];
                        var keyword = "";
                        var link = row.substr(
                          row.indexOf("http"), row.length
                        );
                        if (row.indexOf("@") > -1) {
                          var tmp2 = link.split(" ")
                          link = tmp2[0];
                          keyword = tmp2[2];
                        }
                        
                        row = row.substr(0, row.indexOf("http"))
                        tmp = tmp + "<tr> <td>" + obj["_source"]["time"] + "</td>" +
                                "<td class='context'>" + row + "<a href='" + link + "' target='blank'>" + link + "</a> "+ 
                                "<a href='#' class='keyword'>"+ keyword +"</a> </td>" +
                                "<td>" + obj["_source"]["user"] + "</td> </td>";
                    $('.context').mark(link);
                  })
                  $("#tweetsTableData").append(tmp);
}
$(document).ready(function(){
  $("em").on("click",function() {
    console.log("eme",$(this).html())
})
})
console.log("working")
$("em").on("click",function() {
    console.log("eme",$(this).html())
})