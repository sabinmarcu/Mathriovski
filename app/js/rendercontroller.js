(function() {
  var RenderController,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  RenderController = (function(_super) {

    __extends(RenderController, _super);

    function RenderController() {
      RenderController.__super__.constructor.apply(this, arguments);
    }

    RenderController.activate = function() {
      console.log("Activating rendering");
      this.ctx = canvas.getContext('2d');
      return setInterval(this.proxy(this.render, this), 100);
    };

    RenderController.update = function() {
      if (!(this.ctx != null)) return;
      console.log(this.ctx);
      this.ctx.innerWidth = window.innerWidth;
      return this.ctx.innerHeight = window.innerHeight - 110;
    };

    RenderController.render = function() {
      var block, colors, gradient , shaft, uid, _ref;
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      _ref = Block._reccords;
      for (uid in _ref) {
        block = _ref[uid];
        if (!(block != null)) continue;
        shaft = VerticalShaft.get(block.shaft);
        gradient  = this.ctx.createLinearGradient(0, 0, blockWidth, 30);
        colors = [];
        if ((block.color[0] - 50) >= 0) {
          colors[0] = block.color[0] - 50;
        } else {
          colors[0] = 0;
        }
        if ((block.color[1] - 50) >= 0) {
          colors[1] = block.color[1] - 50;
        } else {
          colors[1] = 0;
        }
        if ((block.color[2] - 50) >= 0) {
          colors[2] = block.color[2] - 50;
        } else {
          colors[2] = 0;
        }
        gradient.addColorStop(0, "rgb(" + block.color[0] + ", " + block.color[1] + ", " + block.color[2] + ")");
        gradient.addColorStop(1, "rgb(" + colors[0] + ", " + colors[1] + ", " + colors[2] + ")");
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = "#888";
        this.ctx.fillStyle = gradient;
        this.ctx.strokeStyle = gradient;
        this.ctx.fillRect(shaft.x, block.y, blockWidth, 30);
        this.ctx.fillStyle = "#fff";
        this.ctx.font = "normal 12pt sans-seriv";
        this.ctx.textBaseline = "center";
        this.ctx.fillText(block.text, shaft.x + 10, block.y + 20);
      }
      this.ctx.fill();
      return this.ctx.closePath();
    };

    return RenderController;

  })(IS.Object);

  M3.RenderController = RenderController;

}).call(this);
