from werkzeug.exceptions import BadRequest
import requests

def query_keys(keys):
    if not isinstance(keys, list) or not keys:  # Checks if keys is not a list or is empty
        return ''

    # Filter out empty strings and limit to the first three items
    filtered_keys = [key for key in keys if key.strip() != ''][:3]

    # Apply double quotes to keys with spaces
    quoted_keys = ['"' + key + '"' if ' ' in key else key for key in filtered_keys]

    # Join keys with ' OR ' if there are multiple keys, otherwise return the single key
    url_string = ' OR '.join(quoted_keys)

    # Enclose in parentheses if there's more than one key
    if len(quoted_keys) > 1:
        url_string = '(' + url_string + ')'

    return url_string


def query_country(country):
    if not isinstance(country, str) or country == '':
        return ''

    return ' sourcecountry:' + country

def query_theme(theme):
    if not isinstance(theme, str) or theme == '':
        return ''

    return ' theme:' + theme

def query_sourcelang(sourcelang):
    if not isinstance(sourcelang, str) or sourcelang == '':
        return ''

    return ' sourcelang:' + sourcelang


def query_param(keys=None, country=None, theme=None, sourceLang=None):
    if not keys and not country and not theme:
        raise BadRequest('GDELT queries must have at least one parameter (search keys, source country, or theme)')

    return 'query=' + query_keys(keys) + query_country(country) + query_theme(theme) + query_sourcelang(sourceLang)


def mode_param(mode):
    if not mode in ['artlist', 'timelinevolraw', 'timelinesourcecountry']:
        raise BadRequest('Mode must be artlist, timelinevolraw, or timelinesourcecountry')

    return '&mode=' + mode


def max_records_param(max_records=20):
    print('\n\n\n\n\n\n\n\nmaxrecords=', max_records)
    return '&maxrecords=' + str(max_records)

def time_params(start, end):
    if end is None:
        end = 20240507235959
    if start is None:
        start = end - 7000000
    return '&startdatetime=' + str(start) + '&enddatetime=' + str(end)


def format_param():
    return '&format=json'


def get_articles(keys, country, theme, sourcelang, start, end, max_records):
    url = 'https://api.gdeltproject.org/api/v2/doc/doc?' + query_param(keys, country, theme, sourcelang) + time_params(start, end) + mode_param('artlist') + max_records_param(max_records) + format_param()
    print("GET ARTICLES URL", url)
    response = requests.get(url)

    data = response.json()
    return data


def get_raw_volume(keys, country, theme, sourcelang, start, end):
    url = 'https://api.gdeltproject.org/api/v2/doc/doc?' + query_param(keys, country, theme, sourcelang) + time_params(start, end) + mode_param('timelinevolraw') + format_param()
    response = requests.get(url)

    data = response.json()
    return data


def get_country_volumes(keys, theme, sourcelang, start, end):
    url = 'https://api.gdeltproject.org/api/v2/doc/doc?' + query_param(keys, None, theme, sourcelang) + time_params(start, end) + mode_param('timelinesourcecountry') + format_param()
    print("URL:\n", url)
    response = requests.get(url)

    data = response.json()

    formatted_data = {}

    for country in data['timeline']:
        name = country['series'][:-17]
        
        if name == 'United States':
            name = 'United States of America'
        elif name == 'Bosnia-Herzegovina':
            name = 'Bosnia and Herzegovina'
        elif name == 'Czech Republic':
            name = 'Czechia'
        elif name == 'Slovak Republic':
            name = 'Slovakia'

        formatted_data[name] = country['data']

    return formatted_data

