// person-delete.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'app-person-delete',
  templateUrl: './person-delete.component.html',
  styleUrls: ['./person-delete.component.css']
})
export class PersonDeleteComponent implements OnInit {
  person: any = {};

  constructor(
    private route: ActivatedRoute,
    private peopleService: PeopleService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id){
    this.peopleService.getPersonById(id).subscribe((data) => {
      this.person = data;
    });
  }
}

  deletePerson() {
    this.peopleService.deletePerson(this.person.id).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
