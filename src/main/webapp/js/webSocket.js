var webSocketJs = (function() {  
  var ip = "192.168.1.41";
  var websocket = new WebSocket("ws://" + ip + ":8080/Mercantes-del-Karibe/wsServerEndpoint");
  var user;

  var sendMessage = function (x, y, rotation) {       
    var obj = {
      user: user,
      x: x,
      y: y,
      rotation: rotation
    }

    websocket.send(JSON.stringify(obj));
  }

  var setUser = function (name) {
    user = name;

    //websocket.send(JSON.stringify(jsonMsg));
  }

  function setOnMessage(fn) {
    websocket.onmessage = fn;
  }

  return {
    sendMessage: sendMessage,
    setOnMessage : setOnMessage,
    setUser: setUser
  }
})();