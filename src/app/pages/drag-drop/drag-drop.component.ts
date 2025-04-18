import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChallengeDetailsComponent } from '../../pages/challenge-details/challenge-details.component';
import {
  DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag,
  CdkDropList, } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drag-drop',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule, CdkDrag,CdkDropList, ChallengeDetailsComponent],
  templateUrl: './drag-drop.component.html',
  styleUrl: './drag-drop.component.css'
})
export class DragDropComponent {

  challenges = {
    title: "Implement Drag-and-Drop for List Items",
    requirements: [
      'Users should be able to drag and reorder items in a list.',
      'The updated order should persist in the component state.',
      'Provide visual feedback while dragging (e.g., highlight the item being dragged).',
      'Prevent unintended reordering by handling edge cases (e.g., empty list, dragging outside the list).'
    ],
    features: [],
  };

  todo = ['Task 1', 'Task 2', 'Task 3', 'Task 4'];
  inProgress = ['Task 5', 'Task 6'];
  done = ['Task 7'];

  // drop(event: CdkDragDrop<string[]>) {
  //   console.log('Event:', event);

  //   if (event.previousContainer === event.container) {
  //     // Reorder within the same list
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     // Move item from one list to another
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //   }

  //   console.log('Updated Lists:', {
  //     todo: this.todo,
  //     inProgress: this.inProgress,
  //     done: this.done
  //   });
  // }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
