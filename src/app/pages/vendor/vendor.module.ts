import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorComponent } from './vendor.component';
import { FormsModule } from '@angular/forms';
import { NbAccordionModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbContextMenuModule, NbFormFieldModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    VendorComponent
  ],
  imports: [
    FormsModule,
    NbCardModule,
    ThemeModule,
    NbAccordionModule,
    NbCheckboxModule,
    NbContextMenuModule,
    NbIconModule,
    NbInputModule,
    NbButtonModule,
    NbFormFieldModule,
    NgbCarouselModule,
  ]
})
export class VendorModule { }
