
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