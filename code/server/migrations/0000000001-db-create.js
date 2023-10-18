exports.up = async function (DB) {

    await DB`
      CREATE TABLE IF NOT EXISTS users (
        id serial PRIMARY KEY,
        name VARCHAR(256) NOT NULL,
        email VARCHAR(256) NOT NULL UNIQUE,
        password VARCHAR(256) NOT NULL,
        profile_image VARCHAR(256) DEFAULT '',
        created_on BIGINT NOT NULL
      )
    `;

    await DB`CREATE INDEX IF NOT EXISTS users_email ON users (email)`;

    await DB`
      CREATE TABLE IF NOT EXISTS tasks (
        id serial PRIMARY KEY,
        title VARCHAR(256) NOT NULL,
        description VARCHAR(256) DEFAULT '',
        due_date BIGINT NOT NULL,
        priority int NOT NULL,
        status varchar(256) DEFAULT 'OPEN',
        created_on BIGINT NOT NULL,
        CONSTRAINT chk_status CHECK (status IN ('OPEN', 'CLOSED'))
      );
    `;

    await DB`CREATE INDEX IF NOT EXISTS tasks_due_date ON tasks (due_date)`;
    await DB`CREATE INDEX IF NOT EXISTS tasks_priority ON tasks (priority)`;
  }
  
  exports.down = async function (DB) {
    // My pre-configured "undo" function
    await DB`DROP INDEX tasks_priority`
    await DB`DROP INDEX tasks_due_date`
    await DB`DROP TABLE tasks`

    await DB`DROP INDEX users_email`
    await DB`DROP TABLE users`;    
  }