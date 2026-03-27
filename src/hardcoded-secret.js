// 検証用：ハードコードされたシークレット（修正済み）
// 修正内容：APIキー等の機密情報を環境変数から取得するように変更。

'use strict';

const API_KEY = process.env.API_KEY;
const DB_PASSWORD = process.env.DB_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

function connectToService() {
  if (!API_KEY || !DB_PASSWORD) {
    throw new Error('必要な環境変数が設定されていません。');
  }
  console.log('Connecting to service...');
  return { connected: true };
}

module.exports = { connectToService };
