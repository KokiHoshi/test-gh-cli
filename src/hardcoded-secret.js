// 検証用：ハードコードされたシークレット
// このファイルは Snyk Code の検出検証専用です。本番利用禁止。
// 危険な理由：APIキー・パスワード・JWTシークレットをソースコードに直接埋め込んでいるため、
// リポジトリへのアクセス権があれば誰でも機密情報を取得できる。

'use strict';

// ❌ 危険：シークレットをハードコード
const API_KEY = 'sk-1234567890abcdef1234567890abcdef';
const DB_PASSWORD = 'SuperSecret@Password123!';
const JWT_SECRET = 'my_jwt_secret_key_do_not_share';
const AWS_ACCESS_KEY = 'AKIAIOSFODNN7EXAMPLE';
const AWS_SECRET_KEY = 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY';

function connectToDatabase() {
  // ❌ 危険：接続文字列にパスワードを直書き
  const connectionString = `postgresql://admin:${DB_PASSWORD}@localhost:5432/mydb`;
  console.log('Connecting with:', connectionString);
  return connectionString;
}

function getAuthToken() {
  return JWT_SECRET;
}

module.exports = { connectToDatabase, getAuthToken, API_KEY };
