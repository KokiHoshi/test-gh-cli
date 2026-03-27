// 検証用：eval() の危険な使用例
// 危険な理由：外部から受け取った文字列を eval() で実行すると、
//             任意のコードを実行される（リモートコード実行）リスクがある。
// Snyk Code で「Code Injection」として検出されることを確認するためのサンプル。

'use strict';

// NG例：ユーザー入力をそのまま eval() に渡す
function calculate(userInput) {
  // 本来は安全な数式パーサーを使うべき
  return eval(userInput);
}

// NG例：動的に関数を生成（eval と同様のリスク）
function runDynamic(code) {
  const fn = new Function('return ' + code);
  return fn();
}

module.exports = { calculate, runDynamic };
