console.log("JavaScript file loaded!");

let 局數 = 1;
let 當前選擇 = "";
let 手牌 = ""
let 抽到的 = ""
let 棄牌堆 = ""




var dshuffleButton = document.getElementById("shuffle");

var gameDiv = document.getElementById("gameText");
var gameDiv_2 = document.getElementById("gameText_2");

dshuffleButton.addEventListener("click", function() {
  初始();


});


function 初始() {
  deck = 生成牌庫();
  deck = 打亂牌庫(deck);
  手牌 = 轉成字串(deck.slice(0, 14)); // 顯示前十四張牌
  抽到的=轉成字串(deck.slice(14-1,14));
  // 重設局數
  局數 = 1;
  棄牌堆 = "";
  手牌 = 整理手牌(手牌);
  手牌更新();
 // gameDiv_2.innerHTML  =  deck;
}



function 轉成字串(陣列) {
  return 陣列.join(',');
}


function 打亂牌庫(牌庫) {
  for (let i = 牌庫.length - 1; i > 0; i--) {
      const 隨機索引 = Math.floor(Math.random() * (i + 1));
      // 交換牌庫中的牌
      [牌庫[i], 牌庫[隨機索引]] = [牌庫[隨機索引], 牌庫[i]];
  }
  return 牌庫;
}


function 生成牌庫() {
  const 花色 = ['m', 'p', 's'];
  const 序數牌 = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const 字牌 = ['1z', '2z', '3z', '4z', '5z', '6z', '7z'];

  const 牌庫 = [];

  // 生成序數牌
  for (const 花 of 花色) {
      for (const 數 of 序數牌) {
          for (let i = 0; i < 4; i++) {
              if ((數 === '5') && ((花 === 'm' && i < 3) || (花 === 'p' && i < 3) || (花 === 's' && i < 3))) {
                  牌庫.push(數 + 花);
              } else if (數 !== '5') {
                  牌庫.push(數 + 花);
              }
          }
      }
  }

  // 生成字牌
  for (const 字 of 字牌) {
      for (let i = 0; i < 4; i++) {
          牌庫.push(字);
      }
  }

  // 至少一個 0m、0p、0s
  牌庫.push('0m', '0p', '0s');

  return 牌庫;
}



function 手牌更新() {
  gameDiv.innerHTML = "這是你的手牌" + "<br>" + "第巡" + 局數 + "摸到" + 抽到的 + "<br>" + "剩餘張數：" + (136 - (13 + 局數));
gameDiv_2.innerHTML  =  "河道："+棄牌堆;

  圖片路徑陣列 = 號碼轉相對圖片路徑(手牌);
  
  for (let i = 0; i < 圖片路徑陣列.length; i++) {
      let imgId = "M_" + (i + 1);
      let imgElement = document.getElementById(imgId);

      imgElement.classList.add("img-class");
      imgElement.src = 圖片路徑陣列[i];
  }

  }

  function 號碼轉相對圖片路徑(號碼) {
    let 號碼陣列 = 號碼.split(',');
  
    let 相對圖片路徑陣列 = 號碼陣列.map((號碼) => {
      let 字母 = 號碼.charAt(1);
      let 圖片路徑 = `images/牌/${字母}/${號碼.charAt(0)}.png`;
      return 圖片路徑;
    });
  
    return 相對圖片路徑陣列;
  }
  
  function 整理手牌(手牌) {
    // 將手牌轉換成陣列
    let 手牌陣列 = 手牌.split(',');
  
    // 按照花色和數值排序
    手牌陣列.sort((a, b) => {
      const 花色順序 = { 'm': 0, 'p': 1, 's': 2, 'z': 3 };
      const 數字順序 = { '1': 1, '2': 2, '3': 3, '4': 4, '0': 5, '5': 6, '6': 7, '7': 8, '8': 9, '9': 10 };
  
      const a花色 = a.charAt(1);
      const b花色 = b.charAt(1);
      const a數值 = a.charAt(0);
      const b數值 = b.charAt(0);
  
      // 先比較花色，再比較數值
      if (花色順序[a花色] !== 花色順序[b花色]) {
        return 花色順序[a花色] - 花色順序[b花色];
      } else {
        return 數字順序[a數值] - 數字順序[b數值];
      }
    });
  
    // 將排序後的手牌陣列轉換回字串
    return 手牌陣列.join(',');
  }
  

  
document.addEventListener("DOMContentLoaded", function () {
  // 獲取所有圖片元素
  const imgElements = document.querySelectorAll(".div3_img img:not(#M)");

  // 為每個圖片元素添加點擊事件
  imgElements.forEach((img, index) => {
      img.addEventListener("click", function () {
        if ((136 - (13 + 局數)) === 0 ) {

          初始();

        }
        else{
          const imagePath = img.getAttribute("src");

          // 使用正規表達式來提取花色和數字
          const matchResult = imagePath.match(/\/(\w+)\/(\d+)\.png/);
          const suit = matchResult[1];
          const value = matchResult[2];
          當前選擇 = value + suit;
          

          棄牌堆 += 當前選擇+","
  
          手牌 = 手牌.replace(當前選擇+",", "");
          抽到的 = 轉成字串(deck.slice(14+局數-1,14+局數));
          手牌 += ","+抽到的
          局數++ 
          
          手牌更新();  
 
          手牌 = 整理手牌(手牌);

        }


      });
  });
});

  


  