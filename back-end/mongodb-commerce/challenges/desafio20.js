db.produtos.updateMany(
  {
    nome: "Big Mac",
  },
  {
    $unset: {
      curtidas: "",
    },
  },
);

db.produtos.find(
  {},
  {
    nome: true,
    curtidas: true,
    _id: false,
  },
);
