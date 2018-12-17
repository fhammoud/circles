import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material";
import {ErrorComponent} from "../_shared/error/error.component";

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

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.hasCamera = true;
    this.initCamera();
  }

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
        this.dialog.open(ErrorComponent, {data: "This browser has no camera"});
        this.hasCamera = false;
      });
  }

  onCapture() {
    console.log("take picture");
    let video = this.player.nativeElement;
    let canvas = this.canvas.nativeElement;
    let context = canvas.getContext('2d');
    this.showVideo = false;
    context.drawImage(video, 0, 0, canvas.width, video.videoHeight / (video.videoWidth / canvas.width));
    video.srcObject.getVideoTracks().forEach(function (track) {
      track.stop();
    });
  }

  ngOnDestroy(): void {

  }
}
