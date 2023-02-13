import { Injectable } from '@angular/core';



declare var webkitSpeechRecognition: any;


@Injectable({ providedIn: 'root' })
export class VoiceRecognitionService {

  recognition = new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  text: string = '';
  tempWords: any;

  constructor() { }

  init() {

    this.recognition.interimResults = true;
    this.recognition.lang = 'pt-BR';

    this.recognition.addEventListener('result', (es: { results: Iterable<any> | ArrayLike<any>; }) => {
      const teste = Array.from(es.results);
      let fala: SpeechRecognitionResult = teste[0];
      if (fala.isFinal) {
        this.text = fala[0].transcript;
        console.log(this.text.trim);
      }
    });

  }

  start() {
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    console.log("Speech recognition started")
    this.recognition.addEventListener('end', () => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.stop();
        console.log("End speech recognition")
      } else {
        this.wordConcat()
        this.recognition.start();
      }
    });
  }

  stop() {
    this.isStoppedSpeechRecog = true;
    this.wordConcat()
    this.recognition.stop();
    console.log("End speech recognition")
  }

  wordConcat() {
    this.text = this.text + ' ' + this.tempWords + '.';
    this.tempWords = '';
  }
}
