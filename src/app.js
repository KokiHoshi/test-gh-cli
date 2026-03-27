// 検証用：Snyk 動作検証サンプル（初期実装）
// このファイルは Snyk の検証専用です。本番利用禁止。
// 脆弱性を含むコードは別ブランチで追加されます。

'use strict';

function greet(name) {
  if (typeof name !== 'string' || name.trim() === '') {
    return 'Hello, World!';
  }
  return `Hello, ${name}!`;
}

console.log(greet('Snyk Verification'));
console.log('このプロジェクトは Snyk の動作検証専用です。');
