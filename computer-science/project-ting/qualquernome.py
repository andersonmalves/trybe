from ting_file_management.queue import Queue
from ting_file_management.file_process import process
from ting_word_searches.word_search import exists_word

if __name__ == "__main__":
    project = Queue()
    process("statics/nome_pedro.txt", project)
    print(exists_word("Pedro", project))
