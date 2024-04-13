import pandas as pd
import json
import re

def write_json(original_df: pd.DataFrame):
    df = original_df.copy()
    counts = {}

    for author in df['author'].unique():
        author_df = df[df['author'] == author]
        author_count = {}

        for msg in author_df['message']:
            clean_msg = re.sub(r'[:"\'\-;.,!?\(\)\[\]/\\]', "", msg).lower().strip()
            words = clean_msg.split()

            for word in words:
                try:
                    author_count[word] += 1
                except KeyError:
                    author_count[word] = 1

        author_count_sorted = dict(sorted(author_count.items(), key=lambda item: item[1], reverse=True))
        counts[author] = author_count_sorted

    with open("output/words.json", "w") as file:
        json.dump(counts, file)
