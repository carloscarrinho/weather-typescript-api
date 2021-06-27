import { Beach, BeachPosition } from '@src/models/beach';

export class Rating {
  constructor(private beach: Beach) {}

  public getRatingBasedOnWindAndWavePositions(
    wavePosition: BeachPosition,
    windPosition: BeachPosition
  ): number {
    if(wavePosition === windPosition) return 1;
    if(this.isOffShoreWind(wavePosition, windPosition)) return 5;
    return 3;
  }

  private isOffShoreWind(wavePosition: BeachPosition, windPosition: BeachPosition): boolean {
    return ("NESW".indexOf(wavePosition) + "NESW".indexOf(windPosition)) % 2 == 0;;
  }
}
