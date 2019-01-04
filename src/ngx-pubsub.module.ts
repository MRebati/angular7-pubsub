import { PubSubService } from './ngx-pubsub.service';
import { ModuleWithProviders, NgModule } from '@angular/core';

@NgModule()
export class PubSubModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: PubSubModule,
      providers: [
        PubSubService
      ]
    };
  }
}