from werkzeug.exceptions import BadRequest
import requests

def query_keys(keys):
    if not isinstance(keys, list) or len(keys) == 0:
        return ''

    url_string = ''

    url_string = keys[0]
    for idx, key in enumerate(keys):
        if idx == 0: continue
        if idx == 3: break # only consider first three
        url_string = url_string + ' OR ' + key

    if len(keys) > 1:
        url_string = '(' + url_string + ')'

    return url_string


def query_country(country):
    if not isinstance(country, str):
        return ''

    return ' sourcecountry:' + country

def query_theme(theme):
    if not isinstance(theme, str):
        return ''

    return ' theme:' + theme


def query_param(keys=None, country=None, theme=None):
    if not keys and not country and not theme:
        raise BadRequest('GDELT queries must have at least one parameter (search keys, source country, or theme)')

    return 'query=' + query_keys(keys) + query_country(country) + query_theme(theme);


def mode_param(mode):
    if not mode in ['artlist', 'timelinevolraw', 'timelinesourcecountry']:
        raise BadRequest('Mode must be artlist, timelinevolraw, or timelinesourcecountry')

    return '&mode=' + mode


def max_records_param(max_records=20):
    return '&maxrecords=' + str(max_records)

def time_params(start, end):
    if end is None:
        end = 20240507235959
    if start is None:
        start = end - 7000000
    return '&startdatetime=' + str(start) + '&enddatetime=' + str(end)


def format_param():
    return '&format=json'


def get_articles(keys, country, theme, start, end, max_records):
    url = 'https://api.gdeltproject.org/api/v2/doc/doc?' + query_param(keys, country, theme) + time_params(start, end) + mode_param('artlist') + max_records_param(max_records) + format_param()
    print("GET ARTICLES URL", url)
    response = requests.get(url)

    data = response.json()
    return data


def get_raw_volume(keys, country, theme, start, end, max_records):
    url = 'https://api.gdeltproject.org/api/v2/doc/doc?' + query_param(keys, country, theme) + time_params(start, end) + mode_param('timelinevolraw') + max_records_param(max_records) + format_param()
    response = requests.get(url)

    data = response.json()
    return data


def get_country_volumes(keys, country, theme, start, end,  max_records):
    url = 'https://api.gdeltproject.org/api/v2/doc/doc?' + query_param(keys, country, theme) + time_params(start, end) + mode_param('timelinesourcecountry') + max_records_param(max_records) + format_param()
    response = requests.get(url)

    data = response.json()
    return data

