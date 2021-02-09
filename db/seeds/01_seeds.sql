-- Users table seeds
INSERT INTO
  users (name, email, password)
VALUES
  ('Alice', 'alice@example.com', 'password'),
  ('Joe', 'joe@example.com', 'password'),
  ('Anthony', 'Anthony@example.com', 'password'),
  ('Adam', 'adam@example.com', 'password'),
  ('hello', 'hello@world.com', 'password');

INSERT INTO
  categories (category_name)
VALUES
  ('buy'),
  ('eat'),
  ('read'),
  ('watch');

INSERT INTO
  todos (
    user_id,
    category_id,
    title,
    is_active,
    created_date,
    scheduled_date
  )
VALUES
  -- user 1
  (
    1,
    1,
    'a christmas tree',
    TRUE,
    '06-03-2020',
    '06-03-2020'
  ),
  (
    1,
    3,
    'harry potter',
    TRUE,
    '06-03-2020',
    '06-03-2020'
  ),
  (
    1,
    1,
    'a car',
    TRUE,
    '12-01-2020',
    '06-03-2020'
  ),
  (
    1,
    2,
    'burger',
    TRUE,
    '10-10-2020',
    '06-03-2020'
  ),
  (
    1,
    4,
    'forrest gump',
    TRUE,
    '11-02-2020',
    '06-03-2020'
  ),
  (
    1,
    2,
    'banana',
    TRUE,
    '03-10-2020',
    '06-03-2020'
  ),
  -- user 2
  (
    2,
    2,
    'pizza',
    TRUE,
    '01-06-2020',
    '06-03-2020'
  ),
  (
    2,
    3,
    'the prophet',
    TRUE,
    '01-06-2020',
    '06-03-2020'
  );
