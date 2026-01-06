from flask import Flask, request

app = Flask(__name__)

@app.route('/')
def home():
    return 'Hello!'

@app.route('/api/check_board', methods=['POST'])
def check_board():
    print("요청 들어옴:", request.json)
    return "True"  # 임시 응답

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
