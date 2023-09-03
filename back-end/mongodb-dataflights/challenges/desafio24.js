db.voos.findOne(
  {
    litrosCombustivel: { $exists: true, $lt: 600 },
    $nor: [{ "empresa.nome": "GOL" }, { "empresa.nome": "AZUL" }],
  },
  {
    _id: false,
    vooId: true,
    "empresa.nome": true,
    litrosCombustivel: true,
  },
);
