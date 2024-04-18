import matplotlib.pyplot as plt
import pandas as pd


def write_chart_amount(inp: pd.DataFrame):
    df = inp.copy()
    print(df)
    df['date'] = df['date'].dt.date
    print(df)

    grouped = df.groupby(['author', df['date']]).size().reset_index(name='count')
    pivot_table = grouped.pivot(index='date', columns='author', values='count').fillna(0)
    pivot_table.plot(kind='line', figsize=(10, 6))


    plt.title('Messages Over Time by Author')
    plt.xlabel('Date')
    plt.ylabel('Number of Messages')
    plt.xticks(rotation=45)
    plt.grid(True)
    plt.legend(title='Author')

    plt.savefig('output/history_chart_amount.png')
    plt.close()
