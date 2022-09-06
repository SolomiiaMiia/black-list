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

  getAsByteArray: async function (file) {
    return new Uint8Array(await signProcessor.readFile(file));
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

  isInitialized: false,

  ReadPK: function () {
      signProcessor.isInitialized = true;
      console.log('PostInit');
      signProcessor.euSign.ReadPrivateKey()
        .then(function (data) {

          var event = new CustomEvent("sign.readed",
            {
              detail: data[0].infoEx,
              bubbles: true,
              cancelable: true
            }
          );

          window.dispatchEvent(event);
        })
        .catch(function (e) {
          console.error('Виникла помилка при зчитуванні ос. ключа. ' +
            'Опис помилки: ' + (e.message || e));
        });
  },

  Init: function () {

    console.log('Init has been called');

    if (signProcessor.isInitialized || signProcessor.euSign != null) {
      signProcessor.isInitialized = false;
      try {
        signProcessor.euSign.destroy();
      } catch { };
      signProcessor.euSign = null;
    }
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

    
  },



  onSign: async function (dossierName) {

    var data = [];

    for (const item of document.getElementById('dossier-files').files) {
      var fileData = await signProcessor.getAsByteArray(item);
      data.push({ name: item.name, val: fileData });
    }

    data.push({ name: dossierName, val: document.getElementsByClassName('fr-element')[0].innerText });

    var external = false;
    var asBase64String = true;
    var signAlgo = EndUser.SignAlgo.DSTU4145WithGOST34311;
    var signType = EndUser.SignType.CAdES_X_Long;

    signProcessor.euSign.SignData(data, external,
      asBase64String, signAlgo, null, signType)
      .then(function (sign) {

        var event = new CustomEvent("sign.finished",
          {
            detail: sign,
            bubbles: true,
            cancelable: true
          }
        );

        console.log('sign.readed', event);

        window.dispatchEvent(event);
      })
      .catch(function (e) {
        console.error('Виникла помилка при підписі даних. ' +
          'Опис помилки: ' + (e.message || e));
      });
  }
};



