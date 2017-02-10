import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class PubSubService implements IPubSubService{
	private events = {};	

	constructor() { }

	$sub(event: string): Observable<any>;
	$sub(event: string, callback: (value: any) => void): Subscription;	
	$sub(event: string, callback: (value: any) => void, error: (error: any) => void): Subscription;
	$sub(event: string, callback: (value: any) => void, error: (error: any) => void, complete: () => void): Subscription;
	$sub(event: string, callback?: (value: any) => void, error?: (error: any) => void, complete?: () => void){
		if (event == undefined) { 
			console.warn('[PubSub Service] => Subscription method must get event name.');
			return;
		};

		if (this.events[event] === undefined)
			this.events[event] = new BehaviorSubject<any>(0);
		
		if (!callback || typeof callback !== 'function')
			return this.events[event].asObservable();
		else	
			return this.events[event].asObservable().subscribe(callback, error, complete);
	}
	$pub(event: string, eventObject?: any) {
		if (event == undefined) {
			console.warn('[PubSub Service] => Publish method must get event name.');
			return;
		}
		else if (this.events[event] === undefined) {
			console.warn('[PubSub Service] => No recorded events found for "' + event + '".');
			return;
		}
		
		this.events[event].next(eventObject);		
	}	
}

interface IPubSubService{
	$pub(event: string, eventObject?: any);
	$sub: I$sub;
}

interface I$sub{
	(event: string): Observable<any>;
	(event: string, callback: (value: any) => void): Subscription;
	(event: string, callback: (value: any) => void, error: (error: any) => void): Subscription;
	(event: string, callback: (value: any) => void, error: (error: any) => void, complete: () => void): Subscription;
}

