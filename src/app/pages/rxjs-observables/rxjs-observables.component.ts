import { Component, OnInit } from '@angular/core';
import { FormControl,ReactiveFormsModule } from '@angular/forms';
import { Observable, Subscription, interval } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rxjs-observables',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './rxjs-observables.component.html',
  styleUrl: './rxjs-observables.component.css'
})

export class RxjsObservablesComponent implements OnInit {
  
  values: number[] = [];
  isCompleted: boolean = false;
  errorMessage: string = '';
  timerValue = 0;
  searchControl = new FormControl('');
  users: any[] = [];
  isLoading = false;

  private timerSubscription: Subscription | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const numberObservable = new Observable<number>(observer => {
      const numbers = [1, 2, 3, 4, 5];
      // observer.next(1);
      // observer.next(2);
      // observer.next(3);
      // observer.next(4);
      // observer.next(5);
      // observer.complete();
      //observer.unsubscribe
      for (let number of numbers) {
        if (number > 2) {
          observer.error('Error: Number is greater than 2!' + number);
          return;
        }         
        observer.next(number);        
      } 
      observer.complete();
    });

    
    numberObservable.subscribe({
      next: (value) => {
        this.values.push(value);
        console.log('Received:', value);
      },
      error: (err) => {
        this.errorMessage = err;
        console.error('Error:', err);
      },
      complete: () => {
        this.isCompleted = true;
        console.log('All numbers emitted successfully!');
      }
    });

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      tap(() => {
        this.isLoading = true;
        this.users = [];
      }),
      switchMap(query => {
        if (!query) return of([]); // if input is empty
        return this.http.get<any[]>(`https://jsonplaceholder.typicode.com/users?name_like=${query}`);
      }),
      tap(() => this.isLoading = false)
    ).subscribe(result => {
      this.users = result;
    });
  
  }

  start() {
    if (!this.timerSubscription || this.timerSubscription.closed) {
      this.timerSubscription = interval(1000).subscribe(() => {
        this.timerValue++;
      });
    }
  }

  stop() {
    this.timerSubscription?.unsubscribe();
  }

  reset() {
    this.stop();
    this.timerValue = 0;
  }

  ngOnDestroy(): void {
    this.stop(); // Prevent memory leaks
  }

}
