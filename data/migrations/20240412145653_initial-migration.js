/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema
      // Create 'projects' table
      .createTable('projects', table => {
        table.increments('project_id'); // Primary Key
        table.string('project_name', 255).notNullable();
        table.text('project_description');
        table.integer('project_completed').notNullable().defaultTo(0); // Adjusted per requirements
      })
      // Create 'resources' table
      .createTable('resources', table => {
        table.increments('resource_id'); // Primary Key
        table.string('resource_name', 255).notNullable().unique();
        table.text('resource_description'); // 'text' for potentially longer descriptions
      })
      // Create 'tasks' table
      .createTable('tasks', table => {
        table.increments('task_id'); // Primary Key
        table.text('task_description').notNullable();
        table.text('task_notes');
        table.integer('task_completed').notNullable().defaultTo(0);
        table.integer('project_id') // Foreign Key
          .unsigned()
          .notNullable()
          .references('project_id')
          .inTable('projects')
          .onDelete('RESTRICT')
          .onUpdate('RESTRICT');
      })
      // Create 'project_resources' table to link resources with projects
      .createTable('project_resources', table => {
        table.increments('project_resources_id'); // Primary Key
        table.integer('project_id') // Foreign Key
          .unsigned()
          .notNullable()
          .references('project_id')
          .inTable('projects')
          .onDelete('CASCADE');
        table.integer('resource_id') // Foreign Key
          .unsigned()
          .notNullable()
          .references('resource_id')
          .inTable('resources')
          .onDelete('CASCADE');
      });
  };
  

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema
    .dropTableIfExists('project_resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects');
};
