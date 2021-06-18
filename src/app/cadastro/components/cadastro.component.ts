import { cadastro } from './../models/cadastro.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastroService } from '../service/cadastro.service';



@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  cadastros:any;
  cadastro: any;
  id: number;

  constructor(private CadastroService: CadastroService, private modalService: NgbModal, private router: Router) {
    this.id = 0;
    this.ObterRegistros();
  }

  ngOnInit() {
    this.cadastro = {};
    this.cadastro.id = 0;
  }

  ObterRegistros(){
    this.CadastroService.getCadastro().subscribe((data: cadastro) => {
      this.cadastros = data;
    }, (error: any) => {
      console.error(error);
    });

  }

  salvar(frm: any){
    if(this.id == 0){
      this.adicionar(frm);
    }else{
      this.atualizar(frm);
    }

  }

  adicionar(frm: FormGroup){
    this.cadastro.id = 0;
    this.CadastroService.postCadastro(this.cadastro).subscribe((data: any) => {
       this.cadastros.push(data);
      frm.reset();
    }, (error: any) => {
      console.error(error);
    });
  }

  atualizar(frm: FormGroup){
    this.CadastroService.putCadastro(this.cadastro, this.id).subscribe((data) => {
      this.id = 0;
      this.ObterRegistros();
      frm.reset();
    }, (error: any) => {
      console.error(error);
    });
  }

  selecionar(el: any, content: any){
    console.log(el);
    this.modalService.open(content, { centered: true });
    this.id = parseInt(el.dataset.cadastroid);
    this.CadastroService.getCadastroWithId(this.id).subscribe((data: cadastro) => {
      this.cadastro = data;
    }, (error: any) => {
      console.error(error);
    });
  }

  excluir(id: any){
    this.id = id;
    this.CadastroService.deleteCadastro(this.id).subscribe(() => {
      this.ObterRegistros();
    }, (error: any) => {
      console.error(error);
    });
  }

  // redirecionar(el){
  //   this.id = parseInt(el.dataset.cadastroid);
  //   this.router.navigate(['/funcionario', this.id]);
  // }

  abrirModal(content: any) {
    this.id = 0;
    this.cadastros.nome = '';
    this.cadastros.sigla = '';
    this.modalService.open(content, { centered: true });
  }

  modalConfirmacaoExcluir(content: any, el: any) {
    this.id = parseInt(el.dataset.departamentoid);
    this.modalService.open(content);
  }

}
