import flask from Flask
from werkzeug.exceptions import BadRequest
import requests
from requests.exceptions import RequestException

def query_keys(keys):
    if not isinstance(keys, list):
        return ''

    url_string = ''

    url_string = keys[1]
    keys = keys[1:4] # only consider first three

    for key in keys:
        url_string = url_string + ' OR ' + key

    if len(keys) > 0:
        url_string = '(' + ')'

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
        raise BadRequest('Mode must be "artlist," "timelinevolraw," or "timelinesourcecountry"')
    
    return '&mode=' + mode


def max_records_param(max_records=20):
    return '&maxrecords=' + str(max_records)

def time_params():
    return '&startdatetime=20240501235900&enddatetime=20240506235900'


def format_param():
    return '&format=json'


def get_articles(keys, country, theme, max_records):
    try:
        url = 'https://api.gdeltproject.org/api/v2/doc/doc?' + query_param(keys, country, theme) + time_params() + mode_param('artlist') + max_records_param(max_records) + format_param()
        response = requests.get(url)

        if response.status_code != 200:
            response.raise_for_status()

        data = response.json()
        return data

    except RequestException as e:
        raise BadRequest(f"Network error occurred: {str(e)}")

    except ValueError:
        raise BadRequest("Failed to parse JSON data")

    except Exception as e:
        raise BadRequest(f"An error occurred: {str(e)}")


def get_raw_volume(keys, country, theme, max_records):
    try:
        url = 'https://api.gdeltproject.org/api/v2/doc/doc?' + query_param(keys, country, theme) + time_params() + mode_param('timelinevolraw') + max_records_param(max_records) + format_param()
        response = requests.get(url)

        if response.status_code != 200:
            response.raise_for_status()

        data = response.json()
        return data

    except RequestException as e:
        raise BadRequest(f"Network error occurred: {str(e)}")

    except ValueError:
        raise BadRequest("Failed to parse JSON data")

    except Exception as e:
        raise BadRequest(f"An error occurred: {str(e)}")


def get_country_volumes(keys, country, theme, max_records):
    try:
        url = 'https://api.gdeltproject.org/api/v2/doc/doc?' + query_param(keys, country, theme) + time_params() + mode_param('timelinesourcecountry') + max_records_param(max_records) + format_param()
        response = requests.get(url)

        if response.status_code != 200:
            response.raise_for_status()

        data = response.json()
        return data

    except RequestException as e:
        raise BadRequest(f"Network error occurred: {str(e)}")

    except ValueError:
        raise BadRequest("Failed to parse JSON data")

    except Exception as e:
        raise BadRequest(f"An error occurred: {str(e)}")

