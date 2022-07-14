import { Logger, LoggerService } from '@nestjs/common';

export class MnaLogger extends Logger implements LoggerService {
  private readonly LOG_LEVELS: string[] = [
    'error',
    'warn',
    'log',
    'debug',
    'verbose',
  ];

  error(message: string, trace?: string, context?: string) {
    super.error(message, trace, context);
  }

  warn(message: string, context?: string) {
    return this.checkLevelAndExecute('warn', () =>
      super.warn(message, context),
    );
  }

  log(message: string, context?: string) {
    return this.checkLevelAndExecute('log', () => super.log(message, context));
  }

  debug(message: string, context?: string) {
    return this.checkLevelAndExecute('debug', () =>
      super.debug(message, context),
    );
  }

  verbose(message: string, context?: string) {
    return this.checkLevelAndExecute('verbose', () =>
      super.verbose(message, context),
    );
  }

  private checkLevelAndExecute(level: string, functionToExecute: any) {
    let executed = false;
    const logLevel = process.env.MNA_LOG_LEVEL || 'log';

    if (this.LOG_LEVELS.indexOf(logLevel) >= this.LOG_LEVELS.indexOf(level)) {
      functionToExecute();
      executed = true;
    }

    return executed;
  }
}
