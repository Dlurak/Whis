import matplotlib.pyplot as plt
import pandas as pd


def write_pie_chart(df: pd.DataFrame):
    original_df = df.copy()
    authors = original_df.groupby('author')
    sizes = authors.size()

    author_values = list(sizes.index)

    plt.pie(sizes, labels=author_values)
    plt.savefig('output/pie_amount.png')
    plt.close()
