from flask import Flask
from flask import request, jsonify
import requests

app = Flask(__name__)

@app.route('/')
def hellow_world():
    return '<h1> Hello, world! </h1>'


@app.route('/submit', methods=['POST'])
def submit():
    print(request.form);
    name = request.form['name']
    return f'<h1>Hello, {name}!</h1>'

@app.route('/hello/<name>')
def hello_name(name):
    return f'<h1>Hello, {name}!</h1>'

@app.route('/api/data', methods=['POST'])
def api_data():
    print(request.get_json())
    data = request.get_json()  # Extracts JSON data from the request
    username = data.get('username', 'Guest')  # Gets the username or defaults to 'Guest'
    return jsonify({"message": f"Hello, {username}!"})  # Returns a JSON response

@app.route('/fetch-data')
def fetch_data():
    url = "https://api.gdeltproject.org/api/v2/doc/doc?query=sourcecountry:China%20AND%20theme:election&mode=artlist&maxrecords=20&format=json"
    response = requests.get(url)
    data = response.json()
    if data and "articles" in data:
        print(data["articles"][0])  # Print the first article to console
    return jsonify(data)

