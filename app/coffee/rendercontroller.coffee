class RenderController extends IS.Object
	@activate: ->
		console.log "Activating rendering"
		@ctx = canvas.getContext('2d')
		setInterval (@proxy @render, @), 100
	@update: ->
		return if not @ctx?
		console.log @ctx
		@ctx.innerWidth = window.innerWidth
		@ctx.innerHeight = window.innerHeight - 110
	@render: ->
		@ctx.clearRect 0, 0, canvas.width, canvas.height
		for uid, block of Block._reccords  
			continue if not block?
			shaft = VerticalShaft.get block.shaft
			gradient = @ctx.createLinearGradient 0, 0, blockWidth, 30
			colors = []
			if (block.color[0] - 50) >= 0 then colors[0] = block.color[0] - 50 else colors[0] = 0
			if (block.color[1] - 50) >= 0 then colors[1] = block.color[1] - 50 else colors[1] = 0
			if (block.color[2] - 50) >= 0 then colors[2] = block.color[2] - 50 else colors[2] = 0
			gradient.addColorStop 0, "rgb(#{block.color[0]}, #{block.color[1]}, #{block.color[2]})"
			gradient.addColorStop 1, "rgb(#{colors[0]}, #{colors[1]}, #{colors[2]})"
			@ctx.shadowOffsetX = 0
			@ctx.shadowOffsetY = 0
			@ctx.shadowBlur = 15
			@ctx.shadowColor = "#888"
			@ctx.fillStyle = gradient
			@ctx.strokeStyle = gradient
			@ctx.fillRect shaft.x, block.y, blockWidth, 30
			@ctx.fillStyle = "#fff"
			@ctx.font = "normal 12pt sans-seriv"
			@ctx.textBaseline = "center"
			@ctx.fillText block.text, shaft.x + 10, block.y + 20
		@ctx.fill()
		@ctx.closePath()

M3.RenderController = RenderController
