#!/bin/python3

import parse
import os
import plotting.messages_amount_pie as messages_amount_pie
import plotting.words as words
import plotting.message_length_pie as message_length_pie
import plotting.plottings as plotting

files_in_chats = list(filter(lambda s: s.endswith('.txt'), os.listdir('chats/')))
currently_selected = input(' '.join(files_in_chats) + ': ')

while (currently_selected not in files_in_chats):
    currently_selected = input(' '.join(files_in_chats) + ': ')

df = parse.parse(f'chats/{currently_selected}')

messages_amount_pie.write_pie_chart(df)
message_length_pie.write_pie_chart(df)
words.write_json(df)
plotting.write_chart_amount(df)
