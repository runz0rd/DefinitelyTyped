// Type definitions for viber-bot 1.0
// Project: https://github.com/Viber/viber-bot-node#readme
// Definitions by: Milos Pejanovic <https://github.com/runz0rd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="node" />

import { EventEmitter } from "events";

/*~ If this module has methods, declare them as functions like so.
 */
export function myMethod(a: string): string;
export function myOtherMethod(a: number): number;


export interface UserProfile {
    id: string;
    name: string;
    avatar: string;
    country: string;
    language: string;
    api_version: number;
}

export namespace Message {

    class Message {
        timestamp: number;
        token: string;
        trackingData: string;
        keyboard: object;
        requiredArguments: string[];
        minApiVersion: number;
    }

    export class Text extends Message {
        text: string;
        constructor(text: string, keyboard?: object, trackingData?: string, timestamp?: number, token?: string, minApiVersion?: number);
    }

    export class Url extends Message {
        url: string;
        constructor(url: string, keyboard?: object, trackingData?: string, timestamp?: number, token?: string, minApiVersion?: number);
    }

    export class Contact extends Message {
        contactName: string;
        contactPhoneNumber: string;
        optionalAvatar?: string;
        constructor(contactName: string, contactPhoneNumber: string, avatar?: string, keyboard?: object, trackingData?: string, timestamp?: number, token?: string, minApiVersion?: number);
    }

    export class Location extends Message {
        latitude: string;
	    longitude: string;
        constructor(latitude: string, longitude: string, keyboard?: object, trackingData?: string, timestamp?: number, token?: string, minApiVersion?: number);
    }

    export class Picture extends Message {
        url: string;
        text?: string;
        thumbnail?: string;
        constructor(url: string, text?: string, thumbnail?: string, keyboard?: object, trackingData?: string, timestamp?: number, token?: string, minApiVersion?: number);
    }

    export class Video extends Message {
        url: string;
        size: number
        text?: string;
        thumbnail?: string;
        duration?: number;
        constructor(url: string, size: number, text?: string, thumbnail?: string, duration?: number, keyboard?: object, trackingData?: string, timestamp?: number, token?: string, minApiVersion?: number);
    }

    export class Sticker extends Message {
        stickerId: string;
        constructor(stickerId: string, keyboard?: object, trackingData?: string, timestamp?: number, token?: string, minApiVersion?: number);
    }

    export class RichMedia extends Message {
        richMedia: string;
	    altText?: string;
        constructor(richMedia: string, keyboard?: object, trackingData?: string, timestamp?: number, token?: string, altText?: string, minApiVersion?: number);
    }

    export class Keyboard extends Message {
        constructor(keyboard: object, trackingData?: string, timestamp?: number, token?: string, minApiVersion?: number);
    }
}

interface Response {
    status: number;
    status_message: string;
    event_types: string[];
}

interface User extends UserProfile {
    primary_device_os: string;
    viber_version: string;
    mcc: number;
    mnc: number;
    device_type: string;
    role: string;
    online_status: number;
    online_status_message: string;
    last_online: number;
}

interface Location {
    lat: number;
    long: number;
}

interface AccountInfo extends Response {
    id: string;
    name: string;
    uri: string;
    icon: string;
    background: string;
    category: string;
    subcategory: string;
    location: Location;
    country: string;
    webhook: string;
    subscribers_count: number;
    members: User[];
}

interface UserDetails extends Response {
    message_token: number;
    user: User;
}

interface UserStatus extends Response {
    users: User[]
}

/*~ You can declare properties of the module using const, let, or var */
export const myField: number;

/*~ If there are types, properties, or methods inside dotted names
 *~ of the module, declare them inside a 'namespace'.
 */
export interface Bot extends EventEmitter {

    getBotProfile(): AccountInfo;

    getUserDetails(userProfile: UserProfile): User;

    getOnlineStatus(viberUserIds: string[]): UserStatus;

    setWebhook(url: string, isInline: boolean): Response;

    sendMessage(userProfile: UserProfile, message: Message, optionalTrackingData?: any, optionalChatId?: string): User;
    sendMessage(userProfile: UserProfile, messages: Message[], optionalTrackingData?: any, optionalChatId?: string): User;

    postToPublicChat(userProfile: UserProfile): User;

    middleware(userProfile: UserProfile): User;

    onTextMessage(userProfile: UserProfile): User;

    onError(userProfile: UserProfile): User;

    onConversationStarted(userProfile: UserProfile): User;

    onSubscribe(userProfile: UserProfile): User;

    onUnsubscribe(userProfile: UserProfile): User;
}