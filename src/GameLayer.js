var GameLayer = cc.Layer.extend({
	mapLayer:null,
	hexaSpriteArray:null,
	
	ctor:function (mapLayer) {
		this._super();

		this.mapLayer = mapLayer;
		
		this.init(); 
	},

	init:function () {
		this._super();
		
		//覆盖透明六边形
		hexaSpriteArray=new Array();
		for(var i=0;i<=21;i++){
			hexaSpriteArray[i]=new Array();
			for(var j=0;j<=10;j++){
				var testHexa = cc.Sprite.create(res.hexa_edge_png);
				testHexa.setAnchorPoint(0, 0);
				var mapTilePosition = this.mapLayer.getMap().getLayer("Layer 0").getPositionAt(cc.p(i, j));

				testHexa.setPosition(mapTilePosition.x, mapTilePosition.y)
				this.addChild(testHexa, 0, 0) 
				hexaSpriteArray[i][j] = testHexa;
			}
		}
		//end of 覆盖六边形

	},
	
	onClick:function(location) {
		cc.log("game layer onClick " + location.x + "," + location.y);
		
		for(var i=0;i<=21;i++){
			for(var j=0;j<=10;j++){
				var testHexa = hexaSpriteArray[i][j];
//				cc.log(testHexa.getPosition().x);
				var worldP = this.convertToWorldSpace(cc.p(testHexa.getPosition().x, testHexa.getPosition().y));
				var isHit = cc.rectContainsPoint(
						cc.rect(worldP.x, worldP.y, testHexa.getTextureRect().width, testHexa.getTextureRect().height),
						cc.p(location.x, location.y)
				);
				if(isHit){
					cc.log("sprite clicked");
					var yellowHexa = cc.Sprite.create(res.hexa_yellow_png); 
					yellowHexa.setAnchorPoint(0, 0);
					yellowHexa.setPosition(testHexa.getPosition().x, testHexa.getPosition().y);
					this.addChild(yellowHexa, 0, 0);
				}
			}
		}
		return false;
	},
	
});