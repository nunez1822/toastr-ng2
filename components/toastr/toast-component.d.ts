import { ToastConfig } from './toastr-config';
import { ToastrService } from './toastr-service';
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
