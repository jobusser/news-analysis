import datetime

def parse_entered_date_strings(from_date_string, to_date_string):
    # receive as YYYYMMDD
    if from_date_string and to_date_string:
        from_date = datetime.datetime(int(from_date_string[0: 4]), int(from_date_string[4: 6]), int(from_date_string[6:]))
        to_date = datetime.datetime(int(to_date_string[0: 4]), int(to_date_string[4: 6]), int(to_date_string[6:]), 23, 59, 59)
        return from_date, to_date

    if not from_date_string and not to_date_string:
        to_date = datetime.datetime.today()
        from_date = to_date - datetime.timedelta(days=1)
        return from_date, to_date

    if not from_date_string:
        to_date = datetime.datetime(int(to_date_string[0: 4]), int(to_date_string[4: 6]), int(to_date_string[6:]), 23, 59, 59)
        from_date = to_date - datetime.timedelta(days=1)
        return from_date, to_date

    if not to_date_string:
        from_date = datetime.datetime(int(from_date_string[0: 4]), int(from_date_string[4: 6]), int(from_date_string[6:]))
        to_date = from_date + datetime.timedelta(days=1)
        return from_date, to_date


def get_query_date_inputs(start_date, end_date):
    from_date, to_date = parse_entered_date_strings(str(start_date), str(end_date))

    return from_date.strftime("%Y%m%d%H%M%S"), to_date.strftime("%Y%m%d%H%M%S")

