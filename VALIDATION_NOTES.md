# VALIDATION_NOTES.md（検証用）

> このファイルは Snyk 動作検証のための手順・検出箇所をまとめた説明ドキュメントです。

---

## 検出が期待される箇所

### Snyk Open Source（依存関係の脆弱性）

脆弱な依存関係は **別ブランチ** にて `package.json` に追加します。

| パッケージ | 検出理由 |
|---|---|
| `lodash` 旧バージョン（例：`4.17.4`） | Prototype Pollution（CVE-2019-10744 等） |

> 初期ブランチには脆弱な依存関係は含まれていません。

---

### Snyk Code（ソースコードの脆弱性）

以下のファイルを **別ブランチ** で追加します：

| ファイル | 検出内容 |
|---|---|
| `src/hardcoded-secret.js` | ハードコードされた API キー・パスワード |
| `src/dangerous-eval.js` | `eval()` を使った危険なコード実行 |
| `src/xss-example.js` | `innerHTML` への直接代入（XSS リスク） |
| `src/sql-injection-example.js` | SQL 文字列の直接連結（SQLインジェクション） |

> 初期ブランチにはこれらのファイルは含まれていません。

---

## 検証手順

### ステップ 1：脆弱性用ブランチの作成

```bash
git checkout -b feature/snyk-vulnerable-sample
```

### ステップ 2：脆弱なコード・依存関係の追加

```bash
# 脆弱なファイルを追加（別途実施）
# package.json に古いバージョンの依存関係を追加
npm install lodash@4.17.4 --save
```

### ステップ 3：コミット＆プッシュ

```bash
git add .
git commit -m "検証用：脆弱なコードと依存関係を追加（Snyk 検証専用）"
git push origin feature/snyk-vulnerable-sample
```

### ステップ 4：Pull Request の作成

```bash
gh pr create \
  --title "検証用：Snyk 動作確認（マージ禁止）" \
  --body "このPRはSnykの動作検証専用です。マージしないでください。"
```

### ステップ 5：Snyk の結果確認

PR の Checks タブで以下を確認：

- [ ] Snyk Open Source のスキャン結果が表示される
- [ ] 脆弱な依存関係が検出される
- [ ] Snyk Code のスキャン結果が表示される
- [ ] 該当行にインラインコメントが付く

### ステップ 6：PR クローズ＆ブランチ削除

```bash
# PR をクローズ（マージしない）
gh pr close <PR番号>

# ブランチを削除
git branch -d feature/snyk-vulnerable-sample
git push origin --delete feature/snyk-vulnerable-sample
```

---

## 注意事項

- このリポジトリの内容は**絶対に本番環境にマージしない**こと
- 検証完了後はブランチまたはリポジトリを削除すること
- 脆弱なコードは検証専用であり、実際の攻撃コードではない

---

*このドキュメントは検証用です。本番運用には使用しないでください。*
