import matplotlib.pyplot as plt
import pandas as pd


def write_pie_chart(df: pd.DataFrame):
    original_df = df.copy()

    original_df['message'] = original_df['message'].str.len()

    authors = original_df.groupby('author').agg({'message': 'sum'})

    plt.pie(authors['message'], labels=list(authors.index))

    plt.legend(title="Authors")
    plt.title("Total length of messages")

    plt.savefig('output/pie_length.png')
    plt.close()
