var GameScene = cc.Scene.extend({
	mapLayer:null,
	gameLayer:null,
	touchBeginPointX:null,
	touchBeginPointY:null,
	isDrag:false,
	
	ctor:function () {
		this._super();

		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: this.onTouchBegan,
			onTouchMoved: this.onTouchMoved,
			onTouchEnded: this.onTouchEnded
		}, this);
	},

	onTouchBegan:function(touch, event) {
		var location = touch.getLocation();
		cc.log("game scene onTouchBegan");

//		var nsLocation = event.getCurrentTarget().convertToNodeSpace(location)
		touchBeginPointX = location.x; 
		touchBeginPointY = location.y;

		var currentTarget = event.getCurrentTarget();
		return true;
	},

	onTouchMoved:function(touch, event) {
		var location = touch.getLocation();
		var cx = event.getCurrentTarget().getPosition().x;
		var cy = event.getCurrentTarget().getPosition().y;
		event.getCurrentTarget().setPosition(cx+location.x-touchBeginPointX, cy+location.y-touchBeginPointY)
		touchBeginPointX = location.x;
		touchBeginPointY = location.y;
		isDrag = true;
	},

	onTouchEnded:function(touch, event) {
		var location = touch.getLocation();
		if(!isDrag){
			gameLayer.onClick(location);
		}
		
		touchBeginPointX = null;
		touchBeginPointY = null;
		cc.log("game scene onTouchEnded");
		isDrag = false;
		return false;
	},
	
	onEnter:function () {
		this._super();
		mapLayer = new MapLayer();
		this.addChild(mapLayer);
		
		gameLayer = new GameLayer(mapLayer);
		this.addChild(gameLayer);
	}
	
});