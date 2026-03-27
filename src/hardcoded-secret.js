// 検証用：ハードコードされたシークレット
// 危険な理由：APIキーやパスワードをソースコードに直接書くと、
//             リポジトリ公開時や git log から漏洩するリスクがある。
// Snyk Code で「Hardcoded Secret」として検出されることを確認するためのサンプル。

'use strict';

// NG例：APIキーをハードコード（本来は環境変数から取得すべき）
const API_KEY = 'AKIAIOSFODNN7EXAMPLE1234567890abcdef';
const DB_PASSWORD = 'P@ssw0rd!SuperSecret123';
const JWT_SECRET = 'my-super-secret-jwt-key-do-not-share';

function connectToService() {
  console.log('Connecting with API key:', API_KEY);
  return { apiKey: API_KEY, password: DB_PASSWORD };
}

module.exports = { connectToService };
