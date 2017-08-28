$(document).ready(function() {
    $(document).on('keyup', '#myInput', function() {
        var searchTerm = $("#myInput").val();
        var flag = 0;
        var data = {
            term: searchTerm,
            count: 0
        }
        var tweets = $.ajax({
            type: 'POST',
            url: "/search",
            data: data,
            dataType: "text",
            success: function(
                resultData,
                response
            ) {
                if (searchTerm == "") {
                    displayEmpty
                        (
                            flag,
                            resultData
                        )
                } else {
                    display
                        (
                            flag,
                            resultData
                        );
                }
            }
        });
    });

});

function displayEmpty(flag, resultData) {
    var data = JSON.parse(resultData)
    if (!flag) {
        $("#tweetsTableData").empty();
    }

    var tmp = "";
    data["success"].forEach(function(obj) {

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
        tmp = tmp + "<tr> <td>" + obj["_source"]["time"] +
            "</td>" +
            "<td class='context'>" + row +
            "<a href='" + link +
            "' target='blank'>" + link + "</a> " +
            "<a href='#' class='keyword'>" +
            keyword + "</a> </td>" +
            "<td>" + obj["_source"]["user"] +
            "</td> </td>";
        $('.context').mark(link);
    })
    $("#tweetsTableData").append(tmp);
}

function display(flag, resultData) {
    var data = JSON.parse(resultData);
    if (!flag) {
        $("#tweetsTableData").empty();
    }

    var tmp = "";
    data["success"].forEach(function(obj) {
        var row = obj["highlight"]["message"][0];
        var keyword = "";
        var link = "";
        var linkIndex = -1;
        var hash = "";
        var highlight = row.substr(row.indexOf("<em>"), row.indexOf("</em>"))
        if (row.indexOf("http") > -1) {
            link = row.substr(row.indexOf("http"), row.length);
            linkIndex = row.indexOf("http");
        }
       
        if (row.indexOf('@') > -1) {
            if (linkIndex > -1) {
                var tmp2 = link.split(" ")
                link = tmp2[0];
                keyword = tmp2[2];
            }
            else {
                keyword = row.substr(row.indexOf('@'), row.indexOf('</em>') - 2)
            }
        }

        if (row.indexOf('#') > -1) {
            hash = hash + "#";
            for (var i = row.indexOf('#') + 1;i < row.length;i++) {
                if(row[i] == " ") {
                    break;
                } else {
                    hash = hash + row[i];
                }
            }
        }
        row = row.replace(hash, "");
        row = row.replace(keyword, "");
        if(link != "") {
            row = row.replace(link, "");
        }
        tmp = tmp + "<tr> <td>" + obj["_source"]["time"] +
            "</td>" +
            "<td class='context'>" + row;
        if (linkIndex > -1) {
            tmp = tmp + "<a href='" + link +
            "' target='blank'>" + link + "</a> " + "<a href='#' class='keyword'>" +
            hash + "</a>" +
            "<a href='#' class='keyword'>" +
            keyword + "</a> </td>" +
            "<td>" + obj["_source"]["user"] +
            "</td> </td>";
        }
        else {
            tmp = tmp + "<a href='#' class='keyword'>" +
            hash + "</a>"+ "<a href='#' class='keyword'>" +
            keyword + "</a> </td>" +
            "<td>" + obj["_source"]["user"] +
            "</td> </td>";
        }
    })
    $("#tweetsTableData").append(tmp);
}
$(document).ready(function() {
    $(document).delegate("a", "click", function() {
        var searchTerm = $(this).html();
        var flag = 0;
        $("#myInput").val(searchTerm);
        var data = {
            term: searchTerm,
            count: 0
        }
        var tweets = $.ajax({
            type: 'POST',
            url: "/search",
            data: data,
            dataType: "text",
            success: function(
                resultData,
                response
            ) {
                display
                    (
                        flag,
                        resultData
                    );
            }
        });
    })
})

$(document).ready(function() {
    var counter = 0;
    var flag = 1;
    $("#load").on("click", function() {
        counter++;
        var searchTerm = $("#myInput").val();
        var data = {
            term: searchTerm,
            count: counter
        }
        var tweets = $.ajax({
            type: 'POST',
            url: "/search",
            data: data,
            dataType: "text",
            success: function(
                resultData,
                response
            ) {
                if (searchTerm == "") {
                    displayEmpty
                        (
                            flag,
                            resultData
                        )
                } else {
                    display
                        (
                            flag,
                            resultData
                        );
                }
            }
        });
    })
})