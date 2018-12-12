import {
  MatButtonModule, MatCardModule, MatChipsModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSidenavModule, MatSlideToggleModule, MatSnackBarModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {NgModule} from "@angular/core";

@NgModule({
  imports: [
    MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule,
    MatInputModule, MatIconModule, MatTooltipModule, MatDialogModule,
    MatChipsModule, MatSidenavModule, MatProgressSpinnerModule, MatSlideToggleModule,
    MatFormFieldModule, MatSnackBarModule
  ],
  exports: [
    MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule,
    MatInputModule, MatIconModule, MatTooltipModule, MatDialogModule,
    MatChipsModule, MatSidenavModule, MatProgressSpinnerModule, MatSlideToggleModule,
    MatFormFieldModule, MatSnackBarModule
  ]
})
export class AppMaterialModule { }
