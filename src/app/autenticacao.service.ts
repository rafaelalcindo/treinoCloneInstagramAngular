import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase';

@Injectable()
export class Autenticacao {

  public token_id: string

  constructor(private router: Router){  }

  public cadastrarUsuario(usuario: Usuario): Promise<any> {
    //console.log('Chegamos até o serviço: ', usuario);

     return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
        .then((resposta: any) => {
          //console.log(resposta)

          //remover a senha do atributo senha do objeto usuário
          delete usuario.senha

          // registrando dados complementares do usuário no path email na base64
          firebase.database().ref(`usuario_detalhe/${btoa(usuario.email) }`)
            .set( usuario );

        })
        .catch((error: Error) => {
          console.log(error);
        })
    }

  public autenticar(email: string, senha: string): void {        
        firebase.auth().signInWithEmailAndPassword(email, senha)
          .then((resposta: any) =>  {
            firebase.auth().currentUser.getIdToken()
              .then((idToken: string) => {
                this.token_id = idToken
                this.router.navigate(['/home']);
              })
          })
          .catch((error: Error) => console.log(error))
      }
}