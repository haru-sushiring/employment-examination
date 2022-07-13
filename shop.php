<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>現在地付近のレストラン情報</title>
	<meta name="description" content="現在地付近のレストラン情報を検索するウェブアプリ">
    <link rel="stylesheet" href="../css/shop.css">
    <!-- BootstrapのCSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>
<body>
	<h1 id="shop_name">店舗名称</h1><hr>
	<div class="container">
		<div class="row">
			<div class="col-md-6">
				<div class="img_css">
					<img id="shop_image" src="" alt="">
				</div>
			</div>
			<div class="col-md-6">
				<h3>住所</h3>
				<p id="address"></p>
				<h3>営業時間</h3>
				<p id="business_hours"></p>
				<h3>定休日</h3>
				<p id="close"></p>
				<h3>料金目安</h3>
				<p id="budget"></p>
				<h3>カテゴリー</h3>
				<p id="genre"></p>
				<p id="genre_catch_copy"></p>
				<h3>総席数</h3>
				<p id="capacity"></p>
				<h3>ランチ</h3>
				<p id="lunch"></p>
			</div>
			<p class="powered_by">Powered by <a href="http://webservice.recruit.co.jp/">ホットペッパー Webサービス</a></p>
			<p id="error_text"></p>
			<p><a id="top_page_url" href=""></a></p>
		</div>
	</div>
    <script type="text/javascript" src="../js/shop.js"></script>
    <!-- BootstrapのJavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</body>
</html>