
## v1.1

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
## v1.0
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