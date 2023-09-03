from inventory_report.reports.simple_report import SimpleReport
from typing import Counter


class CompleteReport(SimpleReport):
    @staticmethod
    def generate(dictionary):
        result_from_simple_report = SimpleReport.generate(dictionary)
        list_name = [value["nome_da_empresa"] for value in dictionary]
        list_name = dict(Counter(list_name))
        result_from_simple_report += "\nProdutos estocados por empresa: \n"
        for chave, valor in list_name.items():
            result_from_simple_report += f"- {chave}: {valor}\n"
        return result_from_simple_report
