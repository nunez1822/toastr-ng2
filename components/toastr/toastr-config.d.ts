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
    maxOpened: number;
    autoDismiss: boolean;
    iconClasses: {
        error: string;
        info: string;
        success: string;
        warning: string;
    };
    newestOnTop: boolean;
    preventDuplicates: boolean;
}
