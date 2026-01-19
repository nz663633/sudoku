from flask import Flask, request, jsonify
from flask_cors import CORS # 다른 출처에서 온 요청을 서버가 허용할지 말지 정하는 브라우저 보안 규칙
# 프론트엔드 포트번호(5500)과 백엔드 포트번호(5000)가 다르기 때문
from answer1 import fullBox1
from answer2 import fullBox2
from answer3 import fullBox3

app = Flask(__name__)
CORS(app) # Flask가 다른 출처에서 오는 요청을 허용

@app.route('/api/check_board', methods=['POST'])
def check_board():
    print("요청 들어옴:", request.json)
    boards = { # 문제 번호 선택
        "1": fullBox1,
        "2": fullBox2,
        "3": fullBox3
    }
    data = request.get_json() # JS에서 보낸 allBoards 받기
    currentBoard = data["currentBoard"]
    boardNum = data["boardNum"]
    fullBox = boards[boardNum] # JS로부터 받은 문제 번호에 따라 정답표 고르기
    wrong = [] # 틀린 좌표들을 담을 리스트
    for row in range(9): # 정답표와 사용자가 입력한 스도쿠판(currentBoard)의 일치여부
        for col in range(9):
            if currentBoard[row][col] != fullBox[row][col]:
                wrong.append([row, col])
    if len(wrong) > 0: # 틀린 좌표가 하나라도 있다면
        return jsonify({ "result": False, "wrong": wrong })
    return jsonify({ "result": True })
if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
