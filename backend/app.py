from flask import Flask
from flask import request, jsonify

from backend.gdelt_getter import get_articles, get_raw_volume, get_country_volumes

app = Flask(__name__)

@app.route('/api/country')
def fetch_country():
    data = request.get_json();
    article_data = get_articles(data.get('keys'), data.get('country'), data.get('themes'), data.get('sourcelang'), data.get('start'), data.get('end'), data.get('maxrecords'))
    return jsonify(article_data)


@app.route('/api/country-volume')
def fetch_country_volume():
    data = request.get_json();
    article_data = get_raw_volume(data.get('keys'), data.get('country'), data.get('themes'), data.get('sourcelang'), data.get('start'), data.get('end'), data.get('maxrecords'))
    return jsonify(article_data)

@app.route('/api/world-volume')
def fetch_world_volume():
    data = request.get_json();
    article_data = get_country_volumes(data.get('keys'), None, data.get('themes'), data.get('sourcelang'), data.get('start'), data.get('end'), data.get('maxrecords'))
    return jsonify(article_data)

