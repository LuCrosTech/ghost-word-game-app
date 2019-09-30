import { Component, HostListener, Input, OnChanges, SimpleChange } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  scores = [0, 0];
  playerSelected = -1;
  enemy = -1;
  loading = false;
  isResultShow = false;
  theResult = 0;
  enemySelected = -1;
  playing = "user";

  status_you = "Choose a letter";
  status_computer = "Wait";
  user_entered_letters = "";
  computer_entered_letters = "";
  game_status = "Your turn";
  letters: Array<String> = [];
  word_json_response: any;
  winner = "";

  constructor(private http: HttpClient) { }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const inputChar = String.fromCharCode(event.charCode);
    const played = this.playing;
    if (played === "user") {
      const pattern = /[a-zA-Z]/;
      if (!pattern.test(inputChar)) {
        event.preventDefault();
        console.log("Wrong character");
      }
    }
    this.evaluate_input(played, inputChar);
  };

  evaluate_input(played: string, inputChar: String) {
    let accepted_char = inputChar.toUpperCase().charAt(0);
    console.log(played + " : " + accepted_char);

    if (played === "computer") {
      this.game_status = "Your turn";
      this.status_you = "Choose a letter";
      this.status_computer = "Wait";
      this.playing = "board";
      this.computer_entered_letters += accepted_char;
    } else {
      this.game_status = "Computer's turn";
      this.status_you = "Wait";
      this.status_computer = "Choose a letter";
      this.playing = "board";
      this.user_entered_letters += accepted_char;
    }

    this.letters.push(accepted_char + "");
    this.processWord(played, accepted_char + "");
  }

  user_playing(): boolean {
    return this.playing === 'user';
  };

  user_winner(): boolean {
    return this.winner === 'user';
  }
  user_ghost(): boolean {
    return this.winner === 'computer';
  }
  computer_winner(): boolean {
    return this.winner === 'computer';
  }
  computer_ghost(): boolean {
    return this.winner === 'user';
  }
  computer_playing(): boolean {
    return this.playing === 'computer';
  }

  not_end(): boolean {
    return this.game_status !== 'End';
  };

  tell_word_response(player: string, word: string): any {
    this.http.get('http://localhost:8083/tell/' + word.toLowerCase()).subscribe((res: string) => {
      console.log(res);
      let wr = JSON.parse(JSON.stringify(res));

      if (wr.word && this.letters.length >= 3) {
        this.game_status = "End";
        if (player === "user") {
          this.scores[1] = this.scores[1] + 1;
          this.winner = "computer";
          this.status_computer = "Winner";
          this.status_you = "Ghost!"
        } else if (player === "computer") {
          this.scores[0] = this.scores[0] + 1;
          this.winner = "user";
          this.status_computer = "Ghost!";
          this.status_you = "Winner"
        }
      } else if (!wr.startsWith) {
        this.game_status = "End";
        if (player === "user") {
          this.scores[0] = this.scores[0] + 1;
          this.winner = "computer";
          this.status_computer = "Winner";
          this.status_you = "Challenged! - Ghost!"
        } else if (player === "computer") {
          this.scores[1] = this.scores[1] + 1;
          this.winner = "user";
          this.status_computer = "Challenged! - Ghost!";
          this.status_you = "Winner"
        }
      } else {
        if (player === "user") {
          this.game_status = "Computer's turn"
          this.playing = "computer";
          this.computerPlay();
        } if (player === "computer") {
          this.game_status = "Your turn"
          this.playing = "user";
        }
      }
    },
      error => {
        console.log("REST App is not UP");
        this.game_status = "Rest APP is not accesible. Please Try again."
        this.reset();
      });
  }

  processWord(player: string, accepted_char: string) {
    if (this.playing === "board") {
      if (this.letters.length === 0) {
        this.game_status = "Your turn";
        this.playing = "user";
        console.log("No entries yet. Resetting.")
      } else {
        const word = this.letters.join("");
        this.tell_word_response(player, word);
      }
    }
  }

  computerPlay() {
    setTimeout(() => {
      const keyCode = 65 + Math.floor(Math.random() * 26);
      const computerLetter = String.fromCharCode(keyCode)
      console.log("PC chose: " + computerLetter + " code: " + keyCode);

      this.evaluate_input("computer", computerLetter);
    }, Math.floor(Math.random() * 3000) + 200);

  }

  reset(): void {
    this.letters = [];
    this.user_entered_letters = "";
    this.computer_entered_letters = "";
    this.playing = "user";
    this.winner = "";
  }

  reload(): void {
    window.location.reload();
  }

}
