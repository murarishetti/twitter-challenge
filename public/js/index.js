$(document).ready(function() {
   $(document).on('keyup', '#myInput', function() {
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
            if(searchTerm == "") {
                displayEmpty(resultData)
            }
            else {
                display(resultData);
            }
      }
  });
});

});
function displayEmpty(resultData) {
    var data = JSON.parse(resultData)
    // console.log(data["success"]);
                  $("#tweetsTableData").empty();
                  var tmp = "";
                  data["success"].forEach(function(obj){
                        
                        var row = obj["_source"]["message"];
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
  $(document).delegate("em", "click", function(){
    // console.log("delegate", $(this).html());
    var searchTerm = $(this).html();
    $("#myInput").val(searchTerm);
    var data = {
        term: searchTerm
    }
    var tweets = $.ajax({
        type: 'POST',
        url: "/search",
        data: data,
        dataType: "text",
        success: function(resultData, response) {
          display(resultData);
      }
  });
})
})

$(document).ready(function(){
    $(window).scroll(function() {
    if($(window).scrollTop() == $(document).height() - $(window).height()) {
           // ajax call get data from server and append to the div
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
    }
});
})