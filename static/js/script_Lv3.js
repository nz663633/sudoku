/*
< Fisher-Yates shuffle 알고리즘 >
배열 끝 요소부터 시작해 앞으로 하나씩 나아가면서
해당 요소 앞에 있는 임의의 요소와 해당 요소를 바꿔치기하는 알고리즘

배열 끝부터 하나씩 앞으로 가면서 섞는 방식이므로 i--를 사용해야함.
0부터 현재 인덱스 i까지 범위에서 랜덤 인덱스를 뽑는다.
*/
// function shuffle(x) {
//     for (let i = x.length - 1; i > 0; i--) { // 무작위로 index 값 생성(0 이상 i 미만)
//         let j = Math.floor(Math.random() * (i + 1));
//         let num = x[i];
//         x[i] = x[j];
//         x[j] = num;      // 서로의 위치 교환(배열 섞기)
//     }
// }

// 81개 좌표 섞기
// shuffle(coords)

// // 1) 섞어둔 좌표 coords에서 앞 25개를 선택
// // 2) 해당 칸에 들어갈 후보 숫자(1~9) 중 중복된 수를 제거하는 검사 실시
// // 3) 제거 후 남은 후보에서 무작위로 하나를 골라 채우기
// for (let n = 0; n < 28; n++) {
//     let [i, j] = coords[n]; // 섞어둔 좌표에서 가져오기, 현재 채울 셀의 행 i, 열 j
//     let index = i * 9 + j // 2차원 좌표를 1차원 배열(index)로 바꿈, 
//     let candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//     for (let k = 0; k < 9; k++) {
//         let rowUsed = fullBox[i][k];
//         let rowIndex = candidates.indexOf(rowUsed)
//         if (rowIndex != -1) { // rowUsed가 후보배열에 존재한다면?
//             candidates.splice(rowIndex, 1); // 해당 인덱스의 값을 제거
//         }
//     }
//     for (let k = 0; k < 9; k++) {
//         let colUsed = fullBox[k][j];
//         let colIndex = candidates.indexOf(colUsed)
//         if (colIndex != -1) { // colUsed가 후보배열에 존재한다면?
//             candidates.splice(colIndex, 1); // 해당 인덱스의 값을 제거
//         }
//     }
//     let rowFirst = Math.floor(i / 3) * 3 // 행 0, 3, 6번째 칸을 기준
//     let colFirst = Math.floor(j / 3) * 3 // 열 0, 3, 6번째 칸을 기준
//     for (let rowOffset = 0; rowOffset < 3; rowOffset++) { // offset : 기준점에서 얼마나 떨어져 있는지를 나타내는 차이값
//         for (let colOffset = 0; colOffset < 3; colOffset++) {
//             let row = rowFirst + rowOffset;
//             let col = colFirst + colOffset;
//             let boxUsed = fullBox[row][col];
//             let boxIndex = candidates.indexOf(boxUsed)
//             if (boxIndex != -1) {
//                 candidates.splice(boxIndex, 1);
//             }
//         }
//     }
//     if (candidates.length === 0) { // 후보 배열이 비어있는가?
//         continue; // 비어있다면 해당 칸 건너뛰기 -> 다음 n으로 넘어가기
//     }
//     let chosen = candidates[Math.floor(Math.random() * candidates.length)]; // 남은 후보 배열에서 하나 고르기
//     fullBox[i][j] = chosen; // 실제 fullBox의 (i, j) 위치에 값 넣기
//     room[index].value = chosen; // 화면(UI)의 index에도 값 넣기
// }

