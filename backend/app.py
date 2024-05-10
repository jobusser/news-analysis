from flask import Flask
from flask import request, jsonify
from flask_cors import CORS

from backend.gdelt_getter import get_articles, get_raw_volume, get_country_volumes
from backend.utils import get_query_date_inputs

app = Flask(__name__)
CORS(app)

@app.route('/api/country', methods=['POST'])
def fetch_country():
    print("\n\nArrived in backend!")
    data = request.get_json();
    print(data);
    from_date, to_date = get_query_date_inputs(data.get('start'), data.get('end'))
    article_data = get_articles(data.get('keys'), data.get('country'), data.get('themes'), data.get('sourcelang'), from_date, to_date, data.get('max_records'))
    return jsonify(article_data)


@app.route('/api/country-volume', methods=['POST'])
def fetch_country_volume():
    data = request.get_json();
    from_date, to_date = get_query_date_inputs(data.get('start'), data.get('end'))
    volume_data = get_raw_volume(data.get('keys'), data.get('country'), data.get('themes'), data.get('sourcelang'), from_date, to_date)
    return jsonify(volume_data)

@app.route('/api/world-volume', methods=['POST'])
def fetch_world_volume():
    data = request.get_json()
    from_date, to_date = get_query_date_inputs(data.get('start'), data.get('end'))
    raw_volume_data = get_country_volumes(data.get('keys'), data.get('themes'), data.get('sourcelang'), from_date, to_date)
 
    # return average volume per country
    averages = {}

    for country, entries in raw_volume_data.items():
        total_value = 0
        count = len(entries)

        for entry in entries:
            total_value += entry['value']

        if count > 0:
            average_value = total_value / count
        else:
            average_value = 0

        averages[country] = average_value

    return jsonify(averages)

