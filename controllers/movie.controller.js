//fichier movie.controller.js
const db = require("../models");
const Movie = db.movies;

exports.create = (req, res) => {
  // Vérifier si les données requises sont présentes dans la requête
  if (!req.body.title || !req.body.release) {
    res.status(400).send({ message: "Title and release year are required fields!" });
    return;
  }

  // Créer un nouveau film
  const movie = new Movie({
    id: req.body.id,
    title: req.body.title,
    release: req.body.release,
    synopsis: req.body.synopsis || "", 
  });

  // Enregistrer le film dans la base de données
  movie
    .save(movie)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Movie.",
      });
    });
};

// Retrieve all Movies from the database.
exports.findAll = (req, res) => {
  Movie.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving movies.",
      });
    });
};

// Find a single movie with an id 
exports.findOne = (req, res) => {
  const id = req.params.id;

  Movie.findById(id)
    .then(data => {
      if (!data) {
        res.status(404).send({ message: "Movie not found with id " + id });
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving movie with id " + id });
    });
};

// Update a Movie by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty!" });
  }

  const id = req.params.id;

  Movie.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Movie with id=${id}. Movie not found!`,
        });
      } else {
        res.send({ message: "Movie was updated successfully." });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Error updating Movie with id=" + id });
    });
};

// Delete a Movie with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Movie.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Movie with id=${id}. Movie not found!`,
        });
      } else {
        res.send({ message: "Movie was deleted successfully." });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Could not delete Movie with id=" + id });
    });
};

// Delete all Movies from the database
exports.deleteAll = (req, res) => {
  Movie.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Movies were deleted successfully!`,
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all movies.",
      });
    });
};
