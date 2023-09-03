from inventory_report.importer.importer import Importer
import csv


class CsvImporter(Importer):
    @staticmethod
    def import_data(path):
        if path.endswith(".csv"):
            with open(path, mode="r") as file:
                reader_file = csv.DictReader(
                    file, delimiter=",", quotechar='"'
                )
                result = []
                for data in reader_file:
                    result.append(data)
                return result
        else:
            raise ValueError("Arquivo inválido")
