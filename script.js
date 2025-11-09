let room = [];

/*
< Fisher-Yates shuffle 알고리즘 >
배열 끝 요소부터 시작해 앞으로 하나씩 나아가면서
해당 요소 앞에 있는 임의의 요소와 해당 요소를 바꿔치기하는 알고리즘

배열 끝부터 하나씩 앞으로 가면서 섞는 방식이므로 i--를 사용해야함.
0부터 현재 인덱스 i까지 범위에서 랜덤 인덱스를 뽑는다.
*/
function shuffle(room) {
    console.log("room before shuffle:", room);
    for (let i = room.length - 1; i > 0; i--) { // 무작위로 index 값 생성(0 이상 i 미만)
        let j = Math.floor(Math.random() * (i + 1));
        let num = room[i];
        room[i] = room[j];
        room[j] = num;      // 서로의 위치 교환(배열 섞기)
    }
}

var table = document.createElement("table");

 for (var i = 0; i < 9; i++) {
    var tr = document.createElement("tr");
    table.appendChild(tr);
    for (var j = 0; j < 9; j++) {
        var td = document.createElement("td");
        var input = document.createElement("input");
        input.type = "text";
        tr.appendChild(td);
        td.appendChild(input);
        room.push(input);
    }
}
document.querySelector(".chart").appendChild(table);

shuffle(room)

for (let i = 0; i < 25; i++) {
    const random = Math.floor(Math.random() * 9 + 1);
    room[i].value = random;
}
