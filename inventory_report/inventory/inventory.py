import csv


def import_data(path_file):
    with open(path_file) as file:
        status_reader = csv.reader(file, delimiter=",", quotechar='"')
        print(*status_reader)


if __name__ == "__main__":
    import_data("inventory_report/data/inventory.csv")
