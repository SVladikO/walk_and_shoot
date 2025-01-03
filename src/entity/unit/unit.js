import { UNIT_TYPE } from "./type";
import { weapon_gun3 } from "../gun/gun";
import Bullet from "../bullet/bullet";
import { style } from "../../util/settings";
import { game } from "../../util/game";

import {
  getRadianAngle,
  getRandom,
  isInCanvas,
  isOnBlock,
  isInRange,
  playSound,
  // showNoBulletNotification,
  // hideNoBulletNotification
} from "../../util/util";

/**
 * A game entity that can move, shoot, and track its health status.
 * Example usage: AI gangster, user-controlled player, etc.
 */
export class Unit {
  /**
   * @constructor
   * @param {number} x - Starting position X
   * @param {number} y - Starting position Y
   * @param {number} health - Max health of the unit
   * @param {UNIT_TYPE} unitType - Whether it's a user, AI, etc.
   * @param {object}  weapon - Weapon object with bullet info
   * @param {string}  userIconId - The DOM ID for user/AI sprite
   * @param {boolean} isRandomMoveEnable - If AI should randomly move
   * @param {number} step - Movement increment (unused in snippet)
   * @param {number} dorRadius - For collisions/space checks
   * @param {number} visibilityRadius - Dist. to see or detect targets
   * @param {number} radius - Another radius usage (currently not used)
   */
  constructor(
    x = 10,
    y = 10,
    health = 100,
    unitType,
    weapon = weapon_gun3,
    userIconId,
    isRandomMoveEnable,
    step = 1,
    dorRadius = 15,
    visibilityRadius = 200,
    radius = 300
  ) {
    // Positions & movement
    this.x = x;
    this.y = y;
    this.unitType = unitType;
    this.isRandomMoveEnable = isRandomMoveEnable;
    this.moveDirection = { w: false, s: false, a: false, d: false };
    this.moveDirectionOpposite = {
      w: "s",
      s: "w",
      a: "d",
      d: "a",
    };
    this.randomMoveDedline = 10;
    this.angle = 0; // unit orientation

    // Combat & shooting
    this.isShootEnabled = false;
    this.shootSpeedAccamulator = weapon.shootSpeedStep; // accumulates steps until next shot
    this.showFireFromGunImage = 0; // counter for muzzle flash frames
    this.weapon = weapon;
    this.bulletAmount = weapon.bulletAmount;

    // Visual
    this.userIconId = userIconId;

    // Stats
    this.maxHealth = health;
    this.health = health;
    this.radius = radius; // custom usage (e.g., collisions, etc.)
    this.visibilityRadius = visibilityRadius || 300; // how far it can see
  }

  /** Prevent opposite moves from being activated simultaneously (e.g. no W+S). */
  disableOppositeMove(key) {
    this.moveDirection[key] = false;
  }

  /**
   * If random movement is enabled, pick a random direction
   * once the randomMoveDedline reaches zero.
   */
  unitRandomDirection() {
    if (!this.isRandomMoveEnable) return;

    if (!this.randomMoveDedline) {
      const randomIndex = getRandom(0, 4);
      const directionKeys = Object.keys(this.moveDirection);
      directionKeys.forEach((k) => (this.moveDirection[k] = false));

      this.moveDirection[directionKeys[randomIndex]] = true;
      this.randomMoveDedline = getRandom(3, 30);
    }
    this.randomMoveDedline--;
  }

  /**
   * Move the unit in whatever directions are set to 'true',
   * ensuring it doesn't exit the game board or collide with blocks.
   */
  move() {
    if (this.isDead()) return;

    const minY = game.boardHeightFrom;
    const maxY = game.boardHeightTo;
    const minX = game.boardWidthFrom;
    const maxX = game.boardWidthTo;

    // Up
    if (this.moveDirection.w) {
      const newY = this.y - game.unitSpeedStep;
      this.disableOppositeMove(this.moveDirectionOpposite["w"]);
      if (isInCanvas(newY, minY, maxY) && !isOnBlock(this.x, newY, style.user.dorRadius)) {
        this.y = newY;
      }
    }

    // Down
    if (this.moveDirection.s) {
      const newY = this.y + game.unitSpeedStep;
      this.disableOppositeMove(this.moveDirectionOpposite["s"]);
      if (isInCanvas(newY, minY, maxY) && !isOnBlock(this.x, newY, style.user.dorRadius)) {
        this.y = newY;
      }
    }

    // Left
    if (this.moveDirection.a) {
      const newX = this.x - game.unitSpeedStep;
      this.disableOppositeMove(this.moveDirectionOpposite["a"]);
      if (isInCanvas(newX, minX, maxX) && !isOnBlock(newX, this.y, style.user.dorRadius)) {
        this.x = newX;
      }
    }

    // Right
    if (this.moveDirection.d) {
      const newX = this.x + game.unitSpeedStep;
      this.disableOppositeMove(this.moveDirectionOpposite["d"]);
      if (isInCanvas(newX, minX, maxX) && !isOnBlock(newX, this.y, style.user.dorRadius)) {
        this.x = newX;
      }
    }
  }

