// 検証用：SQLインジェクションの例
// このファイルは Snyk Code の検出検証専用です。本番利用禁止。
// 危険な理由：SQL文字列にユーザー入力を直接連結すると、クエリの改ざんが可能になる。

'use strict';

// ❌ 危険：ユーザー入力を SQL に直接連結
function getUserById(db, userId) {
  // 攻撃例: userId = "1 OR 1=1; DROP TABLE users; --"
  const query = 'SELECT * FROM users WHERE id = ' + userId;
  return db.execute(query);
}

// ❌ 危険：名前でのユーザー検索
function searchUsers(db, name) {
  // 攻撃例: name = "' OR '1'='1"
  const query = "SELECT * FROM users WHERE name = '" + name + "'";
  return db.execute(query);
}

// ❌ 危険：ログイン認証でのSQLインジェクション
function loginUser(db, username, password) {
  // 攻撃例: username = "admin'--" でパスワードチェックをバイパス可能
  const query = "SELECT * FROM users WHERE username = '" + username +
                "' AND password = '" + password + "'";
  return db.execute(query);
}

module.exports = { getUserById, searchUsers, loginUser };
