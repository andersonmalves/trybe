from abc import ABC, abstractmethod
from inventory_report.reports.simple_report import SimpleReport
from inventory_report.reports.complete_report import CompleteReport
import csv
import json


class Importer(ABC):
    def __init__(self, filepath):
        self.filepath = filepath

    @abstractmethod
    def transform_data(self, file_reader):
        raise NotImplementedError

    @abstractmethod
    def de_serialize(self):
        raise NotImplementedError


class TransformDataCSV(Importer):
    def de_serialize(self):
        with open(self.filepath) as file:
            csv_reader = csv.reader(file, delimiter=",", quotechar='"')
            _, *data = csv_reader

            return data

    def transform_data(self, file_reader):
        list_file = []
        for row in file_reader:
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


class TransformDataJSON(Importer):
    def de_serialize(self):
        with open(self.filepath) as file:
            return json.load(file)

    def transform_data(self, file_reader):
        list_file = []
        return list_file


class TransformDataXML(Importer):
    def de_serialize(self):
        with open(self.filepath) as file:
            print(file.read())
            return file.read()

    def transform_data(self, file_reader):
        list_file = []
        return list_file


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
        dictionary = ""

        if ".csv" in export_file:
            obj_csv = TransformDataCSV(export_file)
            csv_report = obj_csv.de_serialize()
            dictionary = obj_csv.transform_data(csv_report)
        elif ".json" in export_file:
            content_json = TransformDataJSON(export_file)
            dictionary = content_json.de_serialize()

        elif ".xml" in export_file:
            content_xml = TransformDataXML(export_file)
            print(content_xml)
            dictionary = "XML"

        if type_report == "completo":
            return CompleteReport.generate(dictionary)
        return SimpleReport.generate(dictionary)


# Para testar
# relatorio = Inventory.import_data(
#     "inventory_report/data/inventory.csv", "simples"
# )

# print(relatorio)

# relatorio_completo = Inventory.import_data(
#     "inventory_report/data/inventory.csv", "completo"
# )
# print(relatorio_completo)


# relatorio_completo = Inventory.import_data(
#     "inventory_report/data/inventory.json", "completo"
# )
# relatorio = Inventory.import_data(
#     "inventory_report/data/inventory.json", "simples"
# )

# print(relatorio)
# print(relatorio_completo)

relatorio_completo = Inventory.import_data(
    "inventory_report/data/inventory.xml", "completo"
)
relatorio = Inventory.import_data(
    "inventory_report/data/inventory.xml", "simples"
)

print(relatorio)
print(relatorio_completo)
