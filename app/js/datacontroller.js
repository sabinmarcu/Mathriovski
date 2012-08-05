(function() {
  var Block, DataController, VerticalShaft, colors, modes, verticals,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  verticals = [];

  DataController = (function(_super) {

    __extends(DataController, _super);

    function DataController() {
      DataController.__super__.constructor.apply(this, arguments);
    }

    DataController.activate = function() {
      var i;
      for (i = 1; i < 10; i++) {
        verticals[i] = VerticalShaft.create(i, {
          x: i * blockWidth
        });
      }
      M3.RenderController.activate();
      this.timer = setInterval(this.proxy(this.tick, this), 25);
      this.currentBlock = Block.create();
      window.onkeydown = this.proxy(function(e) {
        switch (e.keyCode) {
          case 37:
            return this.goLeft();
          case 39:
            return this.goRight();
          case 40:
            return this.accelerate();
        }
      }, this);
      document.getElementById("left").onclick = this.proxy(this.goLeft, this);
      document.getElementById("right").onclick = this.proxy(this.goRight, this);
      document.getElementById("faster").onclick = this.proxy(this.accelerate, this);
      document.getElementById("left").innerText = "<<";
      document.getElementById("right").innerText = ">>";
      document.getElementById("faster").innerText = "\/ \/";
      return this.updateScore();
    };

    DataController.goLeft = function() {
      if (this.currentBlock.shaft === 1) return;
      VerticalShaft.get(this.currentBlock.shaft).removeObject(this.currentBlock);
      this.currentBlock.shaft = this.currentBlock.shaft - 1;
      return VerticalShaft.get(this.currentBlock.shaft).addObject(this.currentBlock);
    };

    DataController.goRight = function() {
      if (this.currentBlock.shaft === 9) return;
      VerticalShaft.get(this.currentBlock.shaft).removeObject(this.currentBlock);
      this.currentBlock.shaft = this.currentBlock.shaft + 1;
      return VerticalShaft.get(this.currentBlock.shaft).addObject(this.currentBlock);
    };

    DataController.accelerate = function() {
      return this.currentBlock.y += 15;
    };

    DataController.score = 0;

    DataController.tick = function() {
      var len, list;
      this.currentBlock.y = this.currentBlock.y + 2;
      if (this.currentBlock.y >= window.innerHeight - 110 - (VerticalShaft.get(this.currentBlock.shaft).list.length * 30)) {
        this.currentBlock.y = window.innerHeight - 110 - (VerticalShaft.get(this.currentBlock.shaft).list.length * 30);
        list = VerticalShaft.get(this.currentBlock.shaft).list;
        len = list.length;
        console.log(this.currentBlock, VerticalShaft.get(this.currentBlock.shaft), list, len);
        if (len > 1 && list[len - 1].number === list[len - 2].number) {
          this.score += 1;
          this.updateScore();
          Block._reccords[list[len - 1]._uuid] = null;
          Block._reccords[list[len - 2]._uuid] = null;
          VerticalShaft.get(this.currentBlock.shaft).list.pop();
          VerticalShaft.get(this.currentBlock.shaft).list.pop();
        }
        return this.currentBlock = Block.create();
      }
    };

    DataController.update = function() {
      var shaft, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = verticals.length; _i < _len; _i++) {
        shaft = verticals[_i];
        if (!(shaft != null)) continue;
        _results.push(shaft.x = shaft._id * blockWidth);
      }
      return _results;
    };

    DataController.updateScore = function() {
      return document.getElementById("score").innerHTML = this.score;
    };

    return DataController;

  })(IS.Object);

  colors = [[50, 50, 50], [256, 0, 0], [0, 256, 0], [0, 0, 256]];

  VerticalShaft = (function(_super) {

    __extends(VerticalShaft, _super);

    VerticalShaft.extend(IS.Modules.ORM);

    VerticalShaft.include(IS.Modules.Observer);

    function VerticalShaft(args) {
      this.removeObject = __bind(this.removeObject, this);
      this.addObject = __bind(this.addObject, this);      this.x = args.x;
      this.list = [];
    }

    VerticalShaft.prototype.addObject = function(object) {
      return this.list.push(object);
    };

    VerticalShaft.prototype.removeObject = function(object) {
      var item, key, _len, _ref, _results;
      _ref = this.list;
      _results = [];
      for (key = 0, _len = _ref.length; key < _len; key++) {
        item = _ref[key];
        if (item === object) {
          _results.push(this.list.splice(key, 1));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    return VerticalShaft;

  })(IS.Object);

  modes = [
    function() {
      var number;
      number = parseInt(Math.random() * 10 + 1);
      return [number, number];
    }, function() {
      var n1, n2;
      n1 = parseInt(Math.random() * 6 + 1);
      n2 = parseInt(Math.random() * 6 + 1);
      return [n1 + n2, "" + n1 + " + " + n2];
    }, function() {
      var n1, n2;
      n1 = parseInt(Math.random() * 6 + 1);
      n2 = parseInt(Math.random() * 6 + 1);
      if (n2 > n1) {
        n1 = n1 + n2;
        n2 = n1 - n2;
        n1 = n1 - n2;
      }
      return [n1 - n2, "" + n1 + " - " + n2];
    }, function() {
      var n1, n2;
      n1 = parseInt(Math.random() * 3 + 1);
      n2 = parseInt(Math.random() * 3 + 1);
      return [n1 * n2, "" + n1 + " * " + n2];
    }
  ];

  Block = (function(_super) {

    __extends(Block, _super);

    Block.extend(IS.Modules.ORM);

    function Block(args) {
      var shaft, _ref;
      this.y = -30;
      this.shaft = parseInt((Math.random() * 9) + 1);
      this.color = colors[parseInt(Math.random() * colors.length)];
      shaft = VerticalShaft.get(this.shaft);
      shaft.addObject(this);
      this.number = 0;
      this.text = "";
      _ref = modes[parseInt(Math.random() * modes.length)](), this.number = _ref[0], this.text = _ref[1];
      console.log(this);
    }

    return Block;

  })(IS.Object);

  M3.DataController = DataController;

  window.VerticalShaft = VerticalShaft;

  window.Block = Block;

}).call(this);
