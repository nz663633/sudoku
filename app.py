from flask import Flask, request, jsonify, render_template
from flask_cors import CORS # 다른 출처에서 온 요청을 서버가 허용할지 말지 정하는 브라우저 보안 규칙
# 프론트엔드 포트번호(5500)과 백엔드 포트번호(5000)가 다르기 때문
from answer1 import fullBox1
from answer2 import fullBox2
from answer3 import fullBox3

app = Flask(__name__)
CORS(app) # Flask가 다른 출처에서 오는 요청을 허용

boards = { # 문제 번호 선택
        "1": fullBox1,
        "2": fullBox2,
        "3": fullBox3
    }

# 홈페이지
@app.route('/')
def home():
    return render_template('index.html')

# 레벨 시작 페이지
@app.route('/Level<int:level>/Lv<int:lv>')
def level_start(level, lv):
    return render_template(f'Level{level}/Lv{lv}.html')

# 레벨별 문제 페이지
@app.route('/Level<int:level>/board<int:board>_Lv<int:lv>')
def board_page(level, board, lv):
    return render_template(f'Level{level}/board{board}_Lv{lv}.html')

# API
@app.route('/api/check_board', methods=['POST'])
def check_board():
    print("요청 들어옴:", request.json)

    data = request.get_json() # JS에서 보낸 allBoards 받기

    if not data or "currentBoard" not in data or "boardNum" not in data:
        return jsonify({"error": "invalid request"}), 400
    
    currentBoard = data["currentBoard"]
    boardNum = data["boardNum"]

    fullBox = boards.get(boardNum) # JS로부터 받은 문제 번호에 따라 정답표 고르기
    if not fullBox:
        return jsonify({"error": "invalid request"}), 400
    
    wrong = [] # 틀린 좌표들을 담을 리스트
    for row in range(9): # 정답표와 사용자가 입력한 스도쿠판(currentBoard)의 일치여부
        for col in range(9):
            if currentBoard[row][col] != fullBox[row][col]:
                wrong.append([row, col])

    if len(wrong) > 0: # 틀린 좌표가 하나라도 있다면
        return jsonify({ "result": False, "wrong": wrong })
    
    return jsonify({ "result": True })
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