document.addEventListener('DOMContentLoaded', () => {
    let room = []; // html 입력칸 요소들을 담는 배열(input 요소 자체)

    // 스도쿠 격자판 만들기(9x9)
    var table = document.createElement("table");

    for (let i = 0; i < 9; i++) {
        let tr = document.createElement("tr");
        table.appendChild(tr);
        for (let j = 0; j < 9; j++) {
            let td = document.createElement("td");
            let input = document.createElement("input");
            input.type = "text";
            input.maxLength = "1";
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

    // 레벨 3에 해당하는 문제 1~3 보드를
    // 객체 boards를 생성해 넣어두기
    const boards = {
        1: [
            [8, "", 5, "", "", "", 9, "", ""],
            ["", 9, "", "", "", 7, "", 3, 1],
            [4, "", "", "", "", "", "", "", 8],
            ["", 6, "", 1, "", "", 7, "", ""],
            [1, "", 3, "", "", 8, "", 4, ""],
            ["", 4, "", "", 2, "", 1, "", 3],
            [6, "", "", "", "", 1, "", "", 4],
            ["", 8, "", 3, "", "", 2, "", ""],
            [3, "", "", 9, 6, "", "", 1, ""]
        ],

        2: [
            ["", "", "", "", 4, "", 6, "", 2],
            ["", 8, "", "", "", 2, "", 1, ""],
            [4, "", "", 1, "", "", "", "", 5],
            ["", 5, "", 9, "", "", 2, "", 1],
            [2, "", "", 3, "", 7, "", 9, ""],
            ["", 9, "", "", 2, "", 3, "", ""],
            ["", "", "", "", "", 3, "", "", 4],
            [8, "", 2, 4, "", "", 7, "", ""],
            [6, "", "", 2, "", "", "", 8, 3]
        ],

        3: [
            [8, "", 7, "", "", 4, "", "", ""],
            ["", 6, "", 3, "", "", 1, "", ""],
            [3, "", "", 6, "", "", "", 5, ""],
            ["", "", 3, "", 6, 8, "", "", 1],
            ["", "", 2, "", "", "", 6, "", 9],
            [6, 1, "", "", 7, "", "", 3, ""],
            [7, "", "", "", "", "", 9, "", 4],
            ["", "", "", 7, "", "", 8, "", 3],
            ["", 3, "", "", 4, 1, "", 6, ""]
        ]
    };

    // html에서 문제번호 갖고오기
    const boardNum = document.body.dataset.board;
    const level = document.body.dataset.level; 
    const board = boards[boardNum]; // boards에서 키(1~3) 가져오고, 해당하는 값(배열) 가져옴

    if (board) {
        for (let i = 0; i < 9; i++) { // 스도쿠 9x9 모든 칸을 순회
            for (let j = 0; j < 9; j++) {
                const index = i * 9 + j; // 2차원 -> 1차원으로 변경(room이 1차원 배열이라서)

                if (board[i][j] !== "") { // 해당 칸이 비어있지 않다면?
                    room[index].value = board[i][j]; // 문제에서 주어진 숫자를 사용
                    room[index].disabled = true; // 바뀔 수 없는 칸 (입력X)
                } else {
                    room[index].value = ""; // 사용자가 입력 가능하도록 함
                    room[index].disabled = false; // 바뀔 수 있는 칸 (입력O)
                }
            }
        }
    }

    // 제출버튼을 눌렀을 때
    document.getElementById("submit").addEventListener("click", () => {
        let submit = confirm("제출하시겠습니까?");
        room.forEach(input => {
            input.style.backgroundColor = ""; // 제출버튼 클릭 전 초기화
        })

        if (submit === true) {
            const currentBoard = []; // 사용자가 빈칸을 입력한 스도쿠판
            for (let i = 0; i < 9; i++) {
                let row = [];
                for (let j = 0; j < 9; j++) {
                    row.push(0); // 0은 임시값
                }
                currentBoard.push(row);
            }

            let boardBind = document.querySelectorAll('input');
            boardBind.forEach((elm, index) => {
                const row = Math.floor(index / 9);
                const col = index % 9
                currentBoard[row][col] = Number(elm.value) || 0; // 빈칸이 있다면 자동으로 0
            });

            let currentInfo = {
                currentBoard: currentBoard,
                boardNum: boardNum
            };

            // JSON.stringify() : 객체를 JSON으로 변환
            // JSON.parse() : JSON을 객체로 변환
            fetch('/api/check_board', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }, // 요청에 담긴 데이터의 타입: JSON 문자열
                body: JSON.stringify(currentInfo),
            }) /* 브라우저(fetch API)가 HTTP 응답을 받아 Response 객체를 생성하고,
           그 객체를 첫번째 .then()의 함수 인자로 전달.
           해당 코드의 response는 Response 객체의 인스턴스 (response는 변수명일 뿐)*/
                .then(response => response.json()) // Response 객체의 body를 문자열로 읽고 다음 then()으로 전달
                .then(data => { // response로부터 꺼낸 실제 데이터(Flask에서 return한 데이터 -> True/False)
                    if (data.result === true) {
                        timerStop();
                        alert("정답입니다!");
                    } else {
                        alert("오답입니다...틀린 부분을 고쳐보세요!");
                        let wrongCoords = data.wrong; // flask가 보내준 틀린 좌표
                        wrongCoords.forEach(([row, col]) => { // 틀린 좌표들의 목록 갖고오기
                            const index = row * 9 + col; // 2차원 좌표를 1차원 좌표 index로 변환
                            room[index].style.backgroundColor = "red"; // 틀린 칸의 input DOM 요소에 css 적용
                        })
                    }
                });
        } else {
            return;
        }
    });

    // 타이머 설정
    let timerID = null;
    let time = 1020; // 1020초 = 17분

    function timerStart() {
        timerID = setInterval(timerFlow, 1000); // 1초마다 timeFlow() 실행
        document.querySelector('.timer').title = '타이머 작동 중...'
    };

    function timerFlow() { // 1초 흘렀을 때 해야하는 것
        let minute = "";
        let second = "";

        minute = parseInt(time / 60);
        if (minute < 10) { // 분이 10보다 작을 경우 앞에 0을 붙인다.
            minute = "0" + minute;
        }
        second = time % 60;
        if (second < 10) { // 초가 10보다 작을 경우 앞에 0을 붙인다.
            second = "0" + second;
        }

        let showTimer = document.querySelector('.timer');
        showTimer.innerHTML = `${minute} : ${second}`;
        time--;
        if (time <= 0) { // 타이머가 종료되는 경우 1
            timerStop();
            alert("시간이 초과되었습니다. Game over...");
        }
    };

    function timerStop() { // 타이머가 멈췄을 경우
        clearInterval(timerID);
    }

    if (board) { // 스도쿠판이 생성되었을 경우에 타이머 생성
        timerStart();
    };


})
