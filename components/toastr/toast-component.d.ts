import { OnDestroy } from '@angular/core';
import { ToastConfig } from './toastr-config';
import { ToastrService } from './toastr-service';
export declare class Toast implements OnDestroy {
    private toastrService;
    toastId: number;
    timeout: number;
    message: string;
    title: string;
    toastType: string;
    options: ToastConfig;
    state: string;
    private hideTime;
    private intervalId;
    private width;
    constructor(toastrService: ToastrService);
    ngOnDestroy(): void;
    activateToast(): void;
    updateProgress(): void;
    tapToast(): void;
    remove(): void;
}
