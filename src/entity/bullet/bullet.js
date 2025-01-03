/**
 * Bullet.js
 * 
 * Enhanced bullet class for your 2D game. 
 * Moves in a given angle with a specified max distance and triggers damage events upon collision.
 */

// Utility imports
import { changeUserHealth, getDistance, isOnBlock, isOutOfRange } from '../../util/util';
import { UNIT_TYPE } from "../unit/type";
import { game } from '../../util/game';
import { style } from '../../util/settings';

export default class Bullet {
  /**
   * @constructor
   * @param {number} fromX - Initial X-coordinate (spawn point of the bullet).
   * @param {number} fromY - Initial Y-coordinate (spawn point of the bullet).
   * @param {number} angle - Radian angle determining the bullet's travel direction.
   * @param {Object} weapon - Object describing bullet's properties (e.g., maxDistance, damage).
   * @param {string} ownerType - Identifier for who fired the shot (e.g., UNIT_TYPE.USER or UNIT_TYPE.UNIT).
   */
  constructor(fromX, fromY, angle, weapon, ownerType) {
    // Starting coords
    this.startX = fromX;
    this.startY = fromY;

    // Current position
    this.lastX = fromX;
    this.lastY = fromY;

    // Travel properties
    this.angle = angle;
    this.flyStep = style.bullet.flyStep || 8; // fallback if not defined in style

    // Weapon / Damage
    this.weapon = weapon;
    // If your weapon object has e.g. weapon.damage, use that; fallback to a default
    this.damage = weapon.damage || 2;
    // Max distance is read from the weapon config
    this.maxDistance = weapon.maxDistance || 300;

    // Visual / collision
    this.radius = style.bullet.radius || 5;
    // Optional "dead" radius, e.g., bullet disappears or changes color
    this.bulletDeadRadius = style.bullet.deadRadius || 8;

    // Owner
    this.ownerType = ownerType; // e.g., UNIT_TYPE.USER or UNIT_TYPE.UNIT

    // State
    this.isDead = false;
    this.isKickedBox = false; // set true if bullet collides with a wall or block
  }

  /**
   * Determines if the bullet has exceeded its maximum distance.
   * @return {boolean} true if traveled beyond weapon's max distance, else false.
   */
  isMaxDistance() {
    const distance = getDistance(this.startX, this.lastX, this.startY, this.lastY);
    return distance > this.maxDistance;
  }

  /**
   * Moves the bullet along its trajectory. Checks collisions and decides if bullet is "dead."
   * This is typically called each frame/tick of the game loop.
   */
  move() {
    // Update position
    this.lastX += Math.cos(this.angle) * this.flyStep;
    this.lastY += Math.sin(this.angle) * this.flyStep;

    // Check if bullet traveled beyond allowed distance
    if (this.isMaxDistance()) {
      this.isDead = true;
      return;
    }

    // Check collisions with blocks or out-of-bounds
    const bulletRadius = style.bullet.radius;
    const isBulletOnBlock = isOnBlock(this.lastX, this.lastY, bulletRadius);
    const isOutX = isOutOfRange(this.lastX, 0, game.canvas_board.width);
    const isOutY = isOutOfRange(this.lastY, 0, game.canvas_board.height);

    this.isKickedBox = isBulletOnBlock;
    this.isDead = isBulletOnBlock || isOutX || isOutY;

    // If bullet is from an enemy (UNIT), check collision with user
    if (!this.isDead && this.ownerType === UNIT_TYPE.UNIT) {
      if (game.user.isBulletOn(this.lastX, this.lastY)) {
        // Inflict damage on the user
        game.user.health -= this.damage;

        // If your design requires user health bar updates:
        // changeUserHealth(); // or any approach that updates the UI
        this.isDead = true;
      }
    }

    // If bullet is from the user, check collision with each enemy
    if (!this.isDead && this.ownerType === UNIT_TYPE.USER) {
      for (const unit of game.enemies) {
        if (unit.isDead()) {
          continue;
        }
        // If bullet hits an enemy
        if (unit.isBulletOn(this.lastX, this.lastY)) {
          unit.health -= this.damage;
          this.isDead = true;
          break; // bullet stops after hitting first enemy
        }
      }
    }
  }

  /**
   * Renders the bullet on the canvas.
   * Typically called after move() in the game loop.
   */
  render() {
    const ctx = game.ctx;
    ctx.beginPath();

    // If bullet is "dead," optionally draw a larger or different color circle
    const drawRadius = this.isDead ? this.bulletDeadRadius : this.radius;
    ctx.arc(this.lastX, this.lastY, drawRadius, 0, 2 * Math.PI, false);

    // Choose color based on whether bullet collided or not
    ctx.fillStyle = this.isDead ? style.bullet.bgColorCrashed : style.bullet.bgColor;
    ctx.fill();

    // If bullet collided with a block
    if (this.isKickedBox) {
      // Possibly play a "ricochet" or "missed" sound.
      // if (!isMute) playSound('./sound/missed.mp3', 0.01);
    }
  }
}
