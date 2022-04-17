import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Vendor } from '../data/vendor';

@Injectable({
  providedIn: 'root'
})
export class DefaultvendorsService {

  private vendors: Vendor[] = [
    {
      id: '0',
      name: 'Fred Photo',
      description: 'The Best Photographer around town!',
      category: 'Photography',
      email: 'photo1@gmail.com',
      telnumber: '0632343245',
      editable: false,
    },
    {
      id: '1',
      name: 'Nomádia Rendezvénypark',
      description: 'Lehetőségeink: íjászkodás, 50 fős sétakocsikázás, kovácsbemutató és lovaglás. Rendelkezésükre áll ~ 60-70 fős felújított klímás táltos terem, ~70 fős kerti kiülő, ~70 fős lovas kiülő, 150 fős klímás rendezvényterem, több kültéri mosdó (mozgáskorlátozott mosdó), két beltéri mosdó zuhanyzóval. Parkolás megoldott és ingyenes.',
      category: 'Venue',
      email: 'NomádiaRendezvénypark@gmail.com',
      telnumber: '0632343245',
      editable: false,
    },
    {
      id: '2',
      name: 'Bagolyvár Fogadó',
      description: 'Osztálykirándulások, kiránduló csoportok, baráti társaságok, céges rendezvények, csapatépítő tréningek számára a Bakony egy feledhetetlen hely. Közvetlenül az éttermünk épülete mellett található zárt, fűtött melléképületünkben egy osztály vagy egy nagyobb társaság kényelmesen elfér. Osztálykirándulások esetén a reggelizés itt is megoldható. 150 fős fedett-nyitott közösségi rendezvény pavilonnal rendelkezünk, ahol a nagyobb csoportok étkeztetését ugyan csak tudjuk biztosítani. Remek lehetőség szabadba tervezett vacsorák, társas-estek, csoportos foglalkozások helyszínéül.',
      category: 'Venue',
      email: 'BagolyvárFogadó@gmail.com',
      telnumber: '0632343245',
      editable: false,
    },
    {
      id: '3',
      name: 'HEADONIST szalon',
      description: 'Elegáns fodrászszalon a Corvin szívében, ahol a szakértelem mellett stílusos enteriör, VIP életérzés és frissítő welcome drinkek is várnak! ',
      category: 'Hair and makeup',
      email: 'HEADONIST@gmail.com',
      telnumber: '0632343245',
      editable: false,
    },
    {
      id: '4',
      name: 'Magdi Szépségszalon',
      description: 'Barátságos fodrászszalon Budapest belvárosában, a Deák Ferenc térnél. Ügyes fodrászok, fodrászmester szakmai irányítás!',
      category: 'Hair and makeup',
      email: 'MagdiSzépségszalon@gmail.com',
      telnumber: '0632343245',
      editable: false,
    },
    {
      id: '5',
      name: 'White Rose Szépségszalon',
      description: 'Nem tudja milyen haj áll önnek a legjobban? Segítünk megtalálni valódi szépségét! Személyre szabott frizura tanácsadást követően el is készítjük!',
      category: 'Hair and makeup',
      email: 'WhiteRose@gmail.com',
      telnumber: '0632343245',
      editable: false,
    },
    {
      id: '6',
      name: 'TRK Make Up',
      description: 'Ügyfélfogadás kizárólag előzetes bejelentkezés alapján.',
      category: 'Hair and makeup',
      email: 'TRK@gmail.com',
      telnumber: '0632343245',
      editable: false,
    },
    {
      id: '7',
      name: 'Royal Deluxe Esküvői Ruhaszalon',
      description: 'A Royal szalonokban mi kifejezetten azokért a 21. századi hercegnőkért vagyunk, akiknek nagyon fontos, hogy a csupa nagybetűs "RUHA" minden apró kis részlete a tökéletesnél is tökéletesebb legyen a Nagy Napon! Szeretnénk, ha az esküvőszervezés valóban stresszmentes és boldogsággal teli lenne számodra, hiszen csak ekkor fogsz tudni ragyogni az esküvődön! A Royal szalonokban garantáljuk, hogy a ruhád felejthetetlen legyen a Nagy Napon! Amellett, hogy ruháinkat csak nagyon limitált számban kölcsönöztetjük, magasan szakképzett varrónőink azon dolgoznak nap mint nap, hogy a Royal menyasszonyok valóban a legszebb, legtündöklőbb menyasszonyok lehessenek',
      category: 'Attire',
      email: 'RoyalDeluxe@gmail.com',
      telnumber: '0632343245',
      editable: false,
    },
    {
      id: '8',
      name: 'Európa Menyasszonyi Ruhaszalon',
      description: 'Kedves Menyasszony! Menyasszonyi szalonunkban igyekszünk minőségi szolgáltatást nyújtani kedvező árakon a Te igényeid figyelembe vételével. Menyasszonyi ruhaszalonunkban a kedvező kölcsönzési csomagáraink tartalmazzák az igazítást, előtte utána tisztítást, abroncsot, fátylat, bolerot/stólát, gyűrűpárnát. Várunk szeretettel hétköznap 10:00-18:00 óráig, szombaton 10:00-14:00 óráig.',
      category: 'Attire',
      email: 'Europa@gmail.com',
      telnumber: '0632343245',
      editable: false,
    },
    {
      id: '9',
      name: 'Daubner Cukrászda',
      description: 'Tortáiról, fagylaltjairól, croissant-jairól és desszertjeiről híres, körülbelül 1901-ben alakult cukrászda.',
      category: 'Confectionery',
      email: 'Daubner@gmail.com',
      telnumber: '0632343245',
      editable: false,
    },

    {
      id: '10',
      name: 'Auguszt Cukrászda',
      description: 'Napos, hagyományos kávézó tükrökkel, faburkolatú bútorokkal, süteménnyel, reggelivel és ebéddel.',
      category: 'Confectionery',
      email: 'Auguszt@gmail.com',
      telnumber: '0632343245',
      editable: false,
    },
  ]
  constructor() { }

  GetDeafultVendors()
  {
    return of(this.vendors);
  }
}
