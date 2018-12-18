import {
  MatButtonModule, MatCardModule, MatChipsModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatMenuModule, MatProgressSpinnerModule, MatSidenavModule, MatSlideToggleModule, MatSnackBarModule,
  MatToolbarModule, MatTooltipModule, MatGridListModule
} from '@angular/material';
import {LayoutModule} from "@angular/cdk/layout";
import {NgModule} from "@angular/core";

@NgModule({
  imports: [
    MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule,
    MatInputModule, MatIconModule, MatTooltipModule, MatDialogModule,
    MatChipsModule, MatSidenavModule, MatProgressSpinnerModule, MatSlideToggleModule,
    MatFormFieldModule, MatSnackBarModule, LayoutModule, MatGridListModule
  ],
  exports: [
    MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule,
    MatInputModule, MatIconModule, MatTooltipModule, MatDialogModule,
    MatChipsModule, MatSidenavModule, MatProgressSpinnerModule, MatSlideToggleModule,
    MatFormFieldModule, MatSnackBarModule, LayoutModule, MatGridListModule
  ]
})
export class AppMaterialModule { }
