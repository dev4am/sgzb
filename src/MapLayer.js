var MapLayer = cc.Layer.extend({
	map:null,

	ctor:function () {
		this._super();

		this.init();
	},

	init:function () {
		this._super();
		
		this.map = cc.TMXTiledMap.create(res.sample_map1_tmx);
		this.addChild(this.map);
	},
	
	getMap:function(){
		return this.map;
	},

});