import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as client from 'prom-client';

client.collectDefaultMetrics();

const httpRequests = new client.Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'route', 'status'],
});

const httpDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.01, 0.05, 0.1, 0.3, 0.5, 1, 2, 5],
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // מודד כל בקשה
  app.use((req: any, res: any, next: () => void) => {
    if (req.path === '/metrics') return next();
    const end = httpDuration.startTimer();
    res.on('finish', () => {
      const route = req.route?.path ?? 'unmatched';
      const labels = { method: req.method, route, status: String(res.statusCode) };
      end(labels);
      httpRequests.inc(labels);
    });
    next();
  });

  const server = app.getHttpAdapter().getInstance();
  server.get('/metrics', async (_req: any, res: any) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();