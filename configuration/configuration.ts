import * as dotenv from 'dotenv';

dotenv.config({ override: true });

export class Configuration {
  public static get STANDARD_USER(): string {
    return process.env.STANDARD_USER ?? '[NOT SET]';
  }
  public static get LOCKED_OUT_USER(): string {
    return process.env.LOCKED_OUT_USER ?? '[NOT SET]';
  }
  public static get PROBLEM_USER(): string {
    return process.env.PROBLEM_USER ?? '[NOT SET]';
  }
  public static get PERFORMANCE_GLITCH_USER(): string {
    return process.env.PERFORMANCE_GLITCH_USER ?? '[NOT SET]';
  }
  public static get ERROR_USER(): string {
    return process.env.ERROR_USER ?? '[NOT SET]';
  }
  public static get VISUAL_USER(): string {
    return process.env.VISUAL_USER ?? '[NOT SET]';
  }
  public static get PASSWORD(): string {
    return process.env.PASSWORD ?? '[NOT SET]';
  }
}