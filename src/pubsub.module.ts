import { PubSubService } from './angular2-pubsub.service';
import { ModuleWithProviders, NgModule } from '@angular/core';

@NgModule({
  providers: [
    PubSubService
  ],
  exports: [
    PubSubService
  ]
})
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