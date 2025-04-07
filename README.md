# gasTemp2025

GoogleAppsScript 開発用テンプレート

## 使用パッケージ

### 開発依存パッケージ (`devDependencies`)

- **typescript**: TypeScript 言語自体。型安全なコードを書くために使用。
- **@types/google-apps-script**: Google Apps Script の型定義ファイル。TypeScript で GAS を開発する際に使用。
- **@types/jest**: Jest テストフレームワークの型定義ファイル。TypeScript で Jest を使用する際に必要。
- **@types/node**: Node.js の型定義ファイル。TypeScript で Node.js を使用する際に必要。
- **esbuild**: 高速な JavaScript/TypeScript のバンドラー。コードを効率的にビルドするために使用。
- **esbuild-gas-plugin**: Google Apps Script 用の `esbuild` プラグイン。GAS 向けにコードを最適化。
- **jest**: JavaScript/TypeScript 用のテストフレームワーク。単体テストを実行するために使用。
- **jest-mock-extended**: Jest 用のモック作成ライブラリ。テストでモックを簡単に作成するために使用。
- **ts-jest**: TypeScript 用の Jest プリセット。TypeScript コードをテストする際に使用。
- **ts-node**: TypeScript を直接実行するためのツール。スクリプトの実行やデバッグに使用。
- **vite**: 高速なフロントエンド開発ツール。開発サーバーやビルドツールとして使用。
- **vite-plugin-singlefile**: Vite 用のプラグイン。すべてのコードを単一ファイルにバンドルするために使用。

## npm スクリプト

以下はプロジェクトで使用される npm スクリプトの説明です。

### 開発用

- **`npm run dev`**  
  フロントエンドの開発サーバーを起動します。`vite` を使用して `app/front` ディレクトリをホストします。

- **`npm run preview`**  
  ビルド後のフロントエンドをプレビューします。

### ビルド関連

- **`npm run buildfront`**  
  フロントエンドの TypeScript をコンパイルし、`vite` を使用してビルドします。

- **`npm run buildbackend`**  
  バックエンドのコードを `esbuild.js` を使用してビルドします。

- **`npm run build`**  
  フロントエンドとバックエンドの両方をビルドします。

### Google Apps Script 関連

- **`npm run push`**  
  `clasp` を使用して Google Apps Script にコードをデプロイします。

- **`npm run open`**  
  Google Apps Script のエディタをブラウザで開きます。

### デプロイ関連

- **`npm run cpappsscript`**  
  `app/backend/src/appsscript.json` を `dist` ディレクトリにコピーします。

- **`npm run cpstatic`**  
  `app/backend/src/static` ディレクトリを `dist` にコピーします。

- **`npm run deploy`**  
  以下の手順をまとめて実行します:

  1. `npm run cpappsscript`
  2. `npm run cpstatic`
  3. `npm run build`
  4. `npm run push`

- **`npm run deploytest`**  
  デプロイのテスト用スクリプト。`npm run deploy` と同様ですが、`push` は実行しません。

---

## ライセンス

MIT
