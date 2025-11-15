let room = []; // html 입력칸 요소들을 담는 배열(input 요소 자체)

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

// 스도쿠 격자판 만들기(9x9)
var table = document.createElement("table");

for (let i = 0; i < 9; i++) {
    let tr = document.createElement("tr");
    table.appendChild(tr);
    for (let j = 0; j < 9; j++) {
        let td = document.createElement("td");
        let input = document.createElement("input");
        input.type = "text";
        tr.appendChild(td);
        td.appendChild(input);
        room.push(input);
    }
}
document.querySelector(".chart").appendChild(table);


// 이중배열 만들기
let fullBox = [];
for (let i = 0; i < 9; i++) {
    let row = [];
    for (let j = 0; j < 9; j++) {
        row.push(0); // 0은 임시값
    }
    fullBox.push(row);
}
console.log(fullBox);


// 스도쿠 81칸을 좌표로 만들기
let coords = [];
let rows = 9;
let cols = 9;
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        coords.push([i,j]);
    }
}


// 81칸 중 25칸에 들어갈 난수 생성
// 랜덤으로 숫자 배치(무작위로 섞은 후 배열 앞쪽 25칸 선택)
// 행, 열, 박스를 기준으로 25칸에 들어갈 난수 중복 검사
shuffle(room)

for (let n = 0; n < 25; n++) {
    room[n]; // 실제 스도쿠 입력 칸(input) 요소를 의미
    i = Math.floor(n / 9) // n칸에 대한 행 좌표
    j = n % 9 // n칸에 대한 열 좌표
    let overlap = true;
    while (overlap) {
        overlap = false;
        const random = Math.floor(Math.random() * 9 + 1);
        for (let k = 0; k < 9; k++) { // 행(row) 검사
            if (fullBox[i][k] == random) {
                overlap = true;
            }
        }
        for (let k = 0; k < 9; k++) { // 열(col) 검사
            if (fullBox[k][j] == random) {
                overlap = true;
            }
        }
        // 박스(3x3) 검사
        let rowFirst = Math.floor(i / 3) * 3
        let colFirst = Math.floor(j / 3) * 3
        for (let rowOffset = 0; rowOffset < 3; rowOffset++) { //offset : 기준점에서 얼마나 떨어져 있는지를 나타내는 차이값
            for (let colOffset = 0; colOffset < 3; colOffset++) {
                let row = rowFirst + rowOffset;
                let col = colFirst + colOffset;
                if (fullBox[row][col] == random) {
                    overlap = true;
                }
            }
        }
    }
    fullBox[i][j] = random;
    room[n].value = random;
}