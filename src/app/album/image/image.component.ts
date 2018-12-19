import { Component, OnInit } from '@angular/core';
import {ImageService} from "../image.service";
import {ActivatedRoute} from "@angular/router";
import {Image} from "../image.model";
import {StateService} from "../../_shared/services/state.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  imageId: string;
  image: Image;
  userId: string;

  constructor(
    private imageService: ImageService,
    private stateService: StateService,
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.imageId = params['imageId'];
        this.imageService.getImage(this.imageId)
          .subscribe((image: Image) => {
            this.image = image;
            this.userId = this.stateService.getUserId();
          });
      });
  }

  // Delete image
  onDelete() {
    this.imageService.deleteImage(this.imageId)
      .subscribe(() => {
        this.location.back()
      });
  }

}
