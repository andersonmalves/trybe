from inventory_report.importer.importer import Importer
import json


class JsonImporter(Importer):
    @staticmethod
    def import_data(path):
        if path.endswith(".json"):
            with open(path, mode="r") as file:
                reader_file = json.load(file)
            result = []
            for data in reader_file:
                result.append(data)
            return result
        else:
            raise ValueError("Arquivo inválido")
