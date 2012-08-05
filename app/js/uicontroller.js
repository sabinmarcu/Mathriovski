(function() {
  var Application, lines,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  if (window.M3 == null) window.M3 = {};

  lines = 10;

  Application = (function(_super) {

    __extends(Application, _super);

    function Application() {
      Application.__super__.constructor.apply(this, arguments);
    }

    Application.extend(IS.Observer);

    Application.run = function() {
      console.log("App starting");
      window.canvas = document.getElementById("canvas");
      this.refreshCanvas();
      window.onresize = this.refreshCanvas;
      document.getElementById("newgame").onclick = this.newGame;
      document.getElementById("pause").onclick = this.pauseGame;
      document.getElementById("end").onclick = this.stopGame;
      return M3.DataController.activate();
    };

    Application.newGame = function() {};

    Application.pauseGame = function() {};

    Application.stopGame = function() {};

    Application.refreshCanvas = function() {
      window.blockWidth = (window.innerWidth - 20) / 10;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight - 110;
      M3.DataController.update();
      return M3.RenderController.update();
    };

    return Application;

  })(IS.Object);

  M3.Application = Application;

}).call(this);
