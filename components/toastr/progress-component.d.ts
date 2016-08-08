import { OnInit, OnDestroy } from '@angular/core';
export declare class ToastProgress implements OnInit, OnDestroy {
    private _ttl;
    private hideTime;
    private intervalId;
    private width;
    ttl: number;
    ngOnInit(): void;
    ngOnDestroy(): void;
    updateProgress(): void;
}
