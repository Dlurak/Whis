import re
import pandas as pd


def parse(path):
    with open(path, 'r', newline='') as f:
        file = f.read()

    messages = file.replace('^M', '\r\n').split('\r\n')[:-1]
    data = []

    for m in messages:
        match = re.match(
                r'.?\[(\d{2}.\d{2}.\d{2}, \d{2}:\d{2}:\d{2})\] ([^:]+): (.*)',
                m,
                re.DOTALL
            )

        if match:
            date_string, author, message = match.groups()
            data.append({
                'date': date_string,
                'author': author,
                'message': message
            })
        else:
            print(m)
            raise Exception(f'Parse Error: {m}')

    df = pd.DataFrame(data)
    df['date'] = pd.to_datetime(df['date'], format='%y.%m.%d, %H:%M:%S')

    print(df['author'].unique())
    return df
