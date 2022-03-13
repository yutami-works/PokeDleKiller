num = 493; //表示したい画像の数

async function callApi() {
  for (i = 1; i <= num; i++) {
    String(i); // 数値を文字に変換してURLにする
    // APIを叩いてjsonを取得する
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/" + i);
    const resJ = await fetch("https://pokeapi.co/api/v2/pokemon-species/" + i);
    const data = await res.json();
    const dataJ = await resJ.json();
    parseInt(i);

    // 個別のjsonデータを変数に入れる
    const pokeImageUrl = data['sprites']['front_default']
    const pokeId = ( '000' + data['id'] ).slice( -3 ); // 3桁0埋め
    const pokeName = dataJ['names'][0]['name']
    const pokeType1 = data['types'][0]['type']['name']

    // HTMLを生成していく
    // 枠<div>
    const div = document.createElement('div');
    div.className = 'col-4 col-md-2 col-xl-1 p-1 border border-1 border-dark';

    // 画像（子①<img>）
    const img = document.createElement('img');
    img.className = 'w-100 bg-light border border-1 border-dark'
    img.src = pokeImageUrl;
    div.appendChild(img); // img要素をdiv要素の子要素に追加

    // 図鑑No.（子②<p>）
    const id = document.createElement('p');
    id.className = 'w-100 m-0';
    id.innerHTML = 'No.' + pokeId;
    div.appendChild(id); // p要素をdiv要素の子要素に追加

    // 名前（子③<p>）
    const name = document.createElement('p');
    name.className = 'w-100 m-0 text-center'; // 名前は中央寄せ
    name.innerHTML = pokeName;
    div.appendChild(name); // p要素をdiv要素の子要素に追加

    // タイプ別背景色（クラス付与）
    switch (pokeType1){
    case 'normal':
      div.className += ' normal';
      break;
    case 'fire':
      div.className += ' fire';
      break;
    case 'water':
      div.className += ' water';
      break;
    case 'electric':
      div.className += ' electric';
      break;
    case 'grass':
      div.className += ' grass';
      break;
    case 'ice':
      div.className += ' ice';
      break;
    case 'fighting':
      div.className += ' fighting';
      break;
    case 'poison':
      div.className += ' poison';
      break;
    case 'ground':
      div.className += ' ground';
      break;
    case 'flying':
      div.className += ' lying';
      break;
    case 'psychic':
      div.className += ' psychic';
      break;
    case 'bug':
      div.className += ' bug';
      break;
    case 'rock':
      div.className += ' rock';
      break;
    case 'ghost':
      div.className += ' ghost';
      break;
    case 'dragon':
      div.className += ' dragon';
      break;
    case 'dark':
      div.className += ' dark';
      break;
    case 'steel':
      div.className += ' steel';
      break;
    case 'fairy':
      div.className += ' fairy';
      break;
    default:
    }

    // 5文字とそれ以外に分ける
    if ( pokeName.length === 5 ) {
      div.className += ' c5';
    }
    else {
      div.className += ' c1';
    }

    // 生成したdiv要素をwrapper内に追加する
    document.getElementById('wrapper').appendChild(div);
  }
}

// 表示リセット
function filterReset () {
  const notFive = document.getElementsByClassName("c1");
  for (var i = 0; i < notFive.length; i++) {
    notFive[i].style.display ="inline-block";
  }
  const nameFive = document.getElementsByClassName("c5");
  for (var i = 0; i < nameFive.length; i++) {
    nameFive[i].style.display ="inline-block";
  }
}

// 5文字のみ表示
function filterFive () {
  const notFive = document.getElementsByClassName("c1");
  for (var i = 0; i < notFive.length; i++) {
    notFive[i].style.display ="none";
  }
}

// 検索フィルター＋5文字絞り
function wordSearch () {
  const targetWord = document.getElementById("search-box").value;
  const nameFive = document.getElementsByClassName("c5");
  for (var i = 0; i < nameFive.length; i++) {
    var targetName = nameFive[i].lastElementChild.textContent;
    if (targetName.indexOf(targetWord) != -1) {
      nameFive[i].style.display ="inline-block";
    }
    else {
      nameFive[i].style.display ="none";
    }
  }
  filterFive () ;
}

//検索ボックスエラー表示
function inputCheck() {
  const inputValue = document.getElementById( "search-box" ).value;
  if (!(inputValue.match(/^[ァ-ンヴー]*$/))) {
    document.getElementById( "check" ).innerHTML = 'カタカナで入力してください';
  }
  else if (inputValue.length > 5) {
    document.getElementById( "check" ).innerHTML = '5文字以内で入力してください';
  }
  else {
    document.getElementById( "check" ).innerHTML = '';
  }
}

callApi();