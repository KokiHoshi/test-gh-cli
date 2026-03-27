// 検証用：XSS（クロスサイトスクリプティング）の例（修正済み）
// 修正内容：innerHTML の代わりに textContent を使用。

'use strict';

// textContent はHTMLとして解釈されないため XSS を防ぐ
function renderUserContent(userInput) {
  const div = { textContent: '' };
  div.textContent = userInput;
  return div;
}

function renderFromUrl(urlParam) {
  const container = { textContent: '' };
  container.textContent = '検索結果：' + urlParam;
  return container;
}

module.exports = { renderUserContent, renderFromUrl };
