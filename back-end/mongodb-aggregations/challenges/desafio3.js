db.movies.aggregate([
  {
    $match: {
      "imdb.rating": {
        $gte: 7,
      },
      genres: {
        $not: {
          $in: ["Crime", "Horror"],
        },
      },
      $or: [
        { rated: "PG" },
        { rated: "G" },
      ],
      languages: {
        $all: ["English", "Spanish"],
      },
    },
  },
  {
    $sort: {
      year: -1,
      "imdb.rating": -1,
      title: 1,
      _id: 1,
    },
  },
  {
    $project: {
      titulo: "$title",
      avaliado: "$rated",
      notaIMDB: "$imdb.rating",
      votosIMDB: "$imdb.votes",
      ano: "$year",
      _id: false,
    },
  },
]);