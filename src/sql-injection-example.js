// 検証用：SQLインジェクションの例
// 危険な理由：ユーザー入力を SQL 文字列に直接連結すると、
//             悪意ある入力によってデータベースを不正操作されるリスクがある。
// Snyk Code で「SQL Injection」として検出されることを確認するためのサンプル。

'use strict';

// NG例：ユーザー入力を SQL に直接連結
function getUserById(userId) {
  // 本来はプリペアドステートメント（? プレースホルダー）を使うべき
  const query = "SELECT * FROM users WHERE id = '" + userId + "'";
  console.log('実行クエリ（検証用）:', query);
  return query;
}

// NG例：検索条件もそのまま連結
function searchUsers(name) {
  const query = 'SELECT * FROM users WHERE name LIKE "%' + name + '%"';
  console.log('実行クエリ（検証用）:', query);
  return query;
}

module.exports = { getUserById, searchUsers };
