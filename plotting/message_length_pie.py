import matplotlib.pyplot as plt
import pandas as pd


def write_pie_chart(df: pd.DataFrame):
    original_df = df.copy()

    original_df['message'] = original_df['message'].str.len()

    authors = original_df.groupby('author')
    authors = authors.agg({'message': 'sum'})

    author_values = list(authors.index)

    plt.pie(authors['message'], labels=author_values)
    plt.legend()
    plt.savefig('output/pie_length.png')
    plt.close()
