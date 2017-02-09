# Pub/Sub Service for Angular 2

A simple publisher/subscriber service. 

## Usage
 - Import service in your codes.

 - Add service to App Module providers.
```typescript
...

import { EventDispatcherService } from './path/to/service/angular2-pubsub.service'; // <= HERE

@NgModule({
declarations: [
	RootComponent,
	NavigationComponent,
	OverlayComponent
],
imports: [
	BrowserModule,
	FormsModule,
	HttpModule
],
providers: [EventDispatcherService], // <= AND HERE
bootstrap: [RootComponent]
})

...
```
 - And import service wherever you want

## Documentation

#### Class Overview

```typescript
declare class PubSubService{
	private events: Object;
	$pub(event: string, eventObject?: any): void;
	$sub(event: string): <Observable<number>>;
}
```

#### PubSubService.$pub(event: stirng, eventObject?: any): void
	
Publish event to all subscriber.

etc.
```typescript
export class OverlayComponent implements OnInit, OnDestroy {
	constructor(private pubsub: PubSubService) { }

	anyFunc(){
		this.pubsub.$pub('pleaseCloseSidenav', 'helloIAmOverlay');
	}
}
```

#### PubSubService.$sub(event: stirng): Observable<number>

Subscribe to channel. 

etc.
```typescript
export class NavigationComponent implements OnInit, OnDestroy {
	sideanvSub: any;
	
	constructor(private pubsub: EventDispatcherService) { }

	ngOnInit() {
		this.closeSidenavSub = this.pubsub.$sub('pleaseCloseSidenav').subscribe((from) => {
			from ? this.sidenavOpened = false : void 0
		});
	}
	ngOnDestroy() {
		this.closeSidenavSub.unsubscribe();
	}
```

	$sub method have one bug. RxJS Subscriber call subscribe method on start like Angular 1.x $scope.$watch.
	
```typescript
this.closeSidenavSub = this.pubsub.$sub('pleaseCloseSidenav').subscribe((from) => {
	console.log(form);
});

// => 0 
```