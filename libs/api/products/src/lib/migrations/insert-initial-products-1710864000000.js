const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class InsertInitialProducts1710864000000 {
  async up(queryRunner) {
    // Create table if it doesn't exist
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        product_code VARCHAR(50) NOT NULL,
        product_description VARCHAR(255) NOT NULL,
        location VARCHAR(100) NOT NULL,
        price DECIMAL(10,2) NOT NULL
      );
    `);

    // Insert data
    await queryRunner.query(`
      INSERT INTO products (id, product_code, product_description, location, price) VALUES
      (1, '1000', 'Sedan', 'West Malaysia', 300.00),
      (2, '1000', 'Sedan', 'East Malaysia', 450.00),
      (3, '2000', 'SUV', 'West Malaysia', 500.00),
      (4, '2000', 'SUV', 'East Malaysia', 650.00);
    `);

    // Reset the auto-increment sequence
    await queryRunner.query(`
      SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
    `);
  }

  async down(queryRunner) {
    // Delete the data
    await queryRunner.query(`
      DELETE FROM products
      WHERE id IN (1, 2, 3, 4);
    `);

    // Optionally, drop the table
    await queryRunner.query(`
      DROP TABLE IF EXISTS products;
    `);
  }
}
