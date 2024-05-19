import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SliderModule } from 'primeng/slider';
import { ProgressBarModule } from 'primeng/progressbar';

import { NgxAudioPlayerModule, Track } from 'ngx-audio-player';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [SliderModule, FormsModule, CommonModule, ProgressBarModule, NgxAudioPlayerModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent {
  protected volumeValue: number = 100;
  protected currentTime: number = 100;

  // Main Player Controls
  msaapDisplayPlayList = false;
  msaapDisablePositionSlider = true;
  msaapDisplayRepeatControls = true;
  msaapDisplayVolumeControls = true;
  msaapDisplayVolumeSlider = false;

  // Title Marquee
  msaapDisplayTitle = false;

  // Material Style Advance Audio Player Playlist
  msaapPlaylist: Track[] = [
    {
      title: 'Audio One Title',
      link: 'https://dl.dropboxusercontent.com/s/9v0psowra7ekhxo/A%20Himitsu%20-%20In%20Love%20%28feat.%20Nori%29.flac?dl=0',
      artist: 'Future',
      duration: 268000
    }
  ];

  // Callback Events

  onTrackPlaying(event: any) {
    console.log(event);
    // your logic which needs to
    // be triggered once the
    // track ends goes here.
  }

  onTrackPaused(event: any) {
    console.log(event);
    // your logic which needs to
    // be triggered once the
    // track ends goes here.
  }

  onEnded(event: any) {
    console.log(event);
    // your logic which needs to
    // be triggered once the
    // track ends goes here.
  }

  onNextTrackRequested(event: any) {
    console.log(event);
    // your logic which needs to
    // be triggered once the
    // track ends goes here.
  }

  onPreviousTrackRequested(event: any) {
    console.log(event);
    // your logic which needs to
    // be triggered once the
    // track ends goes here.
  }

  onTrackSelected(event: any) {
    console.log(event);
    // your logic which needs to
    // be triggered once the
    // track ends goes here.
  }
}
