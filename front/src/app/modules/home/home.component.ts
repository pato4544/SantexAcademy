import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { NavBarService } from 'src/app/core/services/toolServices/nav-bar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    private router: Router, 
    public views: NavBarService
    ) { }

  optionales(){
    this.router.navigate(['/optionales'])
  }
  formacion(){
    this.router.navigate(['/formaciones'])
  }
  experiencias(){
    this.router.navigate(['/experiencias'])
  }
  lenguajes(){
    this.router.navigate(['/lenguajes'])
  }
}
