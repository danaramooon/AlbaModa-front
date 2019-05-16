import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  @Input() imgPath = '';
  @Input() title = '';
  @Input() category = '';
  constructor() { }

  ngOnInit() {
  }

}
