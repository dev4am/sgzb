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
				var mapTilePosition = this.mapLayer.getMap().getLayer("Layer 0").getPositionAt(cc.p(i, j));
				var myHexagon = new MyHexagon(i, j);
				myHexagon.setAnchorPoint(0, 0);
				myHexagon.setPosition(mapTilePosition.x, mapTilePosition.y)
				this.addChild(myHexagon, 0, 0) 
				hexaSpriteArray[i][j] = myHexagon;
			}
		}
		//end of 覆盖六边形

	},
	
	onClick:function(location) {
		cc.log("game layer onClick " + location.x + "," + location.y);
		
		for(var i=0;i<=21;i++){
			for(var j=0;j<=10;j++){
				var myHexagon = hexaSpriteArray[i][j];
//				cc.log(testHexa.getPosition().x);
				var worldP = this.convertToWorldSpace(cc.p(myHexagon.getPosition().x, myHexagon.getPosition().y));
				var isHit = cc.rectContainsPoint(
						cc.rect(worldP.x, worldP.y, myHexagon.getChildByTag(0).getTextureRect().width, myHexagon.getChildByTag(0).getTextureRect().height),
						cc.p(location.x, location.y)
				);
				if(isHit){
					cc.log("sprite clicked");
					myHexagon.activate();
				}else{
					myHexagon.deactivate();
				}
			}
		}
		return false;
	},
	
});