import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from '../../classes/hero/hero';
import { HeroService } from '../../services/hero-service/hero.service';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';

@Component({
    moduleId: module.id,
    selector: 'heroes',
    providers: [HeroService],
    templateUrl: './heroes.component.html',
    styleUrls:  ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
    heroes: Hero[];
    selectedHero: Hero;
    constructor(
        private router: Router,
        private heroService: HeroService) { }
    getHeroes() {
        this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    }
    ngOnInit() {
        this.getHeroes();
    }
    onSelect(hero: Hero) { this.selectedHero = hero; }
    gotoDetail() {
        this.router.navigate(['/detail', this.selectedHero.id]);
    }
}

