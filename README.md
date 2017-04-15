# Chrome Extensionを学習するためのサンプル

## How to build

```
> yarn install
> webpack
```

open 'dist' folder by chrome extension in developer mode.

## What is this
ダウンロードしたファイルのチェックサムを計算するExtensionになる予定


## 解説
Chrome の Extension は manifest.json に記述された html,js を読み込むことで動作する。


```
{
  "manifest_version": 2,
  "name": "checksum download file",
  "description": "checksum download file",
  "version": "0.1",
  // "background": {"scripts": ["bg.js"], "persistent": false},
  "browser_action": {
    "default_icon": "icon.png",
    "default_popup": "popup.html"
  },
  "permissions": [
    "activeTab",
    "downloads"
  ]
}
```

Google公式の Getting Start を参考に
popup.html 及び popup.js を作成した。

上記の manifest.json であれば、Extension のアイコンを押すと
popup.html が単純に起動する。

今後は downloads を使う為 "background" で動く js と
設定画面等を作成する予定。
## Refference

http://var.blog.jp/archives/54727354.html


## Lisence
[MIT](https://spdx.org/licenses/MIT)