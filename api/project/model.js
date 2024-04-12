// build your `Project` model here
const db = require('../../data/dbConfig');

// Create a new project
async function add(projectData) {
    const [newProject] = await db('projects').insert(projectData, ['*']); // Ensures all fields are returned
    return newProject;
}

// Retrieve a project by ID
async function getProjectByID(project_id) {
    return db('projects').where({ project_id }).first(); // Returns a single project object
}

// Retrieve all projects
async function getAll() {
    return db('projects');
}

module.exports = {
    getProjectByID,
    add,
    getAll
}