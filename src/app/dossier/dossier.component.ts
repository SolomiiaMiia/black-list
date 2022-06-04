import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { DossierDto } from '../models/dossierDto';
import { DossierStatus, DossierType, EnumHelper } from '../models/enums';
import { APIService } from '../shared/services/api.service'


@Component({
  selector: 'app-dossier',
  templateUrl: './dossier.component.html',
  styleUrls: ['./dossier.component.scss']
})
export class DossierComponent implements OnInit {

  public searchText: string = '';
  @Input('feedEnabled') feedEnabled: boolean = false;
  @Input('dossier') dossier!: DossierDto;
  public enumHelper: EnumHelper = new EnumHelper();
  DossierStatuses = DossierStatus;
  DossierTypes = DossierType;

  constructor(private route: ActivatedRoute,
    private apiService: APIService) {
    
  }

  loadDossierByUrl() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.apiService.get(id);
      }),
    ).subscribe(res => {
      this.dossier = res;
    },
      err => {
        this.dossier = {
          id: 3,
          img: 'assets/images/1.png',
          lastName: 'Садовий',
          firstName: 'Андрій',
          thirdName: 'Іванович',
          position: 'Посада',
          placeOfWork: 'Місце роботи',
          address: `New York, NY 10013
b/ t Division St & St James Pl
Chinatown, Civic Center`,
          text:`Текст досьє   Скажи мне
          Скажи мне
          Скажи мне прямо в лицо
          Что я моральный урод
          Что я тупой долбоеб
          Придумай тысячу слов
          Скажи подругам назло
          Теряла время со мной
          Я ставлю пулю в висок
          Что было нам хорошо
          Кто же расскажет, зачем мне тепло
          Если твои руки холоднее, чем лед
          Кто же покажет эту тайну миров
          Ты ведь так глупа, так почему я влюблен
          Просто накрой меня цветным одеялом
          Ведь нам никогда уже не быть мечтами
          И если тебе легче вдруг станет
          Так просто скажи
          Скажи мне прямо в лицо
          Что я моральный урод
          Что я тупой долбоеб
          Придумай тысячу слов
          Скажи подругам назло
          Теряла время со мной
          Я ставлю пулю в висок
          Что было нам хорошо
          Как жаль, что нет тетради
          Куда записал бы я имя твое
          И тебя вдруг бы не стало
          Как и всех проблем, связанных с тобой
          Скажи мне прямо в лицо
          Что я моральный урод
          Что я тупой долбоеб
          Придумай тысячу слов
          Скажи подругам назло
          Теряла время со мной
          Я ставлю пулю в висок
          Что было нам хорошо
          Скажи мне прямо в лицо
          Что я моральный урод
          Что я тупой долбоеб
          Придумай тысячу слов
          Скажи подругам назло
          Теряла время со мной
          Я ставлю пулю в висок
          Что было нам хорошо Ты ведь так глупа, так почему я влюблен
          Просто накрой меня цветным одеялом
          Ведь нам никогда уже не быть мечтами
          И если тебе легче вдруг станет
          Так просто скажи
          Скажи мне прямо в лицо
          Что я моральный урод
          Что я тупой долбоеб
          Придумай тысячу слов
          Скажи подругам назло
          Теряла время со мной
          Я ставлю пулю в висок`,
          date: new Date,
          status: DossierStatus.Disproved,
          type: DossierType.Published,
          isAnonymous: false,
          author: 'Автор',
          phone: '+380982774950',
          email: 'letos009@gmail.com',
          photo: { name: "1.png", url: "assets/images/1.png" },
          dossierFiles: [{ name: "sample.pdf", url: "assets/files/sample.pdf" }, { name: "sample.pdf", url: "assets/files/sample.pdf" }],
          disproveDossier: {
            date: new Date,
            text: "Текст спростування", author: "Автор", email: 'letos009@gmail.com', phone: '+380982774950',
            dossierFiles: [{ name: "sample.pdf", url: "assets/files/sample.pdf" }, { name: "sample.pdf", url: "assets/files/sample.pdf" }]
          }
        } as DossierDto;
      }
    );
  }

  ngOnInit(): void {
    if (!this.feedEnabled) {
      this.loadDossierByUrl();
    }
  }



  ngOnDestroy(): void {

  }

}
