import re
import pandas as pd


def parse(path):
    with open(path, 'r', newline='') as f:
        file = f.read()

    messages = file.replace('^M', '\r\n').split('\r\n')[:-1]
    data = []

    for m in messages:
        match = re.match(
                r'.?\[(\d{2}.\d{2}.\d{2}, \d{2}:\d{2}:\d{2})\] (([^:]+)|(@[a-z]+:[a-z]+\.[a-z]+)): (.*)',
                m,
                re.DOTALL
            )

        if match:
            groups = match.groups()

            date_string = groups[0]
            author = groups[1]
            message = groups[-1]

            data.append({
                'date': date_string,
                'author': author,
                'message': message
            })
        else:
            print(m)
            raise Exception(f'Parse Error: {m}')

    df = pd.DataFrame(data)
    df['date'] = pd.to_datetime(df['date'], format='%d.%m.%y, %H:%M:%S')

    for author in df['author'].unique():
        print(author)

    return df
