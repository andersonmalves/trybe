# from deque import Deque
class Queue:
    def __init__(self):
        self.fila = []

    def __len__(self):
        return len(self.fila)

    def enqueue(self, value):
        self.fila.append(value)

    def dequeue(self):
        if self.fila:
            return self.fila.pop(0)
        return None

    def search(self, index):
        if 0 <= index < len(self.fila):
            return self.fila[index]
        else:
            raise IndexError

    def __str__(self):
        return "Deque(" + ", ".join(map(lambda x: str(x), self.fila)) + ")"


if __name__ == "__main__":
    queue = Queue()
    elements_1 = [6, 7, 8, 9, 10]
    elements_2 = [1, 2, 3, 4, 5]

    # for elem in elements_1:
    #     deque.push_front(elem)

    for elem in elements_2:
        queue.enqueue(elem)
