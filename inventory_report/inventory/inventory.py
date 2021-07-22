from abc import ABC, abstractmethod
from inventory_report.reports.simple_report import SimpleReport
from inventory_report.reports.complete_report import CompleteReport
import csv
import json
import xml.etree.ElementTree as ET


class Importer(ABC):
    def __init__(self, filepath):
        self.filepath = filepath

    @abstractmethod
    def de_serialize(self):
        raise NotImplementedError


class TransformDataCSV(Importer):
    def de_serialize(self):
        with open(self.filepath) as file:
            return [row for row in csv.DictReader(file)]


class TransformDataJSON(Importer):
    def de_serialize(self):
        with open(self.filepath) as file:
            return json.load(file)


class TransformDataXML(Importer):
    def transform_data(self, file_reader):
        list_file = []
        for child in file_reader:
            obj = {
                "id": int(child[0].text),
                "nome_do_produto": child[1].text,
                "nome_da_empresa": child[2].text,
                "data_de_fabricacao": child[3].text,
                "data_de_validade": child[4].text,
                "numero_de_serie": child[5].text,
            }
            list_file.append(obj)
        return list_file

    def de_serialize(self):
        tree = ET.parse(self.filepath)
        root = tree.getroot()
        result = self.transform_data(root)
        return result


class Inventory:
    @classmethod
    def import_data(cls, export_file, type_report="simples"):
        dictionary = ""

        if ".csv" in export_file:
            dictionary = TransformDataCSV(export_file).de_serialize()

        elif ".json" in export_file:
            dictionary = TransformDataJSON(export_file).de_serialize()

        elif ".xml" in export_file:
            dictionary = TransformDataXML(export_file).de_serialize()

        if type_report == "completo":
            return CompleteReport.generate(dictionary)
        return SimpleReport.generate(dictionary)
