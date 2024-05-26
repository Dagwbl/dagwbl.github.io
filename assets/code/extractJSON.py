import json

words_json = json.load(open("D:\Downloads\getMyWords.json"))
# print(world_list)
words_list = words_json['records']
for i in words_list:
    print(i['word'])
    # print(i)