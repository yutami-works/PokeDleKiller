/* 既定エレメント */

const pokeFramesId     = 'poke-frame'
const resetFilterBtnId = 'reset-filter-btn';
const filterFiveBtnId  = 'filter-five-btn';
const okWordBoxId      = 'ok-word-box'
const filterWordBtnId  = 'filter-word-btn'
const inputCheckId     = 'input-check';

const pokeFrames     = document.getElementsByClassName(pokeFramesId);
const resetFilterBtn = document.getElementById(resetFilterBtnId);
const filterFiveBtn  = document.getElementById(filterFiveBtnId);
const okWordBox      = document.getElementById(okWordBoxId);
const filterWordBtn  = document.getElementById(filterWordBtnId);
const inputCheckMsg  = document.getElementById(inputCheckId);


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
    divClassName = `${divClassName} ${pokeData.type1}`;
  } else {
    divClassName = `${divClassName} ${pokeData.type1}`;
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

// div枠から名前を取得する関数
const getPokeFrameName = (frameElm) => {
  // 最後の子要素って指定方法なんとかならないんですかね…
  const pokeName = frameElm.lastElementChild.textContent;
  return pokeName;
}

// div枠を表示する関数
const displayPokeFrame = (frameElm) => {
  frameElm.style.display = 'inline-block';
}

// div枠を非表示にする関数
const hidePokeFrame = (frameElm) => {
  frameElm.style.display = 'none';
}

// フィルターリセット関数
const resetFilter = () => {
  // 全frameを表示
  for (const frame of pokeFrames) {
    displayPokeFrame(frame);
  }
}

// 5文字フィルター関数
const filterFive = () => {
  for (const frame of pokeFrames) {
    const pokeName = getPokeFrameName(frame);
    if (pokeName.length < 5) {
      hidePokeFrame(frame);
    }
  }
}

// 特定文字フィルター関数
const filterWords = () => {
  const okWordBoxStr = okWordBox.value;
  if (!okWordBoxStr) {
    resetFilter();
    return;
  }
  // ワードを1文字のリストにする
  const wordsList = okWordBoxStr.split('');
  for (const frame of pokeFrames) {
    const pokeName = getPokeFrameName(frame);
    let displayFlag = false;
    for (const word of wordsList) {
      if (pokeName.indexOf(word) != -1) {
        displayFlag = true;
      } else {
        // 1つでも合致しないワードがある場合は非表示
        displayFlag = false;
        break;
      }
    }
    if (displayFlag) {
      displayPokeFrame(frame);
    } else {
      hidePokeFrame(frame);
    }
  }

  // 5文字も非表示
  filterFive();
}

// 検索ボックスエラー表示関数
const inputCheck = () => {
  const inputValue = okWordBox.value;
  if (!(inputValue.match(/^[ァ-ンヴー]*$/))) {
    inputCheckMsg.innerHTML = 'カタカナで入力してください';
  } else {
    inputCheckMsg.innerHTML = '';
  }
}


/* イベントリスナ */

// フィルターリセットボタン
resetFilterBtn.addEventListener('click', () => {
  resetFilter();
});

// 5文字フィルターボタン
filterFiveBtn.addEventListener('click', () => {
  filterFive();
});

// 文字フィルターボタン
filterWordBtn.addEventListener('click', () => {
  filterWords();
});

// バリデーション
okWordBox.addEventListener('keyup', () => {
  inputCheck();
});


/* メインロジック */

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
