/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('favorites').del()
  await knex('favorites').insert([
    { id: 1, title: 'Dark Knight', main_character: 'Batman', year_released: 2008 },
    { id: 2, title: 'High Fidelity', main_character: 'Rob Gordon', year_released: 2000 },
    { id: 3, title: 'Dogma', main_character: 'Bartleby', year_released: 1999 }
  ]);
};
