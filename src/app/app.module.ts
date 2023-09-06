import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './ext-module/material/material.module';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';
import { TestcomComponent } from './testcom/testcom.component';
import { TableGeneratedColumnsExample } from './table-generated-columns-example/table-generated-columns-example';
import { ChecboxTestComponent } from './checbox-test/checbox-test.component';

@NgModule({
  declarations: [AppComponent, NotfoundComponent, TestcomComponent, TableGeneratedColumnsExample, ChecboxTestComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
