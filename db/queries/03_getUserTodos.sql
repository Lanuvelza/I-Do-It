SELECT
  users.id as user_id,
  todos.*
FROM
  todos
  JOIN users ON todos.user_id = users.id
WHERE
  user_id = 1
LIMIT
  10;
