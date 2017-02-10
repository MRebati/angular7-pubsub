import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PubSubService {
	private events = {};	

	constructor() { }

	$sub(event: string, callback: (value: any) => void, error?: (error: any) => void, complete?: () => void) {
		if (event == undefined) { 
			console.warn('[PubSub Service] => Subscription method must get event name.');
			return;
		};

		if (this.events[event] === undefined)
			this.events[event] = new BehaviorSubject<any>(0);
		if (!callback || typeof callback !== 'function')
			return <Observable<any>>this.events[event].asObservable();
		else	
			return (<Observable<any>>this.events[event].asObservable()).subscribe(callback, error, complete);
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