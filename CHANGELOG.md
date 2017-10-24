## Next v4.0.0
 - Only version changed for anyone using Angular 4.0.0

## v2.0.4
 - Fixed the issue that created multiple pubsub services (#7).

## v2.0.1
 - $pub command return undefined when no event subscribe.
 - $sub method bug solved. RxJS Subscriber no longer call subscribe method on start.

## v2.0.0
 - PubSubService moved into PubSubModule.
 - Added unit tests for the service and project restructure updated to use the benefits of webpack and bundling.

## v1.1.1
Recovery fix and added interfaces.

### Class Overview
```typescript
declare class PubSubService{
	private events: Object;
	$pub(event: string, eventObject?: any): void;
	$sub: {
		(): undefined;
		(event: string): Observable<any>;
		(event: string, callback: (value: any) => void): Subscription;
		(event: string, callback: (value: any) => void, error: (error: any) => void): Subscription;
		(event: string, callback: (value: any) => void, error: (error: any) => void, complete: () => void): Subscription;
	}
}
```

-------
## v1.1.0

Added overload to $sub method for to be useful.

### Class Overview
```typescript
declare class PubSubService{
	private events: Object;
	$pub(event: string, eventObject?: any): void;
	$sub(event: string): <Observable<any>>;
	$sub(event: string, callback: (value: any) => void, error?: (error: any) => void, complete?: () => void): Subscription;
}
```
-------
## v1.0.0
A simple publisher/subscriber service.

### Class Overview
```typescript
declare class PubSubService{
	private events: Object;
	$pub(event: string, eventObject?: any): void;
	$sub(event: string): <Observable<any>>;
	$sub(event: string, callback: (value: any) => void, error?: (error: any) => void, complete?: () => void): Subscription;
}
```