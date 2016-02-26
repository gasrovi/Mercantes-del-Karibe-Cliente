var ShipsType = {
  Submarine: 'submarine',
  Blue: 'blue',
  Green: 'green'
};

var app = (function  () {
  var cursors,
    gameWidth = 800, 
    gameHeight = 600, 
    gameContainer = 'game-container',
    submarine, blue, green, ship,
    caribbean, ny, mvd, mask,
    currentSpeed;

  var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, gameContainer, { 
    preload: preload, 
    create: create, 
    update: update, 
    render: render 
  });

  function render() {

  }

  function preload() 
  {
    game.load.image('empty', 'assets/empty.png');
    game.load.image('land', 'assets/pattern-land.png');
    game.load.image('port', 'assets/port.png');
    game.load.image('submarine', 'assets/ship-grey.png');
    game.load.image('blue', 'assets/ship-blue.png');
    game.load.image('green', 'assets/ship-green.png');
    game.load.image('island', 'assets/pattern-island.png');
    game.load.image('bullet', 'assets/bullet.png');
    game.load.image('missile', 'assets/missile.png');
  }

  function create() {
    // Inicio el motor fisico
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Inicio todo lo relacionado al mapa del juego
    map.init(game);
    
    // Inicio las naves
    ships.init(game);

    submarine = ships.getSubmarine();
    blue = ships.getBlue();

    setPlayerShip(submarine);

    // Seteo la mascara (alcanze de la luz) dependiendo del barco
    map.generateMask(submarine);

    // Seteo que la camara siga al submarino
    game.camera.follow(ship.el);
    game.camera.focusOnXY(0, 0);

    cursors = game.input.keyboard.createCursorKeys();

    game.input.activePointer.x = ship.x;
    game.input.activePointer.y = ship.y;
  }

  function update() {
    caribbean = map.getCaribbean();
    ny = map.getNY();
    mvd = map.getMvd();
    mask = map.getMask();

    game.physics.arcade.collide([ny.land, mvd.land], ship);
    game.physics.arcade.collide(ship.el, caribbean.islands);

    game.physics.arcade.overlap(ny.port, ship.el, function() {
      alert("LLego!");
      submarine.kill();
      
      // Una vez que muere puede seguir al otro
      //game.camera.follow(ships.blue);
      //mask.destroy();
    });
    
    game.physics.arcade.collide(blue, submarine, function() {
      //red.body.velocity = { x: 0, y: 0 };
      //submarine.body.velocity = { x: 0, y: 0 };

      alert("Boom!");
      blue.kill();
    });
    
    mask.x = ship.el.body.x + 36;
    mask.y = ship.el.body.y + 36;
    
    // Manda la posicion al server
    // if (submarine.alive && sendToServer) {
    //   webSocketJs.sendMessage('submarine', submarine.x, submarine.y, submarine.angle);
    // }
  
    // Recibe la posición del oponente y la actualiza
    //webSocketJs.setOnMessage(function (message) {
    //     var jsonMsg = JSON.parse(message.data);
    //     // console.log(jsonMsg.user);
    //     // console.log(jsonMsg.x);
    //     // console.log(jsonMsg.y);
    //     // console.log(jsonMsg.angle);
    //     if (jsonMsg.user == "red") {
    //       red.x = jsonMsg.x;
    //       red.y = jsonMsg.y;
    //       red.angle = jsonMsg.angle;
    //     }
    // });

    ship.update(cursors);

    // game.physics.arcade.collide(bullet, red, function() {
    //   ships.blue.kill();
    //   bullet.kill();
    //   alert('Rojo hundido');
    // });

    // game.physics.arcade.collide([red, newYork, montevideo, islands], bullet, function() {
    //   bullet.kill();
    // });
  }

  var setPlayerShip = function(_ship) {
    ship = _ship;
  };
})();