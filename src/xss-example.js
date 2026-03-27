// 検証用：XSS（クロスサイトスクリプティング）の例
// 危険な理由：ユーザー入力をサニタイズせず innerHTML に代入すると、
//             悪意あるスクリプトが実行される（XSS）リスクがある。
// Snyk Code で「Cross-site Scripting (XSS)」として検出されることを確認するためのサンプル。

'use strict';

// NG例：ユーザー入力を直接 innerHTML に設定
function renderUserContent(userInput) {
  const div = { innerHTML: '' };
  // 本来は textContent を使うか DOMPurify でサニタイズすべき
  div.innerHTML = userInput;
  return div;
}

// NG例：URL パラメータをそのままページに反映
function renderFromUrl(urlParam) {
  const container = { innerHTML: '' };
  container.innerHTML = '<p>検索結果：' + urlParam + '</p>';
  return container;
}

module.exports = { renderUserContent, renderFromUrl };
