import { Toast } from './toast-component';
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
