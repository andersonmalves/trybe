import sys


def txt_importer(path_file):
    try:
        if path_file.endswith(".txt"):
            with open(path_file, "r", encoding="utf-8") as file:
                lista = []

                for row in file:
                    lista.append(row.strip())
                return lista
        else:
            sys.stderr.write("Formato inválido\n")

    except FileNotFoundError:
        sys.stderr.write(f"Arquivo {path_file} não encontrado\n")
