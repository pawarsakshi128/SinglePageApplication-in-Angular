// person-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {
  person: any = {};

  constructor(
    private route: ActivatedRoute,
    private peopleService: PeopleService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.peopleService.getPersonById(id).subscribe((data) => {
        this.person = data;
      });
    }
  }

  updatePerson() {
    if (this.person.id) {
      this.peopleService.updatePerson(this.person.id, this.person).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.peopleService.createPerson(this.person).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
