var signProcessor = {

  /*
    Ідентифікатор батківського елементу для відображення iframe,
    який завантажує сторінку SignWidget
  */
  SIGN_WIDGET_PARENT_ID: "sign-widget-parent",
  /*
    Ідентифікатор iframe, який завантажує сторінку SignWidget
  */
  SIGN_WIDGET_ID: "sign-widget",
  /*
    URI з адресою за якою розташована сторінка SignWidget
  */
  SIGN_WIDGET_URI: "https://id.gov.ua/sign-widget/v20220527/",

  euSign: null,

  onFileChange: async function (input) {

    Array.from(input.files).forEach(item => {
      if (item.size > 1024 * 1024 * 10) {
        console.error('Максимальний розмір файлу, що підримується - 10 MB');
      }
    });

    //console.log(await signProcessor.getAsByteArray(input.files[0]));
  },

  getAsByteArray: async function (file) {
    return new Uint8Array(await signProcessor.readFile(file))
  },

  readFile: function (file) {
    return new Promise((resolve, reject) => {
      // Create file reader
      let reader = new FileReader()

      // Register event listeners
      reader.addEventListener("loadend", e => resolve(e.target.result))
      reader.addEventListener("error", reject)

      // Read file
      reader.readAsArrayBuffer(file)
    })
  },

  Init: function () {
    /*
     Створення об'єкту типу EndUser для взаємодії з iframe,
     який завантажує сторінку SignWidget
   */
    signProcessor.euSign = new EndUser(
      signProcessor.SIGN_WIDGET_PARENT_ID,
      signProcessor.SIGN_WIDGET_ID,
      signProcessor.SIGN_WIDGET_URI,
      EndUser.FormType.ReadPKey
    );

    /*
  Очікування зчитування ос. ключа користувачем
  */
    window.onload = function () {
      console.log('start on load');
      signProcessor.euSign.ReadPrivateKey()
        .then(function () {
          console.log('read');
          //document.getElementById('sign-widget-parent').style.display = 'none';
          document.getElementById('sign-data-block').style.display = 'block';
        })
        .catch(function (e) {
          console.error('Виникла помилка при зчитуванні ос. ключа. ' +
            'Опис помилки: ' + (e.message || e));
        });
    };
  },



  onSign: async function () {
  
    var data1 = await signProcessor.getAsByteArray(document.getElementById('file-input').files[0]);
    var data2 = await signProcessor.getAsByteArray(document.getElementById('file-input').files[1]);

    var data = [{ name: document.getElementById('file-input').files[0].name, val: data1 },
    { name: document.getElementById('file-input').files[1].name, val: data2 }];

      //document.getElementById('textAreaData').value;
    var previousSign = null;
    var external = false;
    var asBase64String = true;
    var signAlgo = EndUser.SignAlgo.DSTU4145WithGOST34311;
    var signType = EndUser.SignType.CAdES_X_Long;

    signProcessor.euSign.SignData(data, external,
      asBase64String, signAlgo, null, signType)
      .then(function (sign) {
        document.getElementById('textAreaSign').value = sign;
      })
      .catch(function (e) {
        console.error('Виникла помилка при підписі даних. ' +
          'Опис помилки: ' + (e.message || e));
      });
  }
};

function ready(callbackFunc) {
  if (document.readyState !== 'loading') {
    // Document is already ready, call the callback directly
    callbackFunc();
  } else if (document.addEventListener) {
    // All modern browsers to register DOMContentLoaded
    document.addEventListener('DOMContentLoaded', callbackFunc);
  } else {
    // Old IE browsers
    document.attachEvent('onreadystatechange', function () {
      if (document.readyState === 'complete') {
        callbackFunc();
      }
    });
  }
}

ready(signProcessor.Init);



