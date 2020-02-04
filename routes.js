const { Router } = require("express");
const routes = Router();

const projects = [];

routes.get('/', (req, res) => {
  return res.json(projects);
});

routes.post('/', (req, res) => {
  const { id, title } = req.body;
  const tasks = [];

  projects.push({ id, title, tasks });

  return res.json(projects);
});

routes.post('/:id/tasks', (req, res) => {
  const { title } = req.body;
  const { id } = req.params;
  const paramId = projects.findIndex(item => item.id == id);

  projects[paramId].tasks.push(title);

  return res.json(projects);
});

routes.put('/:id', (req, res) => {
  const { title } = req.body;
  const { id } = req.params;
  const paramId = projects.findIndex(item => item.id == id);

  projects[paramId].title = title;
  return res.json(projects);
});

routes.delete('/:id', (req, res) => {
  const { id } = req.params;
  const paramId = projects.findIndex(item => item.id == id);

  projects.splice(paramId, 1);
  return res.json(projects);
});


module.exports = routes;
