import { Injectable } from '@angular/core';
import { ChatgptService } from './chatgpt.service';



declare var webkitSpeechRecognition: any;


@Injectable({ providedIn: 'root' })
export class VoiceRecognitionService {

  recognition = new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  text: string = '';

  constructor(private service: ChatgptService) { }

  init() {

    this.recognition.interimResults = true;
    this.recognition.lang = 'pt-BR';

    this.recognition.addEventListener('result', (es: { results: Iterable<any> | ArrayLike<any>; }) => {
      const teste = Array.from(es.results);
      let fala: SpeechRecognitionResult = teste[0];
      if (fala.isFinal) {
        this.text = fala[0].transcript;
        this.obterResposta();
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
        this.recognition.start();
      }
    });
  }

  stop() {
    this.isStoppedSpeechRecog = true;

    this.recognition.stop();
    console.log("End speech recognition")
    this.text = '';
  }


  obterResposta() {
    this.service
      .obterResposta(this.text).subscribe({
        next: (resposta) => {
          let text: string = '';
          text = text + resposta.choices[0].text;
          console.log(text);
          this.respostaEmVozAPI(text);
        },
        error: (errorResponse) => {
          console.log("Erro");
          console.log(errorResponse);
        }
      });
  }


  respostaEmVozAPI(text: string) {
    const synth = window.speechSynthesis;
    const speak = (text: string) => {
      const utterance = new SpeechSynthesisUtterance(text);
      synth.speak(utterance);
    };

    speak(text);
  }


}
