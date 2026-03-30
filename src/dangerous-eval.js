// 検証用：eval() の危険な使用例
// このファイルは Snyk Code の検出検証専用です。本番利用禁止。
// 危険な理由：ユーザー入力を eval() に渡すと、任意のコードが実行される（コードインジェクション）。

'use strict';

// ❌ 危険：ユーザー入力を eval() に直接渡す
function calculate(userInput) {
  // 攻撃例: userInput = "require('child_process').execSync('rm -rf /')"
  return eval(userInput);
}

// ❌ 危険：動的コード実行
function runDynamic(command) {
  const code = 'console.log("Running: ' + command + '")';
  eval(code);
}

// ❌ 危険：new Function() も eval と同様に危険
function executeExpression(expr) {
  const fn = new Function('return ' + expr);
  return fn();
}

module.exports = { calculate, runDynamic, executeExpression };