  /**
   * Check if a particular (x,y) position is within the unit's "visibility" radius.
   * E.g., used to see if the user is close enough to be shot at.
   */
  isVisibleForMe(userX, userY) {
    const radius = this.visibilityRadius;
    const inRangeX = isInRange(userX, this.x - radius, this.x + radius);
    const inRangeY = isInRange(userY, this.y - radius, this.y + radius);
    return inRangeX && inRangeY;
  }

  /**
   * Reload the unit's weapon to full bullet capacity.
   * Plays a reload sound if not muted and if the shooter is the user.
   */
  reloadGun() {
    this.bulletAmount = this.weapon.reloadBulletAmount;
    if (!game.isMute && this.unitType === UNIT_TYPE.USER) {
      playSound(this.weapon.sound.reload, 0.4);
    }
  }

  /**
   * Single shot. Deduct one bullet if available.
   * Create new bullet instance(s) that are added to the global "flyBullets" array.
   */
  shootSingle() {
    if (this.isDead()) return;

    // If no bullets left for user, optionally play empty sound or show notification.
    if (this.bulletAmount <= 0) {
      if (this.unitType === UNIT_TYPE.USER && !game.isMute) {
        playSound("./sound/gun-empty.mp3", 0.4);
      }
      return;
    }

    // Deduct bullet & play a shoot sound if user.
    this.bulletAmount -= 1;
    if (!game.isMute && this.unitType === UNIT_TYPE.USER) {
      playSound(this.weapon.sound.shoot, 0.1);
    }

    // Muzzle flash effect
    this.showFireFromGunImage = 3;

    // Generate bullet(s) & push to global bullet array.
    const newBullets = this.getBullets();
    game.flyBullets = [...game.flyBullets, ...newBullets];
  }

  /**
   * For fully-automatic weapons or continuous firing:
   * If shooting is enabled and shootSpeedAccamulator hits zero,
   * fire a bullet and reset the accumulator.
   */
  shootAutomaticaly() {
    if (!this.isShootEnabled) return;

    if (!this.shootSpeedAccamulator) {
      this.shootSpeedAccamulator = this.weapon.shootSpeedStep;
      this.shootSingle();
    }
    this.shootSpeedAccamulator--;
  }

  /**
   * Enable the unit to move in the direction of the pressed key.
   * @param {string} key - Single character: 'w', 's', 'a', or 'd'
   */
  enableMove(key) {
    const lowerKey = key.toLowerCase();
    this.moveDirection[lowerKey] = true;
  }

  /**
   * Disable the unit from moving in the direction of the released key.
   * @param {string} key - Single character: 'w', 's', 'a', or 'd'
   */
  disableMove(key) {
    const lowerKey = key.toLowerCase();
    this.moveDirection[lowerKey] = false;
  }

  /**
   * Create bullet instance(s) from this unit's weapon logic.
   * The bullet(s) will start from a position slightly offset from the unit.
   */
  getBullets() {
    // Start the bullet from the tip of the weapon (approx. 45 px from center).
    const bulletX = this.x + Math.cos(this.angle) * 45;
    const bulletY = this.y + Math.sin(this.angle) * 45;
    return this.weapon.shoot(
      this.angle,
      (angle) => new Bullet(bulletX, bulletY, angle, this.weapon, this.unitType)
    );
  }

