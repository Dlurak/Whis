import matplotlib.pyplot as plt
import pandas as pd


def write_pie_chart(df: pd.DataFrame):
    authors = df.groupby('author')
    sizes = authors.size()

    author_values = list(sizes.index)

    plt.pie(sizes, labels=author_values)
    plt.savefig('output.png')
    plt.close()
