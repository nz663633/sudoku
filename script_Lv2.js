let room = []; // html 입력칸 요소들을 담는 배열(input 요소 자체)

/*
< Fisher-Yates shuffle 알고리즘 >
배열 끝 요소부터 시작해 앞으로 하나씩 나아가면서
해당 요소 앞에 있는 임의의 요소와 해당 요소를 바꿔치기하는 알고리즘

배열 끝부터 하나씩 앞으로 가면서 섞는 방식이므로 i--를 사용해야함.
0부터 현재 인덱스 i까지 범위에서 랜덤 인덱스를 뽑는다.
*/
function shuffle(x) {
    for (let i = x.length - 1; i > 0; i--) { // 무작위로 index 값 생성(0 이상 i 미만)
        let j = Math.floor(Math.random() * (i + 1));
        let num = x[i];
        x[i] = x[j];
        x[j] = num;      // 서로의 위치 교환(배열 섞기)
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
        coords.push([i, j]);
    }
}

// 81개 좌표 섞기
shuffle(coords)

// 1) 섞어둔 좌표 coords에서 앞 25개를 선택
// 2) 해당 칸에 들어갈 후보 숫자(1~9) 중 중복된 수를 제거하는 검사 실시
// 3) 제거 후 남은 후보에서 무작위로 하나를 골라 채우기
for (let n = 0; n < 32; n++) {
    let [i, j] = coords[n]; // 섞어둔 좌표에서 가져오기, 현재 채울 셀의 행 i, 열 j
    let index = i * 9 + j // 2차원 좌표를 1차원 배열(index)로 바꿈, 
    let candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let k = 0; k < 9; k++) {
        let rowUsed = fullBox[i][k];
        let rowIndex = candidates.indexOf(rowUsed)
        if (rowIndex != -1) { // rowUsed가 후보배열에 존재한다면?
            candidates.splice(rowIndex, 1); // 해당 인덱스의 값을 제거
        }
    }
    for (let k = 0; k < 9; k++) {
        let colUsed = fullBox[k][j];
        let colIndex = candidates.indexOf(colUsed)
        if (colIndex != -1) { // colUsed가 후보배열에 존재한다면?
            candidates.splice(colIndex, 1); // 해당 인덱스의 값을 제거
        }
    }
    let rowFirst = Math.floor(i / 3) * 3 // 행 0, 3, 6번째 칸을 기준
    let colFirst = Math.floor(j / 3) * 3 // 열 0, 3, 6번째 칸을 기준
    for (let rowOffset = 0; rowOffset < 3; rowOffset++) { // offset : 기준점에서 얼마나 떨어져 있는지를 나타내는 차이값
        for (let colOffset = 0; colOffset < 3; colOffset++) {
            let row = rowFirst + rowOffset;
            let col = colFirst + colOffset;
            let boxUsed = fullBox[row][col];
            let boxIndex = candidates.indexOf(boxUsed)
            if (boxIndex != -1) {
                candidates.splice(boxIndex, 1);
            }
        }
    }
    if (candidates.length === 0) { // 후보 배열이 비어있는가?
        continue; // 비어있다면 해당 칸 건너뛰기 -> 다음 n으로 넘어가기
    }
    let chosen = candidates[Math.floor(Math.random() * candidates.length)]; // 남은 후보 배열에서 하나 고르기
    fullBox[i][j] = chosen; // 실제 fullBox의 (i, j) 위치에 값 넣기
    room[index].value = chosen; // 화면(UI)의 index에도 값 넣기
}

document.getElementById("Lv1_btn").addEventListener('click', function() {
    location.href = 'Lv1.html'
})
document.getElementById("Lv2_btn").addEventListener('click', function() {
    location.href = 'Lv2.html'
})
document.getElementById("Lv3_btn").addEventListener('click', function() {
    location.href = 'Lv3.html'
})