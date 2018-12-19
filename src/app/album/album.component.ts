import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material";
import {ErrorComponent} from "../_shared/error/error.component";
import {ImageService} from "./image.service";
import {ActivatedRoute} from "@angular/router";
import {Image} from "./image.model";

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit, OnDestroy {
  @ViewChild('player') player: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('imagepicker') imagepicker: ElementRef;
  hasCamera: boolean;
  showVideo: boolean;
  circleId: string;
  images: Image[] = [];
  image: any;

  constructor(
    private albumService: ImageService,
    private route: ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.circleId = params['id'];
        this.albumService.getImages(this.circleId)
          .subscribe((images: Image[]) => this.images = images);
      });

    // Assume device has camera at first
    this.hasCamera = true;
    this.initCamera();
  }

  // Initialize native camera
  initCamera() {
    const config = { video: true };
    const app = <any>navigator;

    app.getUserMedia = ( app.getUserMedia || app.webkitGetUserMedia || app.mozGetUserMedia  || app.msGetUserMedia );

    app.mediaDevices.getUserMedia(config)
      .then(stream => {
        this.showVideo = true;
        this.player.nativeElement.srcObject = stream;
      })
      .catch(error => {
        // this.dialog.open(ErrorComponent, { data: "This browser has no camera" });
        this.hasCamera = false;
      });
  }

  // Capture the image when shutter is clicked
  onCapture() {
    let video = this.player.nativeElement;
    let canvas = this.canvas.nativeElement;
    this.showVideo = false;
    let context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, video.videoHeight / (video.videoWidth / canvas.width));
  }

  // Send file from image picker
  onFileUpload() {
    this.albumService.createImage(this.circleId, this.image)
      .subscribe();
  }

  // Get file from image picker
  onFilePicked() {
    const fr = new FileReader();
    fr.onload = function(e: any) {
      this.image = e.target.result;
    }.bind(this);
    fr.readAsDataURL(this.imagepicker.nativeElement.files[0]);
  }

  // Post image
  onPost() {
    this.image = this.canvas.nativeElement.toDataURL();
    this.albumService.createImage(this.circleId, this.image)
      .subscribe(()=> this.showVideo = true);
  }

  // Cancel image
  onCancel() {
    this.showVideo = true;
  }

  // Stop camera when we leave the page
  ngOnDestroy(): void {
    if (this.player) {
      let video = this.player.nativeElement;
      video.srcObject.getVideoTracks().forEach(function (track) {
        track.stop();
      });
    }
  }
}
