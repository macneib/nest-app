
import {
  TerminusOptionsFactory,
  TerminusEndpoint,
  TerminusModuleOptions,
  DiskHealthIndicator,
  MemoryHealthIndicator,
  MicroserviceHealthIndicator,
  } from '@nestjs/terminus';
  import { Injectable } from '@nestjs/common';
  import { Transport } from '@nestjs/microservices';
  
  @Injectable()
  export class TerminusOptionsService implements TerminusOptionsFactory {
    constructor(
      private readonly microservice: MicroserviceHealthIndicator,
      private readonly memory: MemoryHealthIndicator,
    ) {}
  
    createTerminusOptions(): TerminusModuleOptions {
      const healthEndpoint: TerminusEndpoint = {
        url: '/healthz',
        healthIndicators: [
          async () => this.memory.checkHeap('memory_heap', 200 * 1024 * 1024),
          async () => this.memory.checkRSS('memory_rss', 3000 * 1024 * 1024),
          async () => this.microservice.pingCheck('tcp', {
            transport: Transport.TCP,
            options: { host: 'localhost', port: 3000 },
          }),
        ],
      };
      return {
        endpoints: [healthEndpoint],
      };
    }
  }