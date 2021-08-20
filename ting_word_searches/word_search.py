# from ting_file_management.queue import Queue
# from ting_file_management.file_process import process


def exists_word(word, instance):
    lines = []
    linha_atual = 0
    for index in range(instance.__len__()):
        result = instance.search(index)["linhas_do_arquivo"]

        for line in result:
            line = line.lower().find(word.lower())
            if line >= 0:
                linha_atual += 1
                lines.append(line)
            else:
                return lines
        return [{
                    "palavra": word,
                    "arquivo": instance.search(index)["nome_do_arquivo"],
                    "ocorrencias": [{"linha": linha_atual}],
                }]


def search_by_word(word, instance):
    pass


# if __name__ == "__main__":
#     project = Queue()
#     process("statics/nome_pedro.txt", project)
#     print(exists_word("Pedro", project))
