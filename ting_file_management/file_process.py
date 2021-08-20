import sys
from ting_file_management.file_management import txt_importer


def process(path_file, instance):
    file = txt_importer(path_file)
    obj = {
        "nome_do_arquivo": path_file,
        "qtd_linhas": len(file),
        "linhas_do_arquivo": file
    }

    for item in range(0, instance.__len__()):
        instance.search(item)
        if instance.search(item)["nome_do_arquivo"] == path_file:
            return None

    sys.stdout.write(f"{obj}\n")
    return instance.enqueue(obj)


def remove(instance):
    file = instance.dequeue()
    if not file:
        return sys.stdout.write("Não há elementos\n")
    return sys.stdout.write(
        f"Arquivo {file['nome_do_arquivo']} removido com sucesso\n")


def file_metadata(instance, position):
    if position >= len(instance):
        return sys.stderr.write("Posição inválida")
    return instance.search(position)
