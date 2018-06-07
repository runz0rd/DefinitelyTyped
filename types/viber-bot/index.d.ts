// Type definitions for viber-bot 1.0
// Project: https://github.com/Viber/viber-bot-node#readme
// Definitions by: Milos Pejanovic <https://github.com/runz0rd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="node" />
/// <reference types="express" />
/// <reference types="winston" />

import { EventEmitter } from "events";
import { Express } from "express";
import { LoggerInstance } from "winston";

declare class UserProfile {
    id: string;
    name: string;
    avatar?: string;
    country?: string;
    language?: string;
    api_version?: number;

    constructor(id: string, name: string, avatar?: string, country?: string, language?: string, api_version?: number);
}

declare namespace Message {

    class Message {
        timestamp: number;
        token: string;
        trackingData: string;
        keyboard: object;
        requiredArguments: string[];
        minApiVersion: number;

        constructor(requiredArguments: string[], keyboard?: object, trackingData?: string, timestamp?: number, token?: string, minApiVersion?: number);
    }

    class Text extends Message {
        text: string;
        constructor(text: string, keyboard?: object, trackingData?: string, timestamp?: number, token?: string, minApiVersion?: number);
    }

    class Url extends Message {
        url: string;
        constructor(url: string, keyboard?: object, trackingData?: string, timestamp?: number, token?: string, minApiVersion?: number);
    }

    class Contact extends Message {
        contactName: string;
        contactPhoneNumber: string;
        optionalAvatar?: string;
        constructor(contactName: string, contactPhoneNumber: string, avatar?: string, keyboard?: object, trackingData?: string, timestamp?: number, token?: string, minApiVersion?: number);
    }

    class Location extends Message {
        latitude: string;
	    longitude: string;
        constructor(latitude: string, longitude: string, keyboard?: object, trackingData?: string, timestamp?: number, token?: string, minApiVersion?: number);
    }

    class Picture extends Message {
        url: string;
        text?: string;
        thumbnail?: string;
        constructor(url: string, text?: string, thumbnail?: string, keyboard?: object, trackingData?: string, timestamp?: number, token?: string, minApiVersion?: number);
    }

    class Video extends Message {
        url: string;
        size: number
        text?: string;
        thumbnail?: string;
        duration?: number;
        constructor(url: string, size: number, text?: string, thumbnail?: string, duration?: number, keyboard?: object, trackingData?: string, timestamp?: number, token?: string, minApiVersion?: number);
    }

    class Sticker extends Message {
        stickerId: string;
        constructor(stickerId: string, keyboard?: object, trackingData?: string, timestamp?: number, token?: string, minApiVersion?: number);
    }

    class RichMedia extends Message {
        richMedia: string;
	    altText?: string;
        constructor(richMedia: string, keyboard?: object, trackingData?: string, timestamp?: number, token?: string, altText?: string, minApiVersion?: number);
    }

    class Keyboard extends Message {
        constructor(keyboard: object, trackingData?: string, timestamp?: number, token?: string, minApiVersion?: number);
    }
}

interface ApiResponse {
    status: number;
    status_message: string;
    event_types: Events[];
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

interface AccountInfo extends ApiResponse {
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

interface UserDetails extends ApiResponse {
    message_token: number;
    user: User;
}

interface UserStatus extends ApiResponse {
    users: User[]
}

declare class Response {
    bot: Bot;
    userProfile: UserProfile;
    silent: boolean;
    replyType: string;
    chatId: string;

    constructor(bot: Bot, userProfile: UserProfile, silent: boolean, replyType: string, chatId: string);

    send(message: Message.Message, trackingData?: object): Promise<ApiResponse>;
    send(messages: Message.Message[], trackingData?: object): Promise<ApiResponse>;
}

interface BotConfiguration {
    logger?: LoggerInstance,
    authToken: string;
    name: string;
    avatar: string;
    registerToEvents?: Events[];
}

declare class Bot extends EventEmitter {

    constructor(configuration: BotConfiguration);

    getBotProfile(): Promise<AccountInfo>;

    getUserDetails(userProfile: UserProfile): Promise<User>;

    getOnlineStatus(viberUserIds: string[]): Promise<UserStatus>;

    setWebhook(url: string, isInline?: boolean): Promise<ApiResponse>;

    sendMessage(userProfile: UserProfile, message: Message.Message, trackingData?: object, chatId?: string): ApiResponse;
    sendMessage(userProfile: UserProfile, messages: Message.Message[], trackingData?: object, chatId?: string): ApiResponse;

    postToPublicChat(userProfile: UserProfile, message: Message.Message): Promise<ApiResponse>;
    postToPublicChat(userProfile: UserProfile, messages: Message.Message[]): Promise<ApiResponse>;

    middleware(): Express;

    onTextMessage(regex: RegExp, callback: (message: Message.Text, response: Response) => void): void;

    onError(callback: (error: Error) => void): void;

    onConversationStarted(
        callback: (
            userProfile: UserProfile,
            isSubscribed: boolean,
            context: string,
            onFinish: (message: Message.Message|null) => void) => void
        ): void;

    onSubscribe(callback: (response: Response) => void): void;

    onUnsubscribe(callback: (userId: string) => void): void;
}

declare enum Events {
    MESSAGE_RECEIVED = "message",
	MESSAGE_SENT = "message_sent",
	SUBSCRIBED = "subscribed",
	UNSUBSCRIBED = "unsubscribed",
	CONVERSATION_STARTED = "conversation_started",
	ERROR = "error",
	FAILED = "failed"
}