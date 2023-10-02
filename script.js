/* 既定エレメント */

const pokeFramesId     = 'poke-frame'
const resetFilterBtnId = 'reset-filter-btn';
const filterFiveBtnId  = 'filter-five-btn';
const pokeFrames     = document.getElementsByClassName(pokeFramesId);
const resetFilterBtn = document.getElementById(resetFilterBtnId);
const filterFiveBtn  = document.getElementById(filterFiveBtnId);

// グローバル変数
const fiveNameClass = 'c5';
const notFiveNameClass = 'c1';

/* 関数群 */

// range関数
const createNumberList = (startNum, endNum) => {
  const numberList = [];

  for (let i = startNum; i <= endNum; i++) {
    numberList.push(i);
  }

  return numberList;
}

// APIリクエスト関数
const fetchPokeData = async (pokeNum) => {
  // APIエンドポイント
  const pokeApi = "https://pokeapi.co/api/v2/pokemon/";
  const pokeApiJp = "https://pokeapi.co/api/v2/pokemon-species/"

  // APIリクエスト
  const res = await fetch(pokeApi + pokeNum);
  const apiData = await res.json();
  const resJp = await fetch(pokeApiJp + pokeNum);
  const apiDataJp = await resJp.json();

  // ポケモン情報
  const pokeData = {
    id : ('000' + apiData['id']).slice(-3), // 3桁0埋め
    name : apiDataJp['names'][0]['name'],
    img : apiData['sprites']['front_default'],
    type1 : apiData['types'][0]['type']['name']
  };

  return pokeData;
}

// 図鑑DOM関数
const createPokeBookElement = (pokeData) => {
  // クラス名
  let divClassName = 'poke-frame col-4 col-md-2 col-xl-1 p-1 border border-1 border-dark';
  const imgClassName = 'w-100 bg-light border border-1 border-dark';
  const pNoClassName = 'w-100 m-0';
  const pNameClassName = 'w-100 m-0 text-center';

  // 個別divクラス名生成
  if (pokeData.name.length === 5 ) {
    divClassName = `${divClassName} ${fiveNameClass} ${pokeData.type1}`;
  } else {
    divClassName = `${divClassName} ${notFiveNameClass} ${pokeData.type1}`;
  }

  // 生成ターゲット
  const bookWrapperId = 'wrapper';
  const bookWrapper = document.getElementById(bookWrapperId);

  // div枠
  const div = document.createElement('div');
  div.className = divClassName;

  // img画像
  const img = document.createElement('img');
  img.className = imgClassName;
  img.src = pokeData.img;
  div.appendChild(img);

  // p図鑑No.
  const id = document.createElement('p');
  id.className = pNoClassName;
  id.innerHTML = `No.${pokeData.id}`;
  div.appendChild(id);

  // p名前
  const name = document.createElement('p');
  name.className = pNameClassName;
  name.innerHTML = pokeData.name;
  div.appendChild(name);

  // 生成したelementをwrapper内に追加する
  bookWrapper.appendChild(div);
}

// フィルターリセット関数
const resetFilter = () => {
  for (const frame of pokeFrames) {
    frame.style.display ="inline-block";
  }
}

// 5文字フィルター関数
const filterFive = () => {
  for (const frame of pokeFrames) {
    // 最後の子要素って指定方法なんとかならないんですかね…
    const pokeName = frame.lastElementChild.textContent;
    if (pokeName.length < 5) {
      frame.style.display ="none";
    }
  }
}

// 検索と5文字フィルター関数
const wordSearch = () => {
  const targetWord = document.getElementById("search-box").value;
  const nameFive = document.getElementsByClassName(fiveNameClass);
  for (let i = 0; i < nameFive.length; i++) {
    const targetName = nameFive[i].lastElementChild.textContent;
    if (targetName.indexOf(targetWord) != -1) {
      nameFive[i].style.display ="inline-block";
    } else {
      nameFive[i].style.display ="none";
    }
  }
  filterFive();
}

// 検索ボックスエラー表示関数
const inputCheck = () => {
  const inputValue = document.getElementById( "search-box" ).value;
  if (!(inputValue.match(/^[ァ-ンヴー]*$/))) {
    document.getElementById( "check" ).innerHTML = 'カタカナで入力してください';
  } else if (inputValue.length > 5) {
    document.getElementById( "check" ).innerHTML = '5文字以内で入力してください';
  } else {
    document.getElementById( "check" ).innerHTML = '';
  }
}

/* イベントリスナ*/

// フィルターリセットボタン
resetFilterBtn.addEventListener('click', () => {
  resetFilter();
});

// 5文字フィルターボタン
filterFiveBtn.addEventListener('click', () => {
  filterFive();
});

/* メイン */

(async () => {
  const startNum = 1;
  const DPtNum = 493;
  const pokeBookRange = createNumberList(startNum, DPtNum);
  const pokeDataList = await Promise.all(pokeBookRange.map(async (pokeNum) => {
    return await fetchPokeData(pokeNum);
  }));

  for (const pokeData of pokeDataList) {
    createPokeBookElement(pokeData);
  }
})();
