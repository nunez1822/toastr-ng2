import { ViewContainerRef } from '@angular/core';
import { ToastrService, ToastrConfig } from '../components/toastr/toastr';
export declare class DemoApp {
    private toastrService;
    private viewContainerRef;
    options: ToastrConfig;
    title: string;
    type: string;
    message: string;
    lastInserted: number[];
    constructor(toastrService: ToastrService, viewContainerRef: ViewContainerRef);
    openToast(): void;
    openRandomToast(): void;
    clearToasts(): void;
    clearLastToast(): void;
}
