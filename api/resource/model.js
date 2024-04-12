// build your `Resource` model here
const db = require('../../data/dbConfig');

// Function to retrieve a resource by its ID
async function getResourceByID(resource_id) {
    return db('resources').where({ resource_id }).first();
}

// Function to add a new resource to the database
async function add(resource) {
    const [newResource] = await db('resources').insert(resource, ['resource_id', 'resource_name', 'resource_description']);
    return newResource;  // Return the newly added resource with its ID and other details
}

// Function to retrieve all resources from the database
async function getAll() {
    return db('resources').select('*');  // Fetch all records from the 'resources' table
}

module.exports = {
    getResourceByID,
    add,
    getAll
};

