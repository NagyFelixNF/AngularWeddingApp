import { Component, OnInit } from '@angular/core';
import { Vendor, VendorPage } from 'app/@core/data/vendor';

@Component({
  selector: 'vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {

  vendors: Vendor[] = []
  vendorpages: VendorPage[] = []

  constructor() { }

  ngOnInit(): void {
    var vendor: Vendor =
    {
      id: '0',
      name: 'Photo 1',
      description: 'The Best Photographer around town!',
      category: 'Photography',
      email: 'photo1@gmail.com',
      telnumber: '0632343245',
    }
    for (let tempindex = 0; tempindex < 10; tempindex++) {
      var vendor: Vendor =
    {
      id: tempindex.toString(),
      name: 'Photo ' + tempindex.toString(),
      description: 'The Best Photographer around town!',
      category: 'Photography',
      email: 'photo1@gmail.com',
      telnumber: '0632343245',
    }
    this.vendors.push(vendor);
    }
    console.log(this.vendors);
    var index = 0;
    var i = 1;
    var vendortmp : VendorPage = {
      vendor: [],
    };
    this.vendorpages.push(vendortmp);
    this.vendors.forEach(element => {
      this.vendorpages[index].vendor.push(element);
      console.log(this.vendorpages);
      if(i%3 == 0)
      {
        vendortmp = {
          vendor: [],
        };
        this.vendorpages.push(vendortmp);
        index++;
      }
      i++;
    });
    
  }

}
