// 検証用：eval() の危険な使用例（修正済み）
// 修正内容：eval() の代わりにホワイトリスト検証と事前定義コマンドマッピングを使用。

'use strict';

// 数値・演算子・スペースのみ許可するホワイトリスト検証
function calculate(userInput) {
  if (typeof userInput !== 'string') {
    throw new TypeError('入力は文字列である必要があります。');
  }
  if (!/^[0-9+\-*/(). ]+$/.test(userInput)) {
    throw new Error('不正な入力です。数値と演算子のみ使用できます。');
  }
  // 本番では mathjs などのライブラリを使用すること
  return Function('"use strict"; return (' + userInput.trim() + ')')();
}

// 事前定義されたコマンドのみ実行
function runDynamic(command) {
  const allowedCommands = {
    hello: () => 'Hello, World!',
    date: () => new Date().toISOString(),
  };
  if (!Object.prototype.hasOwnProperty.call(allowedCommands, command)) {
    throw new Error('許可されていないコマンドです。');
  }
  return allowedCommands[command]();
}

module.exports = { calculate, runDynamic };
