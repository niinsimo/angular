import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: User;
  errors: string[] = [];
  private userSubscription;
  id: number;

  constructor(private userService: UserService, private route: ActivatedRoute) {
  }

  checkIfDataInserted() {
    this.errors = [];
    if (this.user.person.firstName == null) {
      this.errors.push('Eesnimi peab olema sisestatud!');
    }
    if (this.user.person.lastName == null) {
      this.errors.push('Perenimi peab olema sisestatud!');
    }
    if (this.user.person.phone == null) {
      this.errors.push('Telefon peab olema sisestatud!');
    }
    if (this.user.username == null) {
      this.errors.push('Kasutajanimi peab olema sisestatud!');
    }
    if (this.user.password == null) {
      this.errors.push('Parool peab olema sisestatud!');
    }
    if (this.user.role == null) {
      this.errors.push('Roll peab olema valitud!');
    }
  }

  randomPassword(length) {
    const regexp = new RegExp('[1-9]+');
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
    let pass;
    do {
      pass = '';
      for (let x = 0; x < length; x++) {
        const i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
      }
    } while (!regexp.test(pass));

    this.user.password = pass;
  }

  editUser() {
    this.checkIfDataInserted();
    if (this.errors.length < 1) {
      this.userService.editUser(this.user.id, this.user);
    }
  }

  ngOnInit() {
    this.userSubscription = this.route.params.subscribe(params => {
      this.id = +params.id;
      this.userService.loadUser(this.id);
    });
    this.userService.user$.subscribe(user => {
      this.user = user;
    });
  }
}

