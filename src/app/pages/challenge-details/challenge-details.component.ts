import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-challenge-details',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './challenge-details.component.html',
  styleUrl: './challenge-details.component.css'
})
export class ChallengeDetailsComponent {

  @Input() title!: string;
  @Input() requirements!: string[];
  @Input() features!: string[];
  showDetails = false;
}
