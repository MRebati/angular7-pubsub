# Pub/Sub Service for Angular 7

A simple publisher/subscriber service.
This repository is forked from angular-pubsub and 
the only reason I changed it was to use RXJs version 6 and above. and updated the angular packages.

All credit goes to the owner and contributers of angular-pubsub repo.

[![NPM](https://nodei.co/npm/angular7-pubsub.png?downloads=true&stars=true)](https://nodei.co/npm/angular7-pubsub/)

## Usage

- Import service in your codes or download via npm or bower.

`npm i --save angular7-pubsub`

- Add module bundle to imports in your application.

```typescript
...

import { PubSubModule } from 'angular7-pubsub'; // <= HERE

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

### Class Overview

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

#### PubSubService.$pub(event: string, eventObject?: any): void

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

#### PubSubService.$sub(event: string): Observable<any>

Subscribe to channel.

etc.

```typescript
export class NavigationComponent implements OnInit, OnDestroy {
    closeSidenavSub: Subscription;
    openSidenavSub: Subscription;
    constructor(private pubsub: EventDispatcherService) { }

    ngOnInit() {
        // usage of $sub(event: string): <Observable<any>>;
        this.closeSidenavSub = this.pubsub.$sub('pleaseCloseSidenav').subscribe((from) => {
            this.sidenavOpened = false;
        });

        // usage of $sub(event: string, callback: (value: any) => void, error?: (error: any) => void, complete?: () => void): Subscription;
        this.openSidenavSub = this.pubsub.$sub('pleaseOpenSidenav', (from) => {
            this.sidenavOpened = true;
        });
    }
    ngOnDestroy() {
        this.closeSidenavSub.unsubscribe();
        this.openSidenavSub.unsubscribe();
    }
```

**See Changelog** ~~$sub method have one bug. RxJS Subscriber call subscribe method on start like Angular 1.x $scope.$watch.~~

## Build the source

Follow the steps to run the tests and build the source code.

```sh
npm install
npm test
npm run build
```

Commands above will generate the ready to use bundles under the `./dist` folder.
