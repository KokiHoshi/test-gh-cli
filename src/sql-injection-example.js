// 検証用：SQLインジェクションの例（修正済み）
// 修正内容：文字列連結の代わりにプリペアドステートメント（パラメータ化クエリ）を使用。

'use strict';

function getUserById(db, userId) {
  const query = 'SELECT * FROM users WHERE id = ?';
  const params = [userId];
  // 実際の使用例: db.execute(query, params)
  return { query, params };
}

function searchUsers(db, name) {
  const query = 'SELECT * FROM users WHERE name LIKE ?';
  const params = ['%' + name.replace(/[%_\\]/g, '\\$&') + '%'];
  // 実際の使用例: db.execute(query, params)
  return { query, params };
}

module.exports = { getUserById, searchUsers };
