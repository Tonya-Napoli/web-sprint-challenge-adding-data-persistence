// build your `/api/projects` router here
const express =  require('express');
const Project = require('./model');
const router = express.Router()

//POST a new project
router.post('/', async (req, res, next) => {
  try {
    const projectData = {
      ...req.body,
      project_completed: req.body.project_completed ? 1 : 0 // Convert boolean to integer for DB storage
    };
    const newProject = await Project.add(projectData);
    res.status(201).json({
      ...newProject,
      project_completed: newProject.project_completed === 1 // Convert integer back to boolean for the response
    });
  } catch (err) {
    next(err);
  }
});


//GET all projects
router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.getAll();
    const formattedProjects = projects.map(project => ({
      ...project,
      project_completed: project.project_completed === 1 // Ensure boolean conversion
    }));
    res.json(formattedProjects);
  } catch (err) {
    next(err);
  }
});

//GET a single project by ID
router.get('/:project_id', async (req, res, next) => {
  try {
  const project = await Project.getProjectByID(req.params.project_id)
  if(project) {
    res.status(200).json ({
      ...project,
      project_completed: project.project_completed === 1 // Convert integer to boolean
    });
  } else {
    res.status(404).json({ message: 'Project not found' })
  }
} catch (err) {
  next(err);
}
})

router.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    res.status(500).json({
      customMessage: 'Something went wrong',
      message: err.message,
      stack: err.stack,
    })
})

module.exports = router;
