# コードの説明

## 実装の概要
本リポジトリは、Giveryの技術試験に対する解答です。Denoを利用して、シンプルかつ堅牢なレシピ管理REST APIを実装しました。

## 技術スタック
- **ランタイム**: Deno (TypeScript)
- **サーバー**: `Deno.serve` (標準ライブラリ)
- **テスト**: Node.js (Mocha, Chai, Chai-HTTP)
- **設定**: YAML (`env.yml`)

## 設計方針
1. **Denoの採用**: 設定不要でTypeScriptを実行でき、標準の`Deno.serve`を用いることで、外部依存を最小限に抑えた高速なAPIを構築しました。
2. **バリデーション**: `POST /recipes` エンドポイントにおいて、必須項目（`title`, `making_time`, `serves`, `ingredients`, `cost`）の存在確認と空文字チェックを厳格に行い、不完全なデータ登録を防止しています。
3. **データ管理**: 要件に基づき、メモリ内（In-memory）でデータを管理しています。IDは自動インクリメントされ、作成・更新日時もISO 8601形式（`YYYY-MM-DD HH:MM:SS`）で正確に記録されます。
4. **テストの自動化**: Node.jsベースのテストスイートを同梱しており、ローカル環境および本番環境（Deno Deploy）の両方で動作を確認済みです。

## エンドポイント詳細
- `POST /recipes`: レシピの新規作成（バリデーション失敗時は専用メッセージを返却）
- `GET /recipes`: 全レシピの一覧取得
- `GET /recipes/:id`: 指定IDのレシピ詳細取得
- `PATCH /recipes/:id`: 指定IDのレシピ更新
- `DELETE /recipes/:id`: 指定IDのレシピ削除

## 特記事項
- 本番環境 URL: `https://givery-rest-api-test-deno.dtechmaster.deno.net`
- `env.yml` の `BASE_URL` を切り替えることで、容易にテスト対象を切り替え可能です。
