var MyHexagon = cc.Sprite.extend({
	mapX:null,
	mapY:null,
	isActived:null,
	
	ctor:function (mapX, mapY) {
		this._super();

		this.mapX = mapX;
		this.mapY = mapY;

		this.init(); 
	},

	init:function () {
		this._super();
		
		var hexa1 = cc.Sprite.create(res.hexa_edge_png);
		hexa1.setAnchorPoint(0, 0);
		this.addChild(hexa1, 0, 0);
		
		var hexa2 = cc.Sprite.create(res.hexa_yellow_png);
		hexa2.setAnchorPoint(0, 0);
		hexa2.setVisible(false);
		this.addChild(hexa2, 0, 1);
	},
	
	activate:function(){
		this.isActived = true;
		this.getChildByTag(0).setVisible(false);
		this.getChildByTag(1).setVisible(true);
	},
	
	deactivate:function(){
		this.isActived = false;
		this.getChildByTag(0).setVisible(true);
		this.getChildByTag(1).setVisible(false);
	}
	
})