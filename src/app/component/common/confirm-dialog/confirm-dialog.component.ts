import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    imports: []
})

export class ConfirmDialogComponent {
    message: string = "";

    constructor(public activeModal: NgbActiveModal) {}


    confirm(): void {
        this.activeModal.close('confirm'); // Trả về 'confirm' khi người dùng xác nhận
    }

    dismiss(): void {
        this.activeModal.dismiss('cancel'); // Trả về 'cancel' khi người dùng hủy
    }
}