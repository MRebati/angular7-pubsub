/* tslint:disable:no-unused-variable */

import { PubSubService } from './ngx-pubsub.service';
import { Observable, Subscriber } from 'rxjs';

describe('PubSubService', (): void => {
    let pubService: PubSubService;

    beforeEach(() => {
        pubService = new PubSubService();
    });

    describe('$sub', (): void => {
        it('should throw an error when event is falsy', (): void => {
            expect(() => pubService.$sub(undefined)).toThrow();
        });

        it('should return an observable when there is no callback', (): void => {
            let result: any = pubService.$sub('test');
            expect(result instanceof Observable).toBeTruthy();
        });

        it('should return a subscriber when there is a callback specified', (): void => {
            let result: any = pubService.$sub('test', (v: any): void => {
                '';
            });
            expect(result instanceof Subscriber).toBeTruthy();
        });
    });

    describe('$pub', (): void => {
        it('should throw an error when event is falsy', (): void => {
            expect(() => pubService.$pub(undefined)).toThrow();
        });

        it('should do nothing when an event is not registered', (): void => {
            expect(() => pubService.$pub('not-registered')).not.toThrow();
        });

        it('should publish with parameters if the event is registered', (): void => {
            let subscriberEventSpy: jasmine.Spy = jasmine.createSpy('subscriberEvent');
            pubService.$sub('new-event', subscriberEventSpy);

            pubService.$pub('new-event', 'foo');

            expect(subscriberEventSpy).toHaveBeenCalledWith('foo');
        });
    });
});
