const { Router } = require("express");
const routes = Router();

const projects = [];

function checkIdMiddleware(req, res, next) {
  const { id } = req.params;

  // const idsArray = projects.map(item => item.id);
  // const paramId = idsArray.includes(id);
  // const paramId = projects.includes(id);
  // const paramId = projects.filter(item => item.id == id);
  const paramId = projects.find(item => item.id == id);
  console.log("id required: ", paramId);

  if (!paramId) {
    return res.status(400).send('Project id not found.');
  }
  next();
}

routes.get('/', (req, res) => {
  return res.json(projects);
});

routes.post('/', (req, res) => {
  const { id, title } = req.body;
  const tasks = [];

  projects.push({ id, title, tasks });

  return res.json(projects);
});

routes.post('/:id/tasks', checkIdMiddleware, (req, res) => {
  const { title } = req.body;
  const { id } = req.params;
  const paramId = projects.findIndex(item => item.id == id);

  projects[paramId].tasks.push(title);

  return res.json(projects);
});

routes.put('/:id', checkIdMiddleware, (req, res) => {
  const { title } = req.body;
  const { id } = req.params;
  const paramId = projects.findIndex(item => item.id == id);

  projects[paramId].title = title;
  return res.json(projects);
});

routes.delete('/:id', checkIdMiddleware, (req, res) => {
  const { id } = req.params;
  const paramId = projects.findIndex(item => item.id == id);

  projects.splice(paramId, 1);
  return res.json(projects);
});


module.exports = routes;
