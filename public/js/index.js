$(document).ready(function() {
    $(document).on('keyup', '#myInput', function() {
        var searchTerm = $("#myInput").val();
        var flag = 0;
        // console.log(searchTerm);
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
                if (
                    searchTerm ==
                    ""
                ) {
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
        // console.log(data["success"]);
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
$(document).ready(function() {
    $(document).delegate("em", "click", function() {
        // console.log("delegate", $(this).html());
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
        // console.log(searchTerm);
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
                if (
                    searchTerm ==
                    ""
                ) {
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