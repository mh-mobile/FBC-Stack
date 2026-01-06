# 作業内容

投稿データの音声概要が存在しない場合は、投稿ページの音声概要のリンクを
表示しないようにしたい。

# 作業手順

投稿IDがgohan_summitの場合は、以下のAPIのJSONレスポンスでexistsがtrueの場合は、音声概要が存在する
https://fbc-stack.vercel.app/api/check-audio?postId=gohan_summit

それぞれの音声概要の有無を投稿データのmdファイルのYAMLフロントマターに追記してください。

各投稿データに対して繰り返してください。

投稿データの音声概要のリンクの制御処理がない場合は、制御処理を追加してください。

