# ⚠️ Snyk 検証専用リポジトリ（検証用）

> **警告：このリポジトリは Snyk の動作検証専用です。本番リポジトリへのマージは絶対に行わないでください。**

---

## 目的

このリポジトリは以下の検証を行うために作成されています：

- **Snyk Open Source**：脆弱な依存関係の検出確認
- **Snyk Code**：ソースコードの脆弱性検出確認
- **GitHub PR Checks**：PR 作成時の Snyk スキャンおよびインラインコメントの確認

---

## 注意事項

| 項目 | 内容 |
|---|---|
| 用途 | Snyk 連携動作検証のみ |
| マージ禁止 | 本番・staging ブランチへのマージは禁止 |
| 脆弱なコード | 別ブランチに意図的な脆弱コード・脆弱な依存関係を含む |
| 削除 | 検証完了後はブランチ・リポジトリを削除すること |

---

## リポジトリ構成

```
.
├── README.md            # このファイル
├── VALIDATION_NOTES.md  # 検証手順・検出箇所の説明
├── package.json         # Node.js プロジェクト定義
└── src/
    └── app.js           # サンプルコード（初期：脆弱性なし）
```

脆弱性の検証は別ブランチにて以下を追加します：

```
src/
├── hardcoded-secret.js    # ハードコードされたシークレット（Snyk Code 検証）
├── dangerous-eval.js      # eval 使用（Snyk Code 検証）
├── xss-example.js         # XSS（Snyk Code 検証）
└── sql-injection-example.js  # SQLインジェクション（Snyk Code 検証）
```

---

## 検証後の削除手順

```bash
# ブランチを削除する場合
git branch -d <検証ブランチ名>
git push origin --delete <検証ブランチ名>

# リポジトリごと削除する場合
gh repo delete <リポジトリ名> --yes
```

---

*このリポジトリのすべての内容は検証用です。実際の運用には使用しないでください。*
