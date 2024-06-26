from flask import Flask
from flask import request, jsonify
from flask_cors import CORS

from backend.gdelt_getter import get_articles, get_raw_volume, get_country_volumes
from backend.utils import get_query_date_inputs, date_details_string

app = Flask(__name__)
CORS(app)

@app.route('/api/country', methods=['POST'])
def fetch_country():
    data = request.get_json();
    from_date, to_date = get_query_date_inputs(data.get('start'), data.get('end'))
    article_data = get_articles(data.get('keys'), data.get('country'), data.get('themes'), data.get('sourcelang'), from_date, to_date, data.get('max_records'))
    return jsonify(article_data)


@app.route('/api/country-volume', methods=['POST'])
def fetch_country_volume():
    data = request.get_json();
    from_date, to_date = get_query_date_inputs(data.get('start'), data.get('end'))
    volume_data = get_raw_volume(data.get('keys'), data.get('country'), data.get('themes'), data.get('sourcelang'), from_date, to_date)

    # return more details
    query_data = {}
    query_data['query'] = {
        'key1': data.get('keys'),
        'theme': data.get('theme'),
        'dates': date_details_string(data.get('start'), data.get('end')),
        'country': data.get('country') if isinstance(data.get('country'), str) and data.get('country') != '' else 'World'
    }

    total_entries = len(volume_data['timeline'][0]['data'])
    total_articles = 0
    relevant_articles = 0
    for entries in volume_data['timeline'][0]['data']:
        total_articles += entries['norm']
        relevant_articles += entries['value']

    query_data['total_entries'] = total_entries
    query_data['total_articles'] = total_articles
    query_data['relevant_articles'] = relevant_articles
    query_data['articles_per_day'] = volume_data['timeline'][0]['data']

    return jsonify(query_data)

@app.route('/api/world-volume', methods=['POST'])
def fetch_world_volume():
    data = request.get_json()
    from_date, to_date = get_query_date_inputs(data.get('start'), data.get('end'))
    raw_volume_data = get_country_volumes(data.get('keys'), data.get('themes'), data.get('sourcelang'), from_date, to_date)
 
    # return average volume per country
    world_total = 0;
    for country, entries in raw_volume_data.items():
        for entry in entries:
            world_total += entry['value']

    averages = {}

    for country, entries in raw_volume_data.items():
        country_value = 0

        for entry in entries:
            country_value += entry['value']

        if world_total > 0:
            average_value = country_value / world_total
        else:
            average_value = 0

        averages[country] = average_value
    print('\n\n\n', averages)

    return jsonify(averages)

