export class PokemonEntity {
  public readonly id: number;
  public readonly name: string;
  public readonly type: string[];
  public readonly hp: number;
  public readonly attack: number;
  public readonly defense: number;
  public readonly speed: number;
  public readonly sprite: string;

  public currentHp: number;

  constructor(
    id: number,
    name: string,
    type: string[],
    hp: number,
    attack: number,
    defense: number,
    speed: number,
    sprite: string,
    currentHp?: number,
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.hp = hp;
    this.currentHp = currentHp || hp;
    this.attack = attack;
    this.defense = defense;
    this.speed = speed;
    this.sprite = sprite;
  }

  public applyDamage(damage: number): void {
    this.currentHp = Math.max(this.currentHp - damage, 0);
  }

  public get isDefeated(): boolean {
    return this.currentHp === 0;
  }
}
