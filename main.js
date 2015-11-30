require("matter-js");

var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
	MouseConstraint = Matter.MouseConstraint;

var engine = Engine.create(document.body, {
	render: {
		options: {
			wireframes: false
		}
	}
});

function createSushi(x, y){
	return Bodies.circle(x, y, 24, {
		render: {
			sprite: {
				texture: "http://emoji.fileformat.info/gemoji/sushi.png"
			}
		}
	});
}

function addRandomSushi(World){
	var sushi = createSushi(400 + Math.random() * 100 - 50, -100);
	World.add(engine.world, [sushi]);
}

var offset = 10;
World.add(engine.world, [
  //Bodies.rectangle(400, -offset, 800 + 2 * offset, 50, { isStatic: true }),
  Bodies.rectangle(400, 600 + offset, 800 + 2 * offset, 50, { isStatic: true }),
  Bodies.rectangle(800 + offset, 300, 50, 600 + 2 * offset, { isStatic: true }),
  Bodies.rectangle(-offset, 300, 50, 600 + 2 * offset, { isStatic: true })
]);

var mouseConstraint = MouseConstraint.create(engine);

for(var i = 0; i < 50; i++){
	setTimeout(function(){
		addRandomSushi(World);
	}, 100 * i);
}


setTimeout(function(){
	setInterval(function(){
		addRandomSushi(World);
	}, 1000)
}, 6000)

World.add(engine.world, mouseConstraint);
// run the engine
Engine.run(engine);