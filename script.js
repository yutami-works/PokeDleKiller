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
        pokeImageUrl = data['sprites']['front_default']
        pokeId = ( '000' + data['id'] ).slice( -3 ); // 3桁0埋め
        pokeName = dataJ['names'][0]['name']
        pokeType1 = data['types'][0]['type']['name']
        if ( 1 in data['types'] ) {
            pokeType2 = data['types'][1]['type']['name']
        }
        else {
            pokeType2 = 'なし'
        }

        // HTMLを生成していく
        // div要素を生成
        var div = document.createElement('div');

        // img要素を生成
        var img = document.createElement('img');
        img.className = 'w-100 bg-light border border-1 border-dark'
        img.src = pokeImageUrl; // 画像パスを追加
        div.appendChild(img); // img要素をdiv要素の子要素に追加

        // idを表示
        var id = document.createElement('p');
        id.innerHTML = 'No.' + pokeId;
        id.className = 'w-100 m-0';
        div.appendChild(id);

        // 名前を表示
        var name = document.createElement('p');
        name.innerHTML = pokeName;
        name.className = 'w-100 m-0 text-center';
        div.appendChild(name);

        // タイプを表示
        /*一旦中止
        var type = document.createElement('p');
        if (pokeType2 == 'なし') {
            type.innerHTML = pokeType1;
        }
        else {
            type.innerHTML = pokeType1 + '/' + pokeType2;
        }
        div.appendChild(type);
        */

        if ( pokeName.length === 5 ) {
            div.className = 'c5 col-4 col-md-2 col-xl-1 p-1 border border-1 border-dark';
        }
        else {
            div.className = 'c1 col-4 col-md-2 col-xl-1 p-1 border border-1 border-dark';
        }
        // タイプによって背景色を変える（クラスを付与する）
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
            div.className += ' flying';
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

        // 生成したdiv要素を、wrapperに追加する
        document.getElementById('wrapper').appendChild(div);
    }
}

function filterReset () {
    const notfive = document.getElementsByClassName("c1");
    for (var i = 0; i < notfive.length; i++) {
        a = notfive[i].style.display ="inline-block";
    }
}

function filterFive () {
    const notfive = document.getElementsByClassName("c1");
    for (var i = 0; i < notfive.length; i++) {
        a = notfive[i].style.display ="none";
    }
}

callApi();