#viewportについて

##デバイスの対応状況
- viewportのwidthという値に、device-widthと指定すると、スマホの画面幅 = 表示するwindowサイズ、となる。
- widthにピクセル値（640px、とか）を入れると、表示幅はそのピクセル数になり、それで画面いっぱいになるように適宜拡大縮小される
- 古いAndroidでは、widthにピクセル値を指定しても そもそも効かない端末がある 。
- 古いAndroidでは、user-scalableという値がyesになっていると、拡大縮小のUIが出てきてカッコ悪いので、できればuser-scalable=noを書いておきたい
- が、同様に古いAndroid端末の一部では、user-scalableを記述すると widthのピクセル指定を無視してきやがる 時がある。
- widthにピクセル値を指定するパターンでは、普通にやるとシェアボタン等が小さくなってかなしい。

##スマホサイト
1. 任意の横幅(750px等)でページを制作して、zoomでwindowにフィットさせる。
 - 利点
  1. ピクセルパーフェクトのデザインが可能。
   ->実装段階で全てをピクセル(相対単位)で指定するため。
 - 懸念点
  1. スマホサイトで、スクロール時の高さが取得できない機種がある。
  2. スマホサイトで、SNS関連のWidgetが小さく表示される。
   ->対策方法
  3. 上記の対策をした場合にリンクエリアがズレるなどの不具合が発生する。

2. 横幅を100%でページを制作して、viewportにdevice-widthを指定する。
 - 利点
  1. 横幅が多少変化しても、柔軟に対応が可能。
 - 懸念点
  1. デザインの条件が限られる。
   ->実装段階でパーセンテージ値(%)を指定するため

##`densitydpi`について
 - WebKit系のブラウザで実装されたmeta viewportのparams。
 - 今後、削除予定(削除された)
  ->[WebKit Bugzilla  Remove support for target-densitydpi](https://bugs.webkit.org/show_bug.cgi?id=88047)

##参考サイト
- [http://www.w3.org/](http://www.w3.org/)
- [http://qiita.com/](http://qiita.com/fnobi/items/4bec5ddf4ea83c5e1820)
- [https://w3g.jp/](https://w3g.jp/css/guide/units)
- [http://stackoverflow.com/](http://stackoverflow.com/questions/11592015/support-for-target-densitydpi-is-removed-from-webkit)
