import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'warning-modal',
    templateUrl: './warning-modal.component.html',
    imports: []
})

export class WarningModalComponent {
    message: string = "";

    constructor(public activeModal: NgbActiveModal) {}

    dismiss(): void {
        this.activeModal.dismiss('cancel'); // Trả về 'cancel' khi người dùng hủy
    }
}