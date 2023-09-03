from collections import Counter
from datetime import datetime


class SimpleReport:
    @classmethod
    def generate(cls, dictionary):
        list_date = [value["data_de_fabricacao"] for value in dictionary]
        list_date.sort(reverse=False)
        last_date = list_date[0]

        date_now = datetime.now()

        # list_validity = [
        #     value["data_de_validade"]
        #     for value in dictionary
        #     if datetime.strptime(value["data_de_validade"], "%Y-%m-%d")
        #     > date_now
        # ]

        list_validity = []
        for item in dictionary:
            date_validity = item["data_de_validade"]
            year, month, day = map(int, date_validity.split("-"))
            if datetime(year=year, month=month, day=day) > date_now:
                list_validity.append(date_validity)

        list_validity.sort(reverse=False)

        if len(list_validity) > 0:
            date_validity = list_validity[0]

        list_name = [value["nome_da_empresa"] for value in dictionary]
        name, _ = Counter(list_name).most_common()[0]

        result = f"Data de fabricação mais antiga: {last_date}\n"
        result += f"Data de validade mais próxima: {date_validity}\n"
        result += (
            f"Empresa com maior quantidade de produtos estocados: {name}\n"
        )

        return result
