import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PubSubService {
	private events = {};	

	constructor() { }

	$sub(event: string) {
		if (event == undefined) { 
			console.warn('[PubSub Service] => Subscription method must get event name.');
			return;
		};

		if (this.events[event] === undefined)
			this.events[event] = new BehaviorSubject<number>(0);
		
		return <Observable<number>>this.events[event].asObservable();
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