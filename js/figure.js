var Figure = function (figtype, color, pawncenter) {
    this.figtype = figtype;
    this.color = color;
    this.pawncenter = pawncenter;
    
    this.uint8 = function () {
        return (this.pawncenter << 6) | (this.color << 3) | this.figtype;
    };

    this.empty = function () {
        return (this.figtype == 0);
    };
};

var SingleDiff = function (obj) {
	this.afterfig=Tools.uint8toFigure(obj.afterfig);
	this.beforefig=Tools.uint8toFigure(obj.beforefig);
	this.where=obj.where;
	this.execute = function (callonappear,callonreplace,callondisappear) {
		if this.beforefig.empty() {
			if this.afterfig.empty() {
				console.log(this);
			} else {
				callonappear(this);
			}
		} else {
			if this.afterfig.empty() {
				callondisappear(this);
			} else {
				callonreplace(this);
			}
		}
	};
};
