import { ViewContainerRef, Injector } from '@angular/core';
import { Overlay } from './overlay/overlay';
import { OverlayRef } from './overlay/overlay-ref';
import { PortalHost } from './portal/portal';
export declare class ToastConfig {
    closeButton: boolean;
    progressBar: boolean;
    timeOut: number;
    toastClass: string;
    positionClass: string;
    titleClass: string;
    messageClass: string;
    tapToDismiss: boolean;
    toastComponent: typeof Toast;
}
export declare class ToastrConfig extends ToastConfig {
    autoDismiss: boolean;
    iconClasses: {
        error: string;
        info: string;
        success: string;
        warning: string;
    };
    maxOpened: number;
    newestOnTop: boolean;
    preventDuplicates: boolean;
}
export interface ActiveToast {
    toastId: number;
    message: string;
    portal?: Promise<PortalHost>;
    overlayRef?: Promise<OverlayRef>;
}
export declare class ToastrService {
    toastrConfig: ToastrConfig;
    private overlay;
    private injector;
    viewContainerRef: ViewContainerRef;
    private index;
    private toasts;
    private container;
    private previousToastMessage;
    constructor(toastrConfig: ToastrConfig, overlay: Overlay, injector: Injector);
    success(message: string, title?: string, optionsOverride?: ToastConfig): ActiveToast;
    error(message: string, title?: string, optionsOverride?: ToastConfig): ActiveToast;
    info(message: string, title?: string, optionsOverride?: ToastConfig): ActiveToast;
    warning(message: string, title?: string, optionsOverride?: ToastConfig): ActiveToast;
    clear(toastId?: number): void;
    remove(toastId: number): boolean;
    private _findToast(toastId);
    private isDuplicate(message);
    private _buildNotification(type, message, title?, optionsOverride?);
}
export declare const TOASTR_PROVIDERS: any;
export declare class Toast {
    private toastrService;
    toastId: number;
    timeout: number;
    message: string;
    title: string;
    toastType: string;
    options: ToastConfig;
    state: string;
    constructor(toastrService: ToastrService);
    activateToast(): void;
    tapToast(): void;
    remove(): void;
}
