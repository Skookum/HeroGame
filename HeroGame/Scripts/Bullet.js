var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var HeroGame;
(function (HeroGame) {
    var Bullet = (function (_super) {
        __extends(Bullet, _super);
        function Bullet(startXPos, startYPos) {
            this._xPos = startXPos;
            this._yPos = startYPos;
            this._movementSpeed = 300;
            this._rotationSpeed = Math.PI / 2;
            this.Sprite = new eg.Graphics.Sprite2d(startXPos, startYPos, new eg.Graphics.Assets.ImageSource("/Images/banana.png", 32, 32));
            this.Sprite.ZIndex = 100;
            _super.call(this, this.Sprite.GetDrawBounds());

            this._movementController = new eg.MovementControllers.LinearMovementController(new Array(this.Bounds, this.Sprite), this._movementSpeed, false, false);
        }
        Bullet.prototype.Collided = function (data) {
            if (!(data.With instanceof Bullet)) {
                _super.prototype.Collided.call(this, data);
                this.Dispose();
                this.Sprite.Dispose();
            }
        };

        Bullet.prototype.Move = function () {
            this._movementController.Move("Right", true);
        };

        Bullet.prototype.Roll = function (gameTime) {
            var rotationIncrement = this._rotationSpeed * gameTime.Elapsed.Seconds;
            var positionIncrement = this._movementSpeed * gameTime.Elapsed.Seconds;
            this.Sprite.Rotation += rotationIncrement;
            this.Sprite.Position.X += positionIncrement;
        };
        return Bullet;
    })(eg.Collision.Collidable);
    HeroGame.Bullet = Bullet;
})(HeroGame || (HeroGame = {}));
