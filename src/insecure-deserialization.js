// 検証用：安全でないデシリアライズの例
// このファイルは Snyk Code の検出検証専用です。本番利用禁止。
// 危険な理由：信頼できないデータを直接デシリアライズすると、
// オブジェクトプロトタイプの汚染や任意コード実行につながる。

'use strict';

// ❌ 危険：信頼できないJSONをプロトタイプのチェックなしにパース
function parseUserData(jsonString) {
  // 攻撃例（Prototype Pollution）:
  // jsonString = '{"__proto__":{"isAdmin":true}}'
  const data = JSON.parse(jsonString);
  return data;
}

// ❌ 危険：Object.assign でユーザー入力をオブジェクトにマージ
function updateConfig(baseConfig, userInput) {
  // 攻撃例: userInput = {"__proto__": {"polluted": true}}
  const userObj = JSON.parse(userInput);
  return Object.assign(baseConfig, userObj);
}

// ❌ 危険：YAML.load（js-yaml の旧API）は任意コード実行が可能
// （Snyk Open Source でも js-yaml の古いバージョンが検出される）
function loadYamlConfig(yamlString) {
  const yaml = require('js-yaml');
  // yaml.load() は危険なタグを許可する
  // 安全なのは yaml.safeLoad() または yaml.load() with { schema: yaml.FAILSAFE_SCHEMA }
  return yaml.load(yamlString);
}

// ❌ 危険：eval でJSONをパース（古いコード）
function legacyParse(data) {
  return eval('(' + data + ')');
}

module.exports = { parseUserData, updateConfig, loadYamlConfig, legacyParse };
