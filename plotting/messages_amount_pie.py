import matplotlib.pyplot as plt
import pandas as pd


def write_pie_chart(input: pd.DataFrame):
    df = input.copy()
    authors = df.groupby('author')
    sizes = authors.size()

    author_values = {f'{author}: {size}' for author, size in sizes.items()}

    plt.pie(sizes, labels=author_values)

    plt.legend(title="Authors")
    plt.title("Amount of messages")

    plt.savefig('output/pie_amount.png')
    plt.close()
