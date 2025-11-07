var table = document.createElement("table");
const room = [];
 for (var i = 0; i < 9; i++) {
    var tr = document.createElement("tr");
    table.appendChild(tr);
    for (var j = 0; j < 9; j++) {
        var td = document.createElement("td");
        var input = document.createElement("input");
        tr.appendChild(td);
        td.appendChild(input);
        room.push(input);
    }
}
document.querySelector(".chart").appendChild(table);


const random = Math.floor(Math.random() * 9 + 1);
input.value = random;