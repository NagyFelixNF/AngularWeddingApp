import { Component, OnInit } from '@angular/core';
import { Vendor, VendorPage } from 'app/@core/data/vendor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ThisReceiver } from '@angular/compiler';
import { DefaultvendorsService } from 'app/@core/mock/defaultvendors.service';
import { VendorService } from 'app/@core/services/vendor.service';

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
  Id:string;


  constructor(private modalService: NgbModal, private DefaultVendorService: DefaultvendorsService, private VendorService:VendorService) { }

  ngOnInit(): void {
    this.GetVendors();
  }

  GetVendors()
  {
    this.VendorService.GetVendor().subscribe(vendors => {
      this.customvendors = vendors
      this.GetExampleVendors();
      this.RemoveFromExample();
      this.examplevendorpages = [];
      this.FormatDataForCarousel(this.examplevendorpages,this.examplevendors);
      this.customvendorpages = [];
      this.FormatDataForCarousel(this.customvendorpages,this.customvendors);
    });
  }

  GetExampleVendors()
  {
    this.DefaultVendorService.GetDeafultVendors().subscribe(vendors => this.examplevendors = vendors);
  }

  RemoveFromExample()
  {
    var customids = new Set;
    
    this.customvendors.forEach(element => {
      if(!(element.customid == null))
      {
        customids.add(element.customid);
      }
    });
    this.examplevendors = this.examplevendors.filter(x=> !(customids.has(x.id)));
    console.log(this.examplevendors);
  }

  open(content)
  {
    this.modalService.open(content, {size: 'sm'});
  }

  openEdit(content,vendor:Vendor)
  {
    this.Name = vendor.name;
    this.Category = vendor.category;
    this.Desc = vendor.description;
    this.Email = vendor.email;
    this.Tel = vendor.telnumber;
    this.Id = vendor.id;
    this.modalService.open(content, {size: 'sm'}).result.then(x => this.Name = "");
  }



  AddExample(Vendor:Vendor)
  {
    var index = this.examplevendors.indexOf(Vendor);
    this.examplevendors.splice(index,1);
    Vendor.customid = Vendor.id;
    delete Vendor.id;
    this.VendorService.AddVendor(Vendor).subscribe(vendor => {this.customvendors.push(vendor)
      this.examplevendorpages = [];
      this.FormatDataForCarousel(this.examplevendorpages,this.examplevendors);
      this.customvendorpages = [];
      this.FormatDataForCarousel(this.customvendorpages,this.customvendors);
    });
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
    var vendor =
    {
      name: this.Name,
      description: this.Desc,
      category: this.Category,
      email: this.Email,
      telnumber: this.Tel,
      editable: true,
    }
    this.VendorService.AddVendor(vendor).subscribe(vendor => {this.customvendors.push(vendor)
    this.customvendorpages = [];
    this.FormatDataForCarousel(this.customvendorpages,this.customvendors);
    });
    this.modalService.dismissAll();
  }

  DeleteVendor(Vendor)
  {
    this.VendorService.DeleteVendor(Vendor.id);
    if(Vendor.editable==false)
    {
      Vendor.id = Vendor.customid;
      delete Vendor.customid;
      this.examplevendors.push(Vendor);
      this.examplevendorpages = [];
      this.FormatDataForCarousel(this.examplevendorpages,this.examplevendors);
    }
    var index = this.customvendors.indexOf(Vendor);
    this.customvendors.splice(index,1);
    this.customvendorpages = [];
    this.FormatDataForCarousel(this.customvendorpages,this.customvendors);
  }

  UpdateVendor()
  {
    var vendor = this.customvendors.find(element => element.id == this.Id);
    vendor.name = this.Name;
    vendor.description= this.Desc;
    vendor.category= this.Category;
    vendor.email= this.Email;
    vendor.telnumber= this.Tel;
    var updatedvendor =
    {
      name: this.Name,
      description: this.Desc,
      category: this.Category,
      email: this.Email,
      telnumber: this.Tel,
    }
    this.VendorService.updateVendor(this.Id,updatedvendor);
    this.modalService.dismissAll();
  }

}
