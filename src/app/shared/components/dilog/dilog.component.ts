import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DilogData } from 'src/app/models/dilog.model';



@Component({
  selector: 'app-dilog',
  templateUrl: './dilog.component.html',
  styleUrls: ['./dilog.component.scss'],
})

export class DilogComponent {
  constructor(
    public dialogRef: MatDialogRef<DilogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DilogData
  ) {}
}
