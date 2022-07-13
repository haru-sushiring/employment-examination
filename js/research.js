// Cookie登録フラグ
let flg_cookie = '';

// APIから受け取った店舗数
let shop_length = '';


//店舗詳細画面用のCookie登録
const post = (jsonData) => {
  jsonData.forEach((shop_info, shop_info_index) => {
    document.cookie = 'id' + shop_info_index + '=' + shop_info['id'];
    document.cookie = 'shop_name' + shop_info_index + '=' + shop_info['name'];
    document.cookie = 'address' + shop_info_index + '=' + shop_info['address'];
    document.cookie = 'business_hours' + shop_info_index + '=' + shop_info['open'];
    document.cookie = 'image' + shop_info_index + '=' + shop_info['photo']['pc']['l'];
    document.cookie = 'budget' + shop_info_index + '=' + shop_info['budget']['name'];
    document.cookie = 'genre' + shop_info_index + '=' + shop_info['genre']['name'];
    document.cookie = 'genre_catch_copy' + shop_info_index + '=' + shop_info['genre']['catch'];
    document.cookie = 'capacity' + shop_info_index + '=' + shop_info['capacity'];
    document.cookie = 'close' + shop_info_index + '=' + shop_info['close'];
    document.cookie = 'lunch' + shop_info_index + '=' + shop_info['lunch'];
  })
}

// ページング機能
let pagination = (jsonData) => {

    // Cookieに登録していなければ、登録する
    if ( !flg_cookie ) {
      post(jsonData); //APIのjsonデータをクッキーに登録する
      flg_cookie = 1;
    }
    // 初期値設定
    let page = 1; // 現在のページ（何ページ目か）
    const step = 5; // ステップ数（1ページに表示する店舗数）

    // 現在のページ/全ページ を表示
    // <p class="count"></p> の中身を書き換え
    let count = (page, step) => {
        const page_count = document.querySelector('.count');
        // totalに全ページ数を入れる　店舗の総数/ステップ数の余りの数で分ける
        let total = (shop_length % step == 0) ? (shop_length / step) : (Math.floor(shop_length / step) + 1);
        page_count.innerText = page + "/" + total + "ページ";
    }

    // ページを表示
    // <ul class="menu_list"></ul> の中身を書き換え
    let show = (page, step) => {

      // 「<div class="shops_container"></div>」に検索結果を入れる
      const div_shops_container = document.getElementById('shops_container');

      // HTMLに表示されている店舗情報を空にする
      while (div_shops_container.lastChild) {
          div_shops_container.removeChild(div_shops_container.lastChild);
      }

      let first = (page - 1) * step + 1;
      let last = page * step;

      // HTMLに店舗情報を挿入する
      jsonData.forEach((item, i) => {

          // 1ページ目を開いていて、戻るボタン（<）と先頭に戻るボタン（<<）を押された場合と、
          // 最後のページを開いていて、次のボタン（>）と最後に行くボタン（>>）を押されたら何もしない
          if(i < first - 1 || i > last - 1) return;

          const div_shop_item = document.createElement('div');
          div_shop_item.classList.add('div_shop_item', 'row');

          const div_shop_item_img = document.createElement('div');
          const div_shop_item_info = document.createElement('div');
          div_shop_item_img.classList.add('shop_item_img', 'col-md-6');
          div_shop_item_info.classList.add('shop_item_info', 'col-md-6');

          // 「<div class="shop_item_img col-md-6">」の中に、「<div class="img_css">」「<img id="shop_image">」を入れる
          const div_img_css = document.createElement('div');
          const img_shop_image = document.createElement('img');
          img_shop_image.setAttribute("id", 'shop_image');
          img_shop_image.src = item['photo']['pc']['l'];
          div_img_css.appendChild(img_shop_image);
          div_shop_item_img.appendChild(div_img_css);

          // 「<div class="div_shop_item row">」の中に、「<div class="shop_item_img col-md-6">」を入れる
          div_shop_item.appendChild(div_shop_item_img);

          // 「<div class="div_shop_item_info">」の中に、「<h3>」「<p>」「<a>」を入れる
          const h3_shop_name = document.createElement('h3');
          h3_shop_name.textContent = '店舗名';
          div_shop_item_info.appendChild(h3_shop_name);

          const p_shop_name = document.createElement('p');
          p_shop_name.innerText = item['name'];
          div_shop_item_info.appendChild(p_shop_name);

          const h3_shop_access = document.createElement('h3');
          h3_shop_access.textContent = 'アクセス';
          div_shop_item_info.appendChild(h3_shop_access);

          const p_shop_access = document.createElement('p');
          p_shop_access.innerText = item['access'];
          div_shop_item_info.appendChild(p_shop_access);

          const h3_shop_address = document.createElement('h3');
          h3_shop_address.textContent = '住所';
          div_shop_item_info.appendChild(h3_shop_address);

          const p_shop_address = document.createElement('p');
          p_shop_address.innerText = item['address'];
          div_shop_item_info.appendChild(p_shop_address);

          // 店舗詳細ページ「shop.php」へのURLを作成
          const div_a_shop_explan = document.createElement('div');
          div_a_shop_explan.classList.add('div_a_btn');
          const a_shop_explan = document.createElement('a');
          a_shop_explan.setAttribute("id", i);
          a_shop_explan.classList.add('a_btn_css');
          a_shop_explan.setAttribute("target", '_blank');
          a_shop_explan.setAttribute("rel", 'noopener noreferrer');
          a_shop_explan.href = './shop.php' + '/' + item['id']; // 店舗IDをURLに付ける（付けたIDとクッキー情報の店舗IDをマッチさせるため）
          a_shop_explan.textContent = '詳細'
          div_a_shop_explan.appendChild(a_shop_explan);
          div_shop_item_info.appendChild(div_a_shop_explan);

          // 「<div class="shop_item row">」の中に、「<div class="div_shop_item_info">」を入れる
          div_shop_item.appendChild(div_shop_item_info);

          // 「<div class="shops_container">」の中に、「<div class="div_shop_item row">」を入れる
          div_shops_container.appendChild(div_shop_item);

      });
      count(page,step);
    }

  // 最初に1ページ目を表示
  show(page, step);

  // 最前ページ遷移トリガー
  document.getElementById('first').addEventListener('click', () => {
      if(page <= 1) return;
      page = 1;
      show(page, step);
  });

  // 前ページ遷移トリガー
  document.getElementById('prev').addEventListener('click', () => {
      if(page <= 1) return;
      page = page - 1;
      show(page, step);
  });

  // 次ページ遷移トリガー
  document.getElementById('next').addEventListener('click', () => {
      if(page >= Math.floor(shop_length / step) + 1) return;
      page = page + 1;
      show(page, step);
  });

  // 最終ページ遷移トリガー
  document.getElementById('last').addEventListener('click', () => {
      if(page >= Math.floor(shop_length / step) + 1) return;
      page = Math.floor(shop_length / step) + 1;
      show(page, step);
  });

}


