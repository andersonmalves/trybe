from inventory_report.reports.simple_report import SimpleReport
from inventory_report.reports.complete_report import CompleteReport
import csv


class Inventory:
    def transform_data(file):
        file.__next__()
        list_file = []

        for row in file:
            obj = {
                "id": int(row[0]),
                "nome_do_produto": row[1],
                "nome_da_empresa": row[2],
                "data_de_fabricacao": row[3],
                "data_de_validade": row[4],
                "numero_de_serie": row[5],
            }
            list_file.append(obj)
        return list_file

    @classmethod
    def import_data(cls, export_file, type_report="simples"):
        dictionary = []
        with open(export_file) as file:
            csv_reader = csv.reader(file, delimiter=",", quotechar='"')
            dictionary = cls.transform_data(csv_reader)
            if type_report == "completo":
                return CompleteReport.generate(dictionary)
            return SimpleReport.generate(dictionary)


# Para testar
relatorio = Inventory.import_data(
    "inventory_report/data/inventory.csv", "simples"
)

print(relatorio)

relatorio_completo = Inventory.import_data(
    "inventory_report/data/inventory.csv", "completo"
)

print(relatorio_completo)


