import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from  '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar'

const MaterialComponents = [
  MatCardModule,
  MatToolbarModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  BrowserAnimationsModule,
  FormsModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatCheckboxModule,
  MatSelectModule,
  MatIconModule,
  MatGridListModule,
  MatButtonModule,
  MatTableModule,
  MatDialogModule,
  MatSnackBarModule,
]

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
