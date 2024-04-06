import { Component, Injectable, inject } from '@angular/core';
import {
  MatDialog, MatDialogRef, MatDialogState,
} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modal: MatDialog;
  private modalRef: MatDialogRef<any> | undefined;

  constructor() { 
    this.modal = inject(MatDialog);
  }

  public open(dailogComponent:any){
    
    this.close();
    const ref = this.modal.open<any>(dailogComponent);
    this.modalRef = ref;
  }
  public close(){

    if(this.modalRef?.getState() === MatDialogState.OPEN){
      this.modalRef.close();
    }
    
  }
}
