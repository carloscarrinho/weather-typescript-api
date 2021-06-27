import { Beach, BeachPosition } from '@src/models/beach';

export class Rating {
  constructor(private beach: Beach) {}

  public getRatingBasedOnWindAndWavePositions(
    wavePosition: BeachPosition,
    windPosition: BeachPosition
  ): number {
    if (wavePosition === windPosition) return 1;
    if (this.isOffShoreWind(wavePosition, windPosition)) return 5;
    return 3;
  }

  public getRatingForSwellPeriod(period: number): number {
    // suggestion: grades for each period
    // let rating = [1,1,1,1,1,1,1,2,2,2,4,4,4,4,5];
    if (period < 7) return 1;
    if (period >= 7 && period < 10) return 2;
    if (period >= 10 && period < 14) return 4;
    return 5;
  }

  private isOffShoreWind(
    wavePosition: BeachPosition,
    windPosition: BeachPosition
  ): boolean {
    return (
      ('NESW'.indexOf(wavePosition) + 'NESW'.indexOf(windPosition)) % 2 == 0
    );
  }
}
