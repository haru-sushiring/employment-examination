//id=〇〇,shop_name=〇〇となっているので、「=」で切り分ける
const split_data = (shop_data) => {
	let split_data_list = []
	shop_data.forEach((data) => {
		let split_shop_data = data.split('=');
		if ( !split_shop_data[1] ) { //データが空なら「不明」を入れる
			split_data_list.push('不明');
		} else {
			split_data_list.push(split_shop_data[1]);
		}
	})
	return split_data_list;
}


// HTMLにCookieの店舗情報を挿入したらフラグを立てる
let flg_make_html = '';

//HTMLにCookieの店舗情報を挿入する
const make_html = (shop_data) => {
	const shop_name = document.getElementById('shop_name');
	const address = document.getElementById('address');
	const business_hours = document.getElementById('business_hours');
	const shop_image = document.getElementById('shop_image');
	const budget = document.getElementById('budget');
	const genre = document.getElementById('genre');
	const genre_catch_copy = document.getElementById('genre_catch_copy');
	const capacity = document.getElementById('capacity');
	const close = document.getElementById('close');
	const lunch = document.getElementById('lunch');

	shop_name.innerText = shop_data[1];
	address.innerText = shop_data[2];
	business_hours.innerText = shop_data[3];
	shop_image.src = shop_data[4];
	budget.innerText = shop_data[5];
	genre.innerText = shop_data[6];
	genre_catch_copy.innerText = shop_data[7];
	capacity.innerText = shop_data[8];
	close.innerText = shop_data[9];
	lunch.innerText = shop_data[10];

	flg_make_html = 1; // 挿入したらフラグを立てる
}

// --------
//メイン処理
// --------

// Cookieデータを一つずつ配列に入れる
const cookies = document.cookie;
const cookiesArray = cookies.split(';');

// Cookieデータを2次元配列にする　例：[[shop1_data], [shop2_data], ...]
let shop_list = [];
const shop_all_list = [];
const shop_data_length = 11; //id,shop_name,address,business_hours,imageなどの11個。情報の数に応じて変更必要がある
let count = 0;

cookiesArray.forEach((cookie_data) => {
	count += 1;
	shop_list.push(cookie_data);

	//11個データをshop_listに入れたら、まとめた配列（shop_list）をshop_all_listに入れる
	if ( count == shop_data_length ) {
		shop_all_list.push(shop_list);
		shop_list = [];
		count = 0;
	}
})


// URLからshop_idを取り出す
const shop_id = location.pathname.replace('/shop.php/', '');

// Cookie内の店舗情報から、URLのshopIDと同じshopIDを探す
shop_all_list.forEach((shop_data) => {

	// shop_data == [id〇=〇〇, shop_name〇=〇〇, ...]
	// shop_data[0] == id〇=〇〇
	//id=〇〇となっているので、切り分ける
	let shop_data_id_split = shop_data[0].split('=');

	// 「shop_data_id_split」に、[id〇, 〇〇] の配列が入る。
	// PHPのURLパラメータの店舗IDと同じIDを探す
	if ( shop_data_id_split[1] == shop_id ) {
		const split_shop_data = split_data(shop_data); // 「=」で切り分ける処理
		make_html(split_shop_data); // make_html関数を呼び出し、HTMLにCookie情報を挿入する
	}
})

// HTMLに店舗情報を挿入できなかった場合
if ( !flg_make_html ) {
	const error_text = document.getElementById('error_text');
    error_text.innerText = 'Cookie上で問題が発生しました。\nシークレットモードを利用し、再検索お願いします。'
    const top_page_url = document.getElementById('top_page_url');
    top_page_url.href = 'https://restaurant.sushiringblog.com';
    top_page_url.innerText = '検索画面に戻る'
}