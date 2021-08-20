# from ting_file_management.queue import Queue
# from ting_file_management.file_process import process


def exists_word(word, instance):
    lines = []
    for index in range(instance.__len__()):
        result = instance.search(index)["linhas_do_arquivo"]
        if result == []:
            return lines
        else:
            for line in result:
                lines.append(line.lower().find(word.lower()))
            return [{
                        "palavra": word,
                        "arquivo": instance.search(index)["nome_do_arquivo"],
                        "ocorrencias": [{"linha": len(lines)}],
                    }]


def search_by_word(word, instance):
    pass


# if __name__ == "__main__":
#     project = Queue()
#     process("statics/nome_pedro.txt", project)
#     print(exists_word("Pedro", project))
