import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for structural directives

@Component({
  selector: 'app-root',
  standalone: true, // Mark the component as standalone
  imports: [CommonModule], // Import CommonModule for directives like *ngFor
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PeopleManagementApp';

  // Sample list of people to display
  people = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' }
  ];

  // Method to handle edit action
  editItem(person: any) {
    console.log(`Editing person: ${person.name}`);
    // Add your edit logic here
  }

  // Method to handle delete action
  deleteItem(person: any) {
    console.log(`Deleting person: ${person.name}`);
    this.people = this.people.filter(p => p.id !== person.id);
  }
}
