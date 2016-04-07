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
