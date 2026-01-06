fullBox = []
fullBox.append([8,2,7,1,5,4,3,9,6])
fullBox.append([9,6,5,3,2,7,1,4,8])
fullBox.append([3,4,1,6,8,9,7,5,2])
fullBox.append([5,9,3,4,6,8,2,7,1])
fullBox.append([4,7,2,5,1,3,6,8,9])
fullBox.append([6,1,8,9,7,2,4,3,5])
fullBox.append([7,8,6,2,3,5,9,1,4])
fullBox.append([1,5,4,7,9,6,8,2,3])
fullBox.append([2,3,9,8,4,1,5,6,7])

# 레벨별로 웹에 나타낼 스도쿠 격자판
# 레벨1 = 38개
# 레벨2 = 35개
# 레벨3 = 30개
board3_Lv1 = []
board3_Lv1.append(["","",7,"","",4,3,"",6])
board3_Lv1.append([9,"",5,3,"","",1,"",""])
board3_Lv1.append([3,"","",6,"","",7,5,""])
board3_Lv1.append(["",9,"","",6,"","","",1])
board3_Lv1.append([4,"",2,"",1,"",6,"",9])
board3_Lv1.append(["",1,8,"",7,2,"","",""])
board3_Lv1.append([7,"","",2,3,"",9,1,4])
board3_Lv1.append(["","","",7,"",6,8,"",3])
board3_Lv1.append([2,3,"","","",1,"",6,""])

board3_Lv2 = []
board3_Lv2.append([8,"","","",5,4,3,"",""])
board3_Lv2.append(["",6,"",3,"","",1,"",8])
board3_Lv2.append([3,"","",6,"","",7,5,""])
board3_Lv2.append(["",9,3,"",6,"","","",1])
board3_Lv2.append(["","",2,"",1,"",6,"",9])
board3_Lv2.append(["",1,8,"",7,"","",3,""])
board3_Lv2.append([7,"","","",3,"",9,"",4])
board3_Lv2.append(["","","",7,"",6,8,"",3])
board3_Lv2.append(["",3,"","",4,"","",6,""])

board3_Lv3 = []
board3_Lv3.append([8,"",7,"","",4,"","",""])
board3_Lv3.append(["",6,"",3,"","",1,"",""])
board3_Lv3.append([3,"","",6,"","","",5,""])
board3_Lv3.append(["","",3,"",6,8,"","",1])
board3_Lv3.append(["","",2,"","","",6,"",9])
board3_Lv3.append([6,1,"","",7,"","",3,""])
board3_Lv3.append([7,"","","","","",9,"",4])
board3_Lv3.append(["","","",7,"","",8,"",3])
board3_Lv3.append(["",3,"","",4,1,"",6,""])

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