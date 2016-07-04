import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable }       from 'rxjs/Observable';

import { Hero } from '../../classes/hero/hero';
import { HeroService } from '../../services/hero-service/hero.service';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';

@Component({
    moduleId: module.id,
    selector: 'heroes',
    providers: [HeroService],
    directives: [HeroDetailComponent],
    templateUrl: './heroes.component.html',
    styleUrls:  ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
    heroes: Hero[];
    addingHero: boolean;
    selectedHero: Hero;
    error: any;

    constructor(
        private router: Router,
        private heroService: HeroService) { }


    getHeroes() {
        this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    }

    ngOnInit() {
        this.getHeroes();
    }

    addHero() {
        this.addingHero = true;
        this.selectedHero = null;
    }

    deleteHero(hero: Hero, event: any) {
        event.stopPropagation();
        this.heroService
            .delete(hero)
            .then(res => {
                this.heroes = this.heroes.filter(h => h !== hero);
                if (this.selectedHero === hero) { this.selectedHero = null; }
            })
            .catch(error => this.error = error);
    }

    close(savedHero: Hero) {
        this.addingHero = false;
        if (savedHero) { this.getHeroes(); }
    }

    onSelect(hero: Hero) { this.selectedHero = hero; }
    gotoDetail() {
        this.router.navigate(['/detail', this.selectedHero.id]);
    }
}

