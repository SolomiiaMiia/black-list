import { Component, Input } from '@angular/core';
import { FileDto } from '../../models/fileDto';



@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  @Input('images') images: FileDto[] | null = [];
}
