window.M3 ?= {}

lines = 10
class Application extends IS.Object
	@extend IS.Observer
	@run: ->
		console.log "App starting"
		window.canvas = document.getElementById("canvas")
		do @refreshCanvas
		window.onresize = @refreshCanvas
		document.getElementById("newgame").onclick = @newGame
		document.getElementById("pause").onclick = @pauseGame
		document.getElementById("end").onclick = @stopGame
		do M3.DataController.activate

	@newGame : ->
	@pauseGame: ->
	@stopGame: ->

	@refreshCanvas = ->
		window.blockWidth = (window.innerWidth - 20) / 10
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight - 110
		do M3.DataController.update
		do M3.RenderController.update
M3.Application = Application