// メイン処理
const button = document.getElementById('location-info-btn');
button.addEventListener('click', () => {

  // Cookie情報削除
  let cookies = document.cookie;
  let cookiesArray = cookies.split(';'); // Cookieを1つずつ配列に入れる
  for (let cookie of cookiesArray) {
    let cookie_array = cookie.split('=');
    document.cookie = cookie_array[0] + '=; max-age=0' // 1つずつクッキーの有効期限を0にする（つまり削除）
  }

  // HTMLに挿入されている店舗情報を削除
  const div_shops_container = document.getElementById('shops_container');
  while (div_shops_container.lastChild) {
    div_shops_container.removeChild(div_shops_container.lastChild);
  }

  // 初期値
  const status = document.querySelector(".status");
  const research_error = document.getElementById('research_error');
  research_error.textContent = '';
  let range = ranges.value;
  const count = 15; // 最大15件紹介する
  flg_cookie = ''; // Cookie登録フラグを空にしておく

  // ブラウザがGeolocation APIに対応しているかをチェック
  if (!navigator.geolocation) {
    status.textContent = "ブラウザがGeolocationに対応していません";
    // 対応している → 位置情報取得開始
    // 位置情報取得成功時にsuccess()、そして取得失敗時にerror()がコールされる
    // optionsはgetCurrentPosition()に渡す設定値
  } else {
    status.textContent = "Locating…";
    navigator.geolocation.getCurrentPosition(success, error);
  }

  // 位置情報取得処理が成功した時にコールされる関数
  // 引数として、coords(coordinates。緯度・経度など)とtimestamp(タイムスタンプ)の2つを持ったpositionが渡される
  async function success(position) {
    status.textContent = '';

    // 隠してある要素（class="hiddin_item"）を表示させる
    let h2_hiddin_item = document.getElementById("h2_hiddin_item");
    h2_hiddin_item.textContent = '';
    h2_hiddin_item.classList.remove("hiddin_item");
    document.getElementById("ul_hiddin_item").classList.remove("hiddin_item");

    let latitude = position['coords']['latitude']; // 緯度取得
    let longitude = position['coords']['longitude']; // 経度取得

    // 検索条件をFormDataに格納する
    let api_postData = new FormData();
    api_postData.set("latitude", latitude);
    api_postData.set("longitude", longitude);
    api_postData.set("range", range);
    api_postData.set("count", count);

    let api_data = {
      method: "POST",
      body: api_postData,
    };
    // FetchApiを使ってグルメサーチAPIからjsonを取得するリクエストをする
    let res = await fetch("main.php", api_data);
    let result_data = await res.json();
    let json = await JSON.parse(result_data);

    if (json['results']['results_returned'] == '0') {
      research_error.innerText = '検索範囲内に店舗がありませんでした。\n検索範囲を広げて再検索お願いします。'
    } else {
      let jsonData = json['results']['shop'];
      // 配列数をグローバル変数に入れる
      shop_length = jsonData.length;
      // 検索結果の件数を表示
      h2_hiddin_item.textContent =  `検索結果：${shop_length}件`;

      pagination(jsonData); // 受け取ったjsonデータをHTMLに出力する
    }

  }

  // 位置情報取得処理が失敗した時にコールされる関数
  // 引数として、code(コード)とmessage(メッセージ)の2つを持ったpositionErrorが渡される
  function error(positionError) {
    switch (positionError.code) {
      case 0: // 0:UNKNOWN_ERROR
        status.textContent = "原因不明のエラーが発生しました。";
        break;

      case 1: // 1:PERMISSION_DENIED
        status.textContent = "  位置情報の取得が許可されませんでした。";
        break;

      case 2: // 2:POSITION_UNAVAILABLE
        status.textContent = "電波状況などで位置情報が取得できませんでした。";
        break;

      case 3: // 3:TIMEOUT
        status.textContent =
          "位置情報の取得に時間がかかり過ぎてタイムアウトしました。";
        break;
    }
  }
});