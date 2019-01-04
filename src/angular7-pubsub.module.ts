import { PubSubService } from './angular7-pubsub.service';
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