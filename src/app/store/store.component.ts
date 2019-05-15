import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { Product} from '../models/models';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  
  public products: Product[] = [];
  constructor(private provider: ServiceService) {

   }

  ngOnInit() {
    this.provider.getProducts().then(res => {
      console.log(res);
      this.products = res;
    })

  }

}
