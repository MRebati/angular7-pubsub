import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, Subscription } from 'rxjs';

const ServiceName: string = 'PubSub Service';

@Injectable()
export class PubSubService implements IPubSubService {
  private events = {};

  constructor() {}

  /**
   * a subscription which returns everything as an observable from @see {RxJs}
   * this method does not use eventObject
   * @param {event} event - the specific name to subscribe on - the names must be specific to those we publish.
   * @returns {Observable<any>} an observable.
   * @summary remember to unsubscribe in onDestroy of the components
   */
  public $sub(event: string): Observable<any>;

  /**
   * a subscription which returns the callback, error and complete as a subscription from @see {RxJs}
   * this method does not use eventObject
   * @param {event} event - the specific name to subscribe on - the names must be specific to those we publish.
   * @param {(value: any) => void} callback - callback method which gets the value from eventObject.
   * @returns {Subscription} a subscription which we can listen to.
   * @summary remember to unsubscribe in onDestroy of the components
   */
  public $sub(event: string, callback: (value: any) => void): Subscription;

  /**
   * a subscription which returns the callback, error and complete as a subscription from @see {RxJs}
   * this method does not use eventObject
   * @param {event} event - the specific name to subscribe on - the names must be specific to those we publish.
   * @param {(error: any) => void} error - exception catch function
   * @param {() => void} complete - complete function
   * @returns {Subscription} a subscription which we can listen to.
   * @summary remember to unsubscribe in onDestroy of the components
   */
  public $sub(
    event: string,
    callback: (value: any) => void,
    error: (error: any) => void
  ): Subscription;

  /**
   * a subscription which returns the callback, error and complete as a subscription from @see {RxJs}
   * @param {event} event - the specific name to subscribe on - the names must be specific to those we publish.
   * @param {(value: any) => void} callback - callback function
   * @param {(error: any) => void} error - exception catch function
   * @param {() => void} complete - complete function
   * @returns {Subscription} a subscription which we can listen to.
   * @summary remember to unsubscribe in onDestroy of the components
   */
  public $sub(
    event: string,
    callback: (value: any) => void,
    error: (error: any) => void,
    complete: () => void
  ): Subscription;

  /**
   * a void function when we don't want to use the subscription from 'RxJs';
   * @param {event} event - the specific name to subscribe on - the names must be specific to those we publish.
   * @param {(value: any) => void} callback - callback function
   * @param {(error: any) => void} error - exception catch function
   * @param {() => void} complete - complete function
   */
  public $sub(event: string,callback?: (value: any) => void,error?: (error: any) => void,complete?: () => void
  ) {
    if (!event) {
      throw new Error(
        `[${ServiceName}] => Subscription method must get event name.`
      );
    }

    if (this.events[event] === undefined) {
      this.events[event] = new ReplaySubject<any>();
    }

    if (typeof callback !== 'function') {
      return this.events[event].asObservable();
    } else {
      return this.events[event]
        .asObservable()
        .subscribe(callback, error, complete);
    }
  }

  /**
   * Base Module needed to use PubSubService.
   * @param {event} event - the specific name to subscribe on
   * @param {eventObject} eventObject - the optional paramter to send when raising the event
   */
  public $pub(event: string, eventObject?: any) {
    if (!event) {
      throw new Error(
        `[${ServiceName}] => Publish method must get event name.`
      );
    } else if (!this.events[event]) {
      return;
    }

    this.events[event].next(eventObject);
  }
}

export interface IPubSubService {
  $pub(event: string, eventObject?: any): void;
  $sub(event: string): Observable<any>;
  $sub(event: string, callback: (value: any) => void): Subscription;
  $sub(
    event: string,
    callback: (value: any) => void,
    error: (error: any) => void
  ): Subscription;
  $sub(
    event: string,
    callback: (value: any) => void,
    error: (error: any) => void,
    complete: () => void
  ): Subscription;
}

interface I$sub {
  (event: string): Observable<any>;
  (event: string, callback: (value: any) => void): Subscription;
  (
    event: string,
    callback: (value: any) => void,
    error: (error: any) => void
  ): Subscription;
  (
    event: string,
    callback: (value: any) => void,
    error: (error: any) => void,
    complete: () => void
  ): Subscription;
}
