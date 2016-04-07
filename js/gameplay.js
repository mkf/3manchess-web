var Gameplay = function (client, gameId) {
    this.client = client;
    this.gameId = gameId;
    this.state = this.vftpg = this.play = null;

    var init = function () {
        client.play(gameId, parsePlay);
    };

    var parseState = function (data) {
        this.state = new State(data);
    };

    var parseVftpg = function (data) {
        this.vftpg = data;
    };

    var parsePlay = function (data) {
        this.play = data;
        client.state(this.play.stateid, parseState);
        client.vftpgen(this.play.stateid, parseVftpg);
    };

    init();
};
