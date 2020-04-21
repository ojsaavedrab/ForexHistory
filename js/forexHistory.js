(function () {


  var xhr = new XMLHttpRequest;
  var url = 'https://tvc4.forexpros.com/b850cfe77e782732b155f1c8df16df19/1587482550/1/1/8/history?symbol=1&resolution=15&from=1484552470&to=1586186550';
  

  xhr.onload = function () {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
      console.log(xhr.response, xhr.responseXML);
    }
  };

  xhr.open('GET', url);  
  xhr.send();


})();
