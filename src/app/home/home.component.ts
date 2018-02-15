import { Component, OnInit } from '@angular/core';
import { Autenticacao } from '../autenticacao.service';
import * as $ from 'jquery/dist/jquery.min.js';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public closeResult: string;

  constructor(
    private autenticacao: Autenticacao,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }

  public sair(): void {
    this.autenticacao.sair()
  }


  public abrirModal(content): void {
    console.log('entrou abrir modal');
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


}
