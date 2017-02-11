# Pub/Sub Service for Angular 2

A simple publisher/subscriber service. 

## Usage
 - Import service in your codes or download via npm or bower.

`npm i --save angular2-pubsub` | `bower i --save angular2-pubsub`

 - Add module bundle to imports in your application.
```typescript
...

import { PubSubModule } from 'angular2-pubsub'; // <= HERE

@NgModule({
declarations: [
	RootComponent,
	NavigationComponent,
	OverlayComponent
],
imports: [
	BrowserModule,
	FormsModule,
	HttpModule,
	PubSubModule.forRoot() // <= AND HERE
],
providers: [], 
bootstrap: [RootComponent]
})

...
```
 - And import service wherever you want

## Documentation

#### Class Overview

```typescript
declare class PubSubService {
	private events: Object;
	$pub(event: string, eventObject?: any): void;
	$sub(): undefined;
	$sub(event: string): Observable<any>;
	$sub(event: string, callback: (value: any) => void): Subscription;
	$sub(event: string, callback: (value: any) => void, error: (error: any) => void): Subscription;
	$sub(event: string, callback: (value: any) => void, error: (error: any) => void, complete: () => void): Subscription;
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

#### PubSubService.$sub(event: stirng): Observable<any>

Subscribe to channel. 

etc.
```typescript
export class NavigationComponent implements OnInit, OnDestroy {
	sideanvSub: any;
	
	constructor(private pubsub: EventDispatcherService) { }

	ngOnInit() {
		// usage of $sub(event: string): <Observable<any>>;
		this.closeSidenavSub = this.pubsub.$sub('pleaseCloseSidenav').subscribe((from) => {
			from ? this.sidenavOpened = false : void 0
		});

		// usage of $sub(event: string, callback: (value: any) => void, error?: (error: any) => void, complete?: () => void): Subscription;
		this.openSidenavSub = this.pubsub.$sub('pleaseOpenSidenav', (from) => {
			from ? this.sidenavOpened = false : void 0
		});
	}
	ngOnDestroy() {
		this.closeSidenavSub.unsubscribe();
		this.openSidenavSub.unsubscribe();
	}
```

	$sub method have one bug. RxJS Subscriber call subscribe method on start like Angular 1.x $scope.$watch.
	
```typescript
this.closeSidenavSub = this.pubsub.$sub('pleaseCloseSidenav').subscribe((from) => {
	console.log(form);
});

// => 0 
```

## Build the source

Follow the steps to run the tests and build the source code.
```sh
npm install
npm test
npm run build
```
Commands above will generate the ready to use bundles under the `./dist` folder.

## Contributers

- [Semih KEŞKEK](http://github.com/sqlProvider)
- [Mert SUSUR](http://github.com/msusur)