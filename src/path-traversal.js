// 検証用：パストラバーサル（ディレクトリトラバーサル）の例
// このファイルは Snyk Code の検出検証専用です。本番利用禁止。
// 危険な理由：ユーザー入力をサニタイズせずにファイルパスに使用すると、
// 任意ファイルへのアクセス（例: ../../etc/passwd）が可能になる。

'use strict';

const fs = require('fs');
const path = require('path');

// ❌ 危険：ユーザー入力をそのままファイルパスに使用
function readFile(filename) {
  // 攻撃例: filename = "../../etc/passwd"
  const filePath = '/var/www/uploads/' + filename;
  return fs.readFileSync(filePath, 'utf8');
}

// ❌ 危険：path.join を使っても入力を検証していない
function downloadFile(req, res) {
  const fileName = req.query.file;
  // 攻撃例: file = "../../../etc/shadow"
  const filePath = path.join(__dirname, 'public', fileName);
  res.sendFile(filePath);
}

// ❌ 危険：ユーザー指定のディレクトリを直接使用
function listDirectory(userDir) {
  // 攻撃例: userDir = "../../"
  return fs.readdirSync('/app/data/' + userDir);
}

module.exports = { readFile, downloadFile, listDirectory };
