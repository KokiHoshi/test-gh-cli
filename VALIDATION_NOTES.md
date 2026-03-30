# VALIDATION_NOTES.md（検証用）

> このファイルは Snyk 動作検証のための手順・検出箇所をまとめた説明ドキュメントです。

---

## 検出が期待される箇所

### Snyk Open Source（依存関係の脆弱性）

`package.json` に以下の脆弱な依存関係が含まれています：

| パッケージ | バージョン | 検出理由 |
|---|---|---|
| `lodash` | 4.17.4 | Prototype Pollution（CVE-2019-10744, CVE-2020-8203 等） |
| `express` | 4.17.1 | 複数の既知脆弱性（ReDoS, Path Traversal 等） |

---

### Snyk Code（ソースコードの脆弱性）

以下のファイルに意図的な脆弱性が含まれています：

| ファイル | 検出内容 | 危険な箇所 |
|---|---|---|
| `src/hardcoded-secret.js` | ハードコードされた認証情報 | `API_KEY`, `DB_PASSWORD`, `JWT_SECRET`, `AWS_ACCESS_KEY` |
| `src/dangerous-eval.js` | `eval()` による任意コード実行 | `calculate()`, `runDynamic()`, `executeExpression()` |
| `src/xss-example.js` | XSS（クロスサイトスクリプティング） | `innerHTML` への直接代入、`document.write()` |
| `src/sql-injection-example.js` | SQLインジェクション | SQL 文字列への直接連結 |

---

## 検証手順

### ステップ 1：ブランチの確認

```bash
git checkout feature/snyk-test
git status
```

### ステップ 2：コミット＆プッシュ

```bash
git add .
git commit -m "検証用：脆弱なコードと依存関係を追加（Snyk 検証専用）"
git push origin feature/snyk-test
```

### ステップ 3：Pull Request の作成

```bash
gh pr create \
  --title "検証用：Snyk 動作確認（マージ禁止）" \
  --base main \
  --body "このPRはSnykの動作検証専用です。マージしないでください。"
```

### ステップ 4：Snyk の結果確認

PR の Checks タブで以下を確認：

- [ ] Snyk Open Source のスキャン結果が表示される
- [ ] `lodash` / `express` の脆弱性が検出される
- [ ] Snyk Code のスキャン結果が表示される
- [ ] `hardcoded-secret.js` のシークレットが検出される
- [ ] `dangerous-eval.js` の eval 使用が検出される
- [ ] `xss-example.js` の XSS が検出される
- [ ] `sql-injection-example.js` の SQL インジェクションが検出される
- [ ] 該当行にインラインコメントが付く

### ステップ 5：PR クローズ＆ブランチ削除

```bash
# PR をクローズ（マージしない）
gh pr close <PR番号>

# ブランチを削除
git branch -d feature/snyk-test
git push origin --delete feature/snyk-test
```

---

## 注意事項

- このリポジトリの内容は**絶対に本番環境にマージしない**こと
- 検証完了後はブランチまたはリポジトリを削除すること
- 脆弱なコードは検証専用であり、実際の攻撃コードではない

---

*このドキュメントは検証用です。本番運用には使用しないでください。*
