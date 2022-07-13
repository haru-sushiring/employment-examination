<?php
/// Access-Control-Allow-Originエラーを回避する
header("Access-Control-Allow-Origin: *");

// javascriptから送られてきたクエリを変数に代入
$latitude =  $_POST['latitude'];
$longitude = $_POST['longitude'];
$range = $_POST['range'];
$count = $_POST['count'];

//環境変数からAPI_KEYを呼び出す
require 'vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();
$API_KEY = $_ENV["API_KEY"];

// $start = $_POST['start'];
// クエリをまとめる
$query = [
    'key' => $API_KEY, // API_KEY
    'lat' => $latitude, // 緯度
    'lng' => $longitude, // 経度
    'range' => $range, // 検索範囲
    'count' => $count, // 出力データ数
    'format' => 'json', // レスポンス形式
];
// グルメサーチAPIからjsonを取得
$url = 'http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?';
$url .= http_build_query($query);
// echo $url;
$response = file_get_contents($url);
$json = json_encode($response);

echo ($json);
