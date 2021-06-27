import { Beach, BeachPosition } from '@src/models/beach';

const waveHeights = {
  ankleToKnee: {
    min: 0.3,
    max: 1.0,
  },
  waistHigh: {
    min: 1.0,
    max: 2.0,
  },
  headHigh: {
    min: 2.0,
    max: 2.5,
  },
};
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

  public getRatingForSwellSize(height: number): number {
    if (
      height >= waveHeights.ankleToKnee.min &&
      height <= waveHeights.ankleToKnee.max
    ) {
      return 2;
    }

    if (
      height > waveHeights.waistHigh.min &&
      height <= waveHeights.waistHigh.max
    ) {
      return 4;
    }

    if (
      height > waveHeights.headHigh.min &&
      height <= waveHeights.headHigh.max
    ) {
      return 5;
    }
    return 1;
  }

  public getPositionFromLocation(coordinates: number) {
    if (coordinates >= 310 || (coordinates >= 0 && coordinates < 50)) {
      return BeachPosition.N;
    }

    if (coordinates >= 120 && coordinates < 220) {
      return BeachPosition.S;
    }

    if (coordinates >= 220 && coordinates < 310) {
      return BeachPosition.W;
    }

    return BeachPosition.E;
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
