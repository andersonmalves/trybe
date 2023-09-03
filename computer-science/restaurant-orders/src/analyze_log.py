import csv
import collections


def analyze_log(path_to_file):
    lista_da_maria = []
    total_hamburguers_do_arnaldo = 0
    todos_pratos_do_restaurante = set()
    pratos_que_joao_consumiu = set()
    dias_que_restaurante_teve_clientes = set()
    dias_que_joao_foi = set()
    with open(path_to_file) as csvfile:
        readfile = csv.reader(csvfile, delimiter=",")
        for row in readfile:
            if row[0] == "maria":
                lista_da_maria.append(row[1])
            if row[0] == "arnaldo" and row[1] == "hamburguer":
                total_hamburguers_do_arnaldo += 1
            if row[0] == "joao":
                pratos_que_joao_consumiu.add(row[1])
                dias_que_joao_foi.add(row[2])
            todos_pratos_do_restaurante.add(row[1])
            dias_que_restaurante_teve_clientes.add(row[2])

    a = collections.Counter(lista_da_maria).most_common(1)[0][0]
    b = todos_pratos_do_restaurante.difference(pratos_que_joao_consumiu)
    c = dias_que_restaurante_teve_clientes.difference(dias_que_joao_foi)

    with open("data/mkt_campaign.txt", "w") as file:
        file.write(f"{a}\n"
                   f"{total_hamburguers_do_arnaldo}\n"
                   f"{b}\n"
                   f"{c}\n")


print(analyze_log("data/orders_1.csv"))
