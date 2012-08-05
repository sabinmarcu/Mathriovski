verticals = []
class DataController extends IS.Object
	@activate: ->
		for i in [1...10]
			verticals[i] = VerticalShaft.create i, x: i * blockWidth
		do M3.RenderController.activate
		@timer = setInterval (@proxy @tick, @), 25
		@currentBlock = Block.create()
		window.onkeydown = @proxy (e) -> 
			switch e.keyCode
				when 37 then do @goLeft
				when 39 then do @goRight
				when 40 then do @accelerate
		, @
		document.getElementById("left").onclick = @proxy @goLeft, @
		document.getElementById("right").onclick = @proxy @goRight, @
		document.getElementById("faster").onclick = @proxy @accelerate, @
		document.getElementById("left").innerText = "<<" 
		document.getElementById("right").innerText = ">>"
		document.getElementById("faster").innerText = "\/ \/" 
		do @updateScore
	@goLeft: ->
		return if @currentBlock.shaft is 1
		VerticalShaft.get(@currentBlock.shaft).removeObject @currentBlock
		@currentBlock.shaft = @currentBlock.shaft - 1
		VerticalShaft.get(@currentBlock.shaft).addObject @currentBlock
	@goRight: ->
		return if @currentBlock.shaft is 9
		VerticalShaft.get(@currentBlock.shaft).removeObject @currentBlock
		@currentBlock.shaft = @currentBlock.shaft + 1
		VerticalShaft.get(@currentBlock.shaft).addObject @currentBlock
	@accelerate: ->
		@currentBlock.y += 15

	@score = 0
	@tick: ->
		@currentBlock.y = @currentBlock.y + 2
		if @currentBlock.y >= window.innerHeight - 110 - (VerticalShaft.get(@currentBlock.shaft).list.length * 30)
			@currentBlock.y = window.innerHeight - 110 - (VerticalShaft.get(@currentBlock.shaft).list.length * 30)
			list = VerticalShaft.get(@currentBlock.shaft).list
			len = list.length
			console.log @currentBlock, VerticalShaft.get(@currentBlock.shaft), list, len
			# debugger
			if len > 1 and list[len-1].number is list[len-2].number
				@score += 1
				do @updateScore
				Block._reccords[list[len-1]._uuid] = null
				Block._reccords[list[len-2]._uuid] = null
				do VerticalShaft.get(@currentBlock.shaft).list.pop
				do VerticalShaft.get(@currentBlock.shaft).list.pop
			@currentBlock = Block.create()
	@update: ->
		for shaft in verticals
			continue if not shaft?
			shaft.x = shaft._id * blockWidth

	@updateScore: ->
		document.getElementById("score").innerHTML = @score

colors = [
	[50, 50, 50]
	[256, 0, 0]
	[0, 256, 0]
	[0, 0, 256]
]

class VerticalShaft extends IS.Object
	@extend IS.Modules.ORM
	@include IS.Modules.Observer

	constructor: (args) -> 
		@x = args.x
		@list = []

	addObject: (object) =>
		@list.push object

	removeObject: (object) =>
		for item, key in @list
			if item is object then @list.splice key, 1
		
modes = [
	() ->
		number = parseInt(Math.random() * 10 + 1)
		return [number, number]
	() ->
		n1 = parseInt(Math.random() * 6 + 1)
		n2 = parseInt(Math.random() * 6 + 1)
		return [n1 + n2, "#{n1} + #{n2}"]
	() ->
		n1 = parseInt(Math.random() * 6 + 1)
		n2 = parseInt(Math.random() * 6 + 1)
		if n2 > n1 
			n1 = n1 + n2
			n2 = n1 - n2
			n1 = n1 - n2
		return [n1 - n2, "#{n1} - #{n2}"]
	() ->
		n1 = parseInt(Math.random() * 3 + 1)
		n2 = parseInt(Math.random() * 3 + 1)
		return [n1 * n2, "#{n1} * #{n2}"]
]
class Block extends IS.Object
	@extend IS.Modules.ORM

	constructor: (args) ->
		@y = - 30 
		@shaft = parseInt ((Math.random() * 9) + 1)
		@color = colors[parseInt(Math.random() * colors.length)]
		shaft = VerticalShaft.get(@shaft)
		shaft.addObject @
		@number = 0
		@text = ""
		[@number, @text] = do modes[parseInt(Math.random() * modes.length)]
		console.log @

		
M3.DataController = DataController
window.VerticalShaft = VerticalShaft
window.Block = Block
