import collections


class TrackOrders:
    def __len__(self):
        return len(self.pedidos)

    def __init__(self):
        self.pedidos = []

    def add_new_order(self, costumer, order, day):
        return self.pedidos.append({"a": costumer, "b": order, "c": day})

    def get_most_ordered_dish_per_costumer(self, costumer):
        lista_do_consumidor = []
        for row in self.pedidos:
            if row["a"] == costumer:
                lista_do_consumidor.append(row["b"])
        return collections.Counter(lista_do_consumidor).most_common(1)[0][0]

    def get_never_ordered_per_costumer(self, costumer):
        c = set()
        d = set()

        for row in self.pedidos:
            if row["a"] == costumer:
                d.add(row["b"])
            c.add(row["b"])

        return c.difference(d)

    def get_days_never_visited_per_costumer(self, costumer):
        e = set()
        f = set()

        for row in self.pedidos:
            if row["a"] == costumer:
                f.add(row["c"])
            e.add(row["c"])

        return e.difference(f)

    def get_busiest_day(self):
        g = []

        for row in self.pedidos:
            g.append(row["c"])
        
        return collections.Counter(g).most_common(1)[0][0]

    def get_least_busy_day(self):
        h = []

        for row in self.pedidos:
            h.append(row["c"])
        
        return collections.Counter(h).most_common()[-1][0]



track_orders = TrackOrders()
track_orders.add_new_order("jorge", "frango", "domingo")
track_orders.add_new_order("maria", "hamburguer", "terca-feira")
track_orders.add_new_order("arnaldo", "misto-quente", "terca-feira")

most_ordered = track_orders.get_most_ordered_dish_per_costumer("maria")
print(most_ordered)