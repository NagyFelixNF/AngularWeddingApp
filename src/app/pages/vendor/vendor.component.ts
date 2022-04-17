import { Component, OnInit } from '@angular/core';
import { Vendor, VendorPage } from 'app/@core/data/vendor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ThisReceiver } from '@angular/compiler';
import { DefaultvendorsService } from 'app/@core/mock/defaultvendors.service';

@Component({
  selector: 'vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {

  examplevendors: Vendor[] = []
  examplevendorpages: VendorPage[] = []
  customvendors: Vendor[] = []
  customvendorpages: VendorPage[] = []
  Name: string;
  Tel:string;
  Email:string;
  Desc:string;
  Category:string;


  constructor(private modalService: NgbModal, private DefaultVendorService: DefaultvendorsService) { }

  ngOnInit(): void {
    this.GetExampleVendors();
    this.examplevendorpages = [];
    this.FormatDataForCarousel(this.examplevendorpages,this.examplevendors);
    this.customvendorpages = [];
    this.FormatDataForCarousel(this.customvendorpages,this.customvendors);
  }

  GetExampleVendors()
  {
    this.DefaultVendorService.GetDeafultVendors().subscribe(vendors => this.examplevendors = vendors);
  }

  open(content)
  {
    this.modalService.open(content, {size: 'sm'});
  }

  AddExample(Vendor:Vendor)
  {
    var index = this.examplevendors.indexOf(Vendor);
    this.customvendors.push(this.examplevendors[index]);
    this.examplevendors.splice(index,1);
    this.examplevendorpages = [];
    this.FormatDataForCarousel(this.examplevendorpages,this.examplevendors);
    this.customvendorpages = [];
    this.FormatDataForCarousel(this.customvendorpages,this.customvendors);
  }

  FormatDataForCarousel(Vendorpages:VendorPage[],Vendors:Vendor[])
  {
    var index = 0;
    var i = 1;
    var vendortmp : VendorPage = {
      vendor: [],
    };
    Vendorpages.push(vendortmp);
    Vendors.forEach(element => {
      Vendorpages[index].vendor.push(element);
      if(i%3 == 0)
      {
        vendortmp = {
          vendor: [],
        };
        Vendorpages.push(vendortmp);
        index++;
      }
      i++;
    });
    if(Vendorpages[Vendorpages.length - 1].vendor.length == 0)
    {
      Vendorpages.pop();
    }
    console.log(this.examplevendorpages);
  }

  AddVendor()
  {
    var vendor: Vendor =
    {
      id: '0',
      name: this.Name,
      description: this.Desc,
      category: this.Category,
      email: this.Email,
      telnumber: this.Tel,
      editable: true,
    }
    this.customvendors.push(vendor);
    this.customvendorpages = [];
    this.FormatDataForCarousel(this.customvendorpages,this.customvendors);
    this.modalService.dismissAll();
  }

}