  /**
   * Renders the bullet info for user unit only (like "7/12 bullets").
   * @param {CanvasRenderingContext2D} ctx
   */
  renderBulletText(ctx) {
    if (this.isDead() || this.unitType !== UNIT_TYPE.USER) return;

    const textX = this.x - 30;
    const textY = this.y - 45;

    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.font = "12px Arial";
    const bulletText = `${this.bulletAmount}/${this.weapon.reloadBulletAmount}${
      this.bulletAmount <= 0 ? " - reload" : ""
    }`;
    ctx.fillText(bulletText, textX, textY);
  }

  /**
   * Renders a health bar above the unit.
   * Also includes a small black border around it.
   */
  renderHealth(ctx) {
    if (this.isDead()) return;

    // Position the bar slightly above the unit.
    const barX = this.x - 30;
    const barY = this.y - 40;

    const barWidth = 50; // total bar width
    const barHeight = 10; // total bar height
    const healthWidth = (barWidth * this.health) / this.maxHealth;

    // White background
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.fillStyle = "white";
    ctx.rect(barX, barY, barWidth, barHeight);
    ctx.fill();

    // Red foreground (actual health)
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.fillStyle = "#fa2121";
    ctx.rect(barX, barY, healthWidth, barHeight);
    ctx.fill();

    // Black border
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.rect(barX, barY, barWidth, barHeight);
    ctx.stroke();
  }

  /**
   * Main draw function: draws health bar, bullet text, user sprite, etc.
   * @param {number} directionX - typically the player's pointer X or AI’s target X
   * @param {number} directionY - typically the player's pointer Y or AI’s target Y
   * @param {CanvasRenderingContext2D} ctx
   */
  render(directionX, directionY, ctx) {
    this.updateAngle(directionX, directionY);

    // 1) Draw health & bullet status
    this.renderHealth(ctx);
    this.renderBulletText(ctx);

    // 2) Save context state, translate & rotate
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.translate(-this.x, -this.y);

    // 3) Draw weapon
    if (!this.isDead()) {
      const weaponImage = document.getElementById(this.weapon.imageId);
      ctx.drawImage(weaponImage, this.x, this.y - 5, 75, 40);

      // Muzzle flash if any
      if (this.showFireFromGunImage > 0) {
        const gunFireIcon = document.getElementById("gunFireIconId1");
        ctx.drawImage(gunFireIcon, this.x + 20, this.y - 23, 75, 40);
        this.showFireFromGunImage--;
      }
    }

    // 4) Draw unit sprite (live or dead)
    const spriteId = this.isDead() ? "unitDeadIconId" : this.userIconId;
    const userIcon = document.getElementById(spriteId);
    ctx.drawImage(userIcon, this.x - 30, this.y - 25, 50, 50);

    // 5) Restore context
    ctx.restore();
  }

  /**
   * Updates the unit angle to face a target coordinate (e.g. user pointer).
   * @param {number} toX
   * @param {number} toY
   */
  updateAngle(toX, toY) {
    this.angle = getRadianAngle(this.x, toX, this.y, toY);
  }

  /**
   * Alternative angle update for mobile controls (not used in snippet).
   */
  updateAngleForMobile(fromX, fromY, ctx) {
    const toX = 0; // e.g., might be center or corner
    const toY = 0;
    const dx = fromX - toX;
    const dy = fromY - toY;
    this.angle = Math.atan2(dy, dx);
  }

  /**
   * Render direction for debug: draws a wedge or arc
   * indicating the unit's vision or facing angle.
   */
  renderDirection(ctx) {
    const step = 1;
    const arcX = this.x + Math.cos(this.angle) * this.visibilityRadius;
    const arcY = this.y + Math.sin(this.angle) * this.visibilityRadius;

    ctx.beginPath();
    ctx.moveTo(arcX, arcY);
    ctx.arc(this.x, this.y, this.visibilityRadius, this.angle - step, this.angle + step, false);
    ctx.lineTo(arcX, arcY);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  /**
   * We consider health < 0 as "dead."
   */
  isDead() {
    return this.health < 0;
  }

  /**
   * Determine if a bullet at (x,y) is colliding with this unit's bounding circle.
   * If so, this unit would take damage (applied externally).
   */
  isBulletOn(x, y) {
    const radius = style.user.dorRadius;
    const inRangeX = isInRange(x, this.x - radius, this.x + radius);
    const inRangeY = isInRange(y, this.y - radius, this.y + radius);
    return inRangeX && inRangeY;
  }
}
