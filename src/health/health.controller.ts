import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () =>
        this.http.pingCheck('healthCheck', 'http://localhost:3000/voice', {
          method: 'POST',
          headers: 'apiKey: ca03na188ame03u1d78620de67282882a84',
          data: { model: 1, text: 'healthCheck', reusable: true },
        }),
    ]);
  }
}
