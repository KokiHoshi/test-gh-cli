// 検証用：脆弱な暗号化・ハッシュの使用例
// このファイルは Snyk Code の検出検証専用です。本番利用禁止。
// 危険な理由：MD5/SHA1 はパスワードハッシュには使用してはならない。
// また、弱い鍵長や予測可能な乱数はセキュリティリスクになる。

'use strict';

const crypto = require('crypto');

// ❌ 危険：MD5 でパスワードをハッシュ（衝突耐性なし、レインボーテーブル攻撃に弱い）
function hashPassword(password) {
  return crypto.createHash('md5').update(password).digest('hex');
}

// ❌ 危険：SHA1 も同様に安全ではない
function hashToken(token) {
  return crypto.createHash('sha1').update(token).digest('hex');
}

// ❌ 危険：弱い鍵（短すぎる鍵長）で AES 暗号化
function encryptData(data) {
  const key = 'weak_key_12345';  // ❌ 短すぎる鍵、ハードコード
  const iv = Buffer.alloc(16, 0); // ❌ 固定 IV（初期化ベクトル）
  const cipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(key.padEnd(16)), iv);
  return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
}

// ❌ 危険：Math.random() をセキュリティ用途に使用（予測可能）
function generateSessionToken() {
  return Math.random().toString(36).substring(2);
}

module.exports = { hashPassword, hashToken, encryptData, generateSessionToken };
