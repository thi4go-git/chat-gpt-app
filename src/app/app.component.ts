import { Component, OnInit } from '@angular/core';
import { VoiceRecognitionService } from './services/voice-recognition.service';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'chat-gpt-app';

  habilitado = false;

  constructor(
    public service: VoiceRecognitionService
  ) {
    this.service.init()
  }

  ngOnInit(): void {
  }
  startService() {
    this.service.start()
  }

  stopService() {
    this.service.stop()
  }


  processar() {
    if (this.habilitado == true) {
      this.startService();
    } else {
      this.stopService();
    }
  }



}
