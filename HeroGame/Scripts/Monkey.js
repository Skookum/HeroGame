var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var HeroGame;
(function (HeroGame) {
    var Monkey = (function (_super) {
        __extends(Monkey, _super);
        function Monkey(startXPos, startYPos, inputManager, shootingEventHandler, shieldEventHandler) {
            var _this = this;
            this._xPos = startXPos;
            this._yPos = startYPos;
            this._shooting = false;
            this._shield = false;
            this._jumpingUp = false;
            this._jumpingDown = false;
            this._movementSpeed = 200;
            this._jumpingSpeed = 100 / 1000;
            this.Sprite = new eg.Graphics.Sprite2d(startXPos, startYPos, new eg.Graphics.Assets.ImageSource("/Images/monkey.png", 104, 91));
            this.Sprite.ZIndex = 100;
            this._shootingEventHandler = shootingEventHandler;
            this._shieldEventHandler = shieldEventHandler;
            _super.call(this, this.Sprite.GetDrawBounds());

            this._movementController = new eg.MovementControllers.LinearMovementController(new Array(this.Bounds, this.Sprite), this._movementSpeed, false, false);
            this._inputController = new eg.InputControllers.DirectionalInputController(inputManager.Keyboard, function (direction, startMoving) {
                if (direction === "Up" && startMoving === true) {
                    _this.Jump();
                } else if (direction === "Down") {
                    _this.Shield();
                }
            });

            inputManager.Keyboard.OnCommandDown("Space", function () {
                _this.Shoot();
            });
        }
        Monkey.prototype.Collided = function (data) {
            if (!(data.With instanceof Monkey)) {
                this.Sprite.Rotation = -90;
                _super.prototype.Collided.call(this, data);
            }
        };

        Monkey.prototype.Jump = function () {
            var _this = this;
            if (!this._jumpingUp && !this._jumpingDown) {
                this._jumpingUp = true;

                setTimeout(function () {
                    _this._jumpingDown = true;
                    _this._jumpingUp = false;
                }, 1000);
                setTimeout(function () {
                    _this._jumpingDown = false;
                }, 2000);
            }
        };

        Monkey.prototype.Shoot = function () {
            var _this = this;
            if (!this._shooting) {
                this._shootingEventHandler.Trigger();

                this._shooting = true;

                setTimeout(function () {
                    return _this._shooting = false;
                }, 1000);
            }
        };

        Monkey.prototype.Shield = function () {
            var _this = this;
            if (!this._shield) {
                this._shieldEventHandler.Trigger();

                this._shield = true;

                setTimeout(function () {
                    return _this._shield = false;
                }, 5000);
            }
        };

        Monkey.prototype.Update = function (gameTime) {
            this._movementController.Update(gameTime);

            if (this._jumpingUp) {
                this.Sprite.Position.Y -= gameTime.Elapsed.Milliseconds * this._jumpingSpeed;
                this.Bounds.Position.Y -= gameTime.Elapsed.Milliseconds * this._jumpingSpeed;
            }
            if (this._jumpingDown) {
                this.Sprite.Position.Y += gameTime.Elapsed.Milliseconds * this._jumpingSpeed;
                this.Bounds.Position.Y += gameTime.Elapsed.Milliseconds * this._jumpingSpeed;
            }
        };
        return Monkey;
    })(eg.Collision.Collidable);
    HeroGame.Monkey = Monkey;
})(HeroGame || (HeroGame = {}));
