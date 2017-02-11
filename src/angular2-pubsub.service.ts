import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

const ServiceName: string = "PubSub Service";

@Injectable()
export class PubSubService implements IPubSubService {
	private events = { };

	constructor() { }

	public $sub(event: string, callback?: (value: any) => void, error?: (error: any) => void, complete?: () => void) {
		if (!event) {
			throw new Error(`[${ServiceName}] => Subscription method must get event name.`);
		}

		if (this.events[event] === undefined) {
			this.events[event] = new BehaviorSubject<any>(0);
		}

		if (typeof callback !== 'function') {
			return this.events[event].asObservable();
		} else {
			return this.events[event].asObservable().subscribe(callback, error, complete);
		}
	}

	public $pub(event: string, eventObject?: any) {
		if (!event) {
			throw new Error(`[${ServiceName}] => Publish method must get event name.`);
		} else if (!this.events[event]) {
			throw new Error(`[${ServiceName}] => No recorded events found for ${event}.`);
		}

		this.events[event].next(eventObject);
	}
}

export interface IPubSubService {
	$pub(event: string, eventObject?: any);
	$sub(event: string, callback?: (value: any) => void, error?: (error: any) => void, complete?: () => void);
}
