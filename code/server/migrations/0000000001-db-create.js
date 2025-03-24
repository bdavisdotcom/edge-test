exports.up = async function (DB) {

    await DB`
      CREATE TABLE IF NOT EXISTS users (
        id serial PRIMARY KEY,
        name VARCHAR(256) NOT NULL,
        email VARCHAR(256) NOT NULL UNIQUE,
        password VARCHAR(256) NOT NULL,
        profile_image VARCHAR(256) DEFAULT '',
        password_hash_salt VARCHAR(256) NOT NULL,
        created_at BIGINT NOT NULL,
        updated_at BIGINT NOT NULL
      )
    `;

    await DB`CREATE INDEX IF NOT EXISTS idx_users_email ON users (email)`;

    await DB`
      CREATE TABLE IF NOT EXISTS tasks (
        id serial PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(256) NOT NULL,
        description TEXT DEFAULT '',
        due_date BIGINT NOT NULL,
        status varchar(256) DEFAULT 'OPEN',
        created_at BIGINT NOT NULL,
        updated_at BIGINT NOT NULL,
        CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(id),
        CONSTRAINT chk_status CHECK (status IN ('OPEN', 'CLOSED'))
      );
    `;

    await DB`CREATE INDEX IF NOT EXISTS idx_tasks_created_at ON tasks (created_at)`;
    await DB`CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks (due_date)`;

  }
  
  exports.down = async function (DB) {

    await DB`DROP INDEX idx_tasks_due_date`
    await DB`DROP INDEX idx_tasks_created_at`
    await DB`DROP TABLE tasks`

    await DB`DROP INDEX idx_users_email`
    await DB`DROP TABLE users`;    

  }