# 첫번째 스도쿠 정답표
fullBox = []
fullBox.append([8,3,5,4,1,6,9,2,7])
fullBox.append([2,9,6,8,5,7,4,3,1])
fullBox.append([4,1,7,2,9,3,6,5,8])
fullBox.append([5,6,9,1,3,4,7,8,2])
fullBox.append([1,2,3,6,7,8,5,4,9])
fullBox.append([7,4,8,5,2,9,1,6,3])
fullBox.append([6,5,2,7,8,1,3,9,4])
fullBox.append([9,8,1,3,4,5,2,7,6])
fullBox.append([3,7,4,9,6,2,8,1,5])

# 레벨별로 웹에 나타낼 스도쿠 격자판
# 레벨1 = 38개
# 레벨2 = 35개
# 레벨3 = 30개
board1_Lv1 = []
board1_Lv1.append(["",3,5,"",1,"",9,"",""])
board1_Lv1.append(["",9,"",8,"",7,"",3,""])
board1_Lv1.append([4,"","","",9,3,"","",8])
board1_Lv1.append(["",6,9,1,"","",7,"",2])
board1_Lv1.append([1,"","",6,"",8,"",4,""])
board1_Lv1.append(["",4,"","",2,"",1,6,""])
board1_Lv1.append([6,"",2,"","",1,"","",4])
board1_Lv1.append(["",8,"",3,4,"",2,"",""])
board1_Lv1.append([3,"",4,9,"",2,"",1,""])

board1_Lv2 = []
board1_Lv2.append([8,"","","",1,"",9,"",7])
board1_Lv2.append(["",9,"",8,"",7,"",3,""])
board1_Lv2.append([4,"",7,"",9,"",6,"",""])
board1_Lv2.append(["",6,"",1,3,"","",8,2])
board1_Lv2.append([1,"","",6,"",8,"",4,9])
board1_Lv2.append(["",4,"","",2,"",1,"",""])
board1_Lv2.append([6,"","",7,"",1,"","",4])
board1_Lv2.append(["",8,"",3,"","",2,"",""])
board1_Lv2.append(["","","","",6,2,"",1,""])

board1_Lv3 = []
board1_Lv3.append([8,"",5,"","","",9,"",""])
board1_Lv3.append(["",9,"","","",7,"",3,1])
board1_Lv3.append([4,"","","","","","","",8])
board1_Lv3.append(["",6,"",1,"","",7,"",""])
board1_Lv3.append([1,"",3,"","",8,"",4,""])
board1_Lv3.append(["",4,"","",2,"",1,"",3])
board1_Lv3.append([6,"","","","",1,"","",4])
board1_Lv3.append(["",8,"",3,"","",2,"",""])
board1_Lv3.append([3,"","",9,6,"","",1,""])

# request: HTTP 요청 관련 정보
# get_json(): request의 JSON 데이터를 Python 자료형(dic/list)으로 변환
from flask import Flask, request, jsonify # flask 앱과 요청처리, JSON 응답 준비

app = Flask(__name__) # flask 앱 생성

@app.route('/api/check_board', methods = ['POST']) # POST 요청 받을 라우트 지정
def check_board():
    data = request.get_json() # JS에서 보낸 allBoards 받기
    currentBoard = data["currentBoard"]
    for row in range(9): # 정답표와 사용자가 입력한 스도쿠판(currentBoard)의 일치여부 검증
        for col in range(9):
            if currentBoard[row][col] != fullBox[row][col]:
                return "False"
    return "True"
