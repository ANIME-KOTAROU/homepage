# 造園会社ホームページ - 環境構築手順

## 概要
このプロジェクトは、Rails 8.0.4、Ruby 3.3.6、Docker、MySQL を使用した造園会社のホームページです。

## 技術スタック
- **Ruby**: 3.3.6
- **Rails**: 8.0.4
- **Database**: MySQL 8.0
- **Container**: Docker & Docker Compose
- **JavaScript**: importmap-rails
- **CI/CD**: GitLab CI

## 環境構築手順

### 1. 必要な前提条件
- Docker Desktop がインストールされていること
- Git がインストールされていること

### 2. プロジェクトのクローン
```bash
git clone <your-gitlab-repository-url>
cd Chat
```

### 3. Dockerイメージのビルド
```bash
docker-compose build
```

### 4. データベースの作成
```bash
docker-compose run --rm web rails db:create
docker-compose run --rm web rails db:migrate
```

### 5. アプリケーションの起動
```bash
docker-compose up
```

ブラウザで `http://localhost:3000` にアクセスしてください。

### 6. アプリケーションの停止
```bash
docker-compose down
```

## プロジェクト構成

### ページ構成
- **トップページ** (`/`): 造園会社の紹介とサービス一覧
- **会社紹介** (`/about`): 会社概要と詳細情報
- **お問い合わせ** (`/contact`): お問い合わせフォーム

### ディレクトリ構造
```
Chat/
├── Dockerfile              # Dockerイメージ定義
├── docker-compose.yml      # Docker Compose設定
├── Gemfile                 # Ruby gem依存関係
├── .gitlab-ci.yml          # GitLab CI/CD設定
├── app/
│   ├── controllers/
│   │   └── home_controller.rb
│   └── views/
│       └── home/
│           ├── index.html.erb
│           ├── about.html.erb
│           └── contact.html.erb
├── config/
│   ├── database.yml        # データベース設定
│   └── routes.rb           # ルーティング設定
└── db/                     # データベース関連ファイル
```

## よく使うコマンド

### コンテナ内でRailsコマンドを実行
```bash
docker-compose run --rm web rails <command>
```

### コンソールの起動
```bash
docker-compose run --rm web rails console
```

### ログの確認
```bash
docker-compose logs -f web
```

### データベースのリセット
```bash
docker-compose run --rm web rails db:reset
```

## GitLabへのプッシュ

### 1. GitLabでリポジトリを作成
GitLabで新しいプロジェクトを作成します。

### 2. リモートリポジトリの追加
```bash
git remote add origin <your-gitlab-repository-url>
```

### 3. プッシュ
```bash
git push -u origin main
```

## トラブルシューティング

### ポート3000が既に使用されている場合
`docker-compose.yml` の ports セクションを変更してください：
```yaml
ports:
  - "3001:3000"  # ホスト側のポートを変更
```

### データベース接続エラー
```bash
docker-compose down
docker-compose up
```

### Dockerイメージの再ビルドが必要な場合
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up
```

## 今後の開発

### お問い合わせ機能の実装
現在、お問い合わせフォームは表示のみです。実際の送信機能を実装する場合：
1. Contactモデルの作成
2. コントローラーにcreateアクションを追加
3. メール送信機能の実装（Action Mailer）

### その他の追加機能候補
- 施工実績ギャラリー
- スタッフ紹介
- ブログ機能
- 管理画面（ActiveAdmin等）

## ライセンス
このプロジェクトは社内プロジェクトです。
