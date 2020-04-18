const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  
  return response.status(201).json(repositories);

});

app.post("/repositories", (request, response) => {
  
  const { title, url, techs } = request.body;

  var repository = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repository);
  
  return response.status(200).json(repository);

});

app.put("/repositories/:id", (request, response) => {
  
  const { id } = request.params;

  const { title, url, techs } = request.body;

  if (!isUuid(id)){
    return response.status(400).json('Invalid repository ID');
  }

  const repositoryIndex = repositories.findIndex(repository => repository.id===id);

  if (repositoryIndex < 0){
    return response.status(400).json('Not found repository with this ID');
  }
  
  repositories[repositoryIndex].title = title;
  repositories[repositoryIndex].url = url;
  repositories[repositoryIndex].techs = techs;

  return response.status(200).json(repositories[repositoryIndex]);

});

app.delete("/repositories/:id", (request, response) => {
  
  const { id } = request.params;

  if (!isUuid(id)){
    return response.status(400).json('Invalid repository ID');
  }

  const repositoryIndex = repositories.findIndex(repository => repository.id===id);

  if (repositoryIndex < 0){
    return response.status(400).json('Not found repository with this ID');
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {

  const { id } = request.params;

  if (!isUuid(id)){
    return response.status(400).json('Invalid repository ID');
  }

  const repositoryIndex = repositories.findIndex(repository => repository.id===id);

  if (repositoryIndex < 0){
    return response.status(400).json('Not found repository with this ID');
  }

  repositories[repositoryIndex].likes++;

  return response.status(200).json(repositories[repositoryIndex]);
  
});

module.exports = app;
