# にっしー＆かっほー幼児園 HP

🔐 **このサイトは合言葉が必要です**

## 公開URL & 合言葉
- URL: 公開後にここに記載
- 合言葉: `towers`（変更可）

## 合言葉を変える方法
1. ターミナルで新しい合言葉のSHA-256ハッシュを生成：
   ```
   echo -n "新しい合言葉" | shasum -a 256
   ```
2. `index.html` を開いて以下の行を書き換える：
   ```
   const PW_HASH = '...ここにハッシュ...';
   ```
3. git push すれば反映される

## ローカルでの動作確認
```
cd "/path/to/西田家HP作成"
python3 -m http.server 8765
# ブラウザで http://localhost:8765/index.html
```

## ファイル構成
- `index.html` - メインページ + パスワードゲート
- `css/style.css` - 共通スタイル
- `css/surprise.css` - サプライズ用
- `js/main.js` - UI制御 + 写真クリック拡大
- `js/surprise.js` - 誕生日演出 + 猪川家イースターエッグ
- `images/` - 写真群（gitに含む）
- `写真/` - 元素材（HEIC等、gitignore対象）

## サプライズ機能
- URL末尾に `?from=takeshi` を付けると初回アクセス時に「Happy Birthday Kaho」演出
- フッターの©マーク5回クリックで猪川家からの隠しメッセージ
- 各写真クリックで全体表示（拡大）

## セキュリティ注意事項
- noindex で検索エンジン除外済み
- 合言葉は SHA-256 ハッシュで JS に保管（平文ではない）
- ※ ただしクライアントサイド認証なので、HTMLソースを読める技術者には突破される可能性あり
- 完全なセキュリティが必要なら Cloudflare Pages + Access への移行を推奨
