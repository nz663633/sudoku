        var table = document.createElement("table");
        for (var i = 0; i < 9; i++) {
            var tr = document.createElement("tr");
            table.appendChild(tr);
            for (var j = 0; j < 9; j++) {
                var td = document.createElement("td");
                var input = document.createElement("input");
                tr.appendChild(td);
                td.appendChild(input);
            }
        }
        document.querySelector(".chart").appendChild(table);