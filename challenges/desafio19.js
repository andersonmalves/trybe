// Source: https://stackoverflow.com/questions/9254351/how-can-i-rename-a-field-for-all-documents-in-mongodb
db.produtos.updateMany(
  {},
  {
    $rename: {
      descricao: "descricaoSite",
    },
  },
);

db.produtos.find(
  {},
  {
    nome: true,
    descricaoSite: true,
    _id: false,
  },
);
