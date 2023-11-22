import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-camera',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './camera.component.html',
  styleUrl: './camera.component.scss',
})
export class CameraComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('videoElement') videoElementRef!: ElementRef<HTMLVideoElement>;
  mediaStream!: MediaStream;

  async ngOnInit() {
    // Do not access DOM elements here, wait for ngAfterViewInit
  }

  async ngAfterViewInit() {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((ms: MediaStream) => {
        const _video = this.videoElementRef.nativeElement;
        _video.srcObject = ms;
        _video.play();
      });

    // if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

    // } else if (navigator.webkitGetUserMedia) {
    //   console.log('webkit');
    //   this.mediaStream = await new Promise<MediaStream>((resolve, reject) => {
    //     navigator.webkitGetUserMedia(
    //       { video: { facingMode: 'user' } },
    //       resolve,
    //       reject
    //     );
    //   });
    //   const _video = this.videoElementRef.nativeElement;

    //   if (_video) {
    //     _video.srcObject = this.mediaStream;
    //     // Play the video to start streaming
    //     _video.play().catch((err) => {
    //       console.error('Error playing video:', err);
    //     });
    //   }
    // } else {
    //   console.error('getUserMedia is not supported in this browser');
    // }
  }

  ngOnDestroy() {
    if (this.mediaStream) {
      // Stop the media stream when the component is destroyed
      this.mediaStream.getTracks().forEach((track) => track.stop());
    }
  }
}
