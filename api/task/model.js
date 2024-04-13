const db = require('../../data/dbConfig');

async function add(taskData) {
    const [newTask] = await db('tasks').insert(taskData, '*');
    return {
        ...newTask,
        task_completed: newTask.task_completed === 1  // Ensure consistent boolean conversion on creation
    };
}

async function getAllWithProjectDetails() {
    const tasks = await db('tasks as t')
        .join('projects as p', 't.project_id', 'p.project_id')
        .select(
            't.task_id',
            't.task_description',
            't.task_notes',
            't.task_completed',
            't.project_id',
            'p.project_name',
            'p.project_description'
        );
    return tasks.map(task => ({
        ...task,
        task_completed: task.task_completed === 1  // Convert integer to boolean
    }));
}

async function getTaskByID(task_id) {
    const task = await db('tasks')
        .where({ task_id })
        .first();

    if (task) {
        return {
            ...task,
            task_completed: task.task_completed === 1  // Convert integer to boolean
        };
    }

    return null;
}

module.exports = {
    add,
    getAllWithProjectDetails,
    getTaskByID
};

