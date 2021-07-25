from inventory_report.importer.importer import Importer
import xml.etree.cElementTree as ET


class XmlImporter(Importer):
    @staticmethod
    def import_data(path):
        if path.endswith(".xml"):
            xml = ET.parse(path)
            xml_root = xml.getroot()
            data = [
                {item.tag: item.text for item in record} for record in xml_root
            ]

            return data
        else:
            raise ValueError("Arquivo inválido")
