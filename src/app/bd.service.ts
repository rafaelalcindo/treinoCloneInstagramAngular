import { any } from 'codelyzer/util/function';
import { Injectable } from '@angular/core'
import * as firebase from 'firebase';
import { Progresso } from './progresso.service'

@Injectable()
export class Bd {

  constructor(private progresso: Progresso){ }

  public publicar(publicacao: any): void {

    console.log(publicacao);

    //let nomeImagem = Date.now();

    firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push({ titulo: publicacao.titulo })
            .then((resposta: any) => {
             // console.log(resposta)
              //let nomeImagem = Date.now();

              firebase.storage().ref()
              .child(`imagens/${resposta.key}`)
              .put(publicacao.imagem)
              .on(firebase.storage.TaskEvent.STATE_CHANGED,
                // acompanhamento do progresso de upload
                (snapshot: any) =>{
                  this.progresso.status = 'andamento'
                  this.progresso.estado = snapshot
                // console.log('SnapShot captura',snapshot);
                },( error) => {
                  this.progresso.status = 'erro'

                  //console.log(error);
                },
                () => {
                  //finalização do processo
                  this.progresso.status = 'concluido'
                // console.log('upload completo');


                }
              )

            })



    /*
    console.log(publicacao);
    firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
      .push({ titulo: publicacao.titulo });
      */

    //console.log('Chegamos até o serviçp controle dados');
  }

  public consultaPublicacoes(emailUsuario: string): Promise<any> {

    return new Promise((resolve, reject) => {

      // consultar as publicações (database)
      firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
          .orderByKey()
          .once('value')
          .then((snapshot: any) => {
            //console.log(snapshot);
            //console.log(snapshot.val())

            let publicacoes: Array<any> = [];
            console.log(snapshot)
            snapshot.forEach((childSnapShot: any) => {

              let publicacao = childSnapShot.val()
              publicacao.key = childSnapShot.key

              
              publicacoes.push(publicacao)
              
            } )
            //resolve(publicacoes)
            return publicacoes.reverse()
          })// fim  firebase
          .then((publicacoes: any) => {

            publicacoes.forEach((publicacao) => {

              
                  // consultar a url da imagem (storage)
                    firebase.storage().ref()
                    .child(`imagens/${publicacao.key}`)
                    .getDownloadURL()
                    .then((url: string) => {
                      publicacao.url_imagem = url

                    //consultar o nome do usuário
                    firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
                      .once('value')
                      .then((snapshot: any) => {
                        publicacao.nome_usuario = snapshot.val().nome_usuario
                        
                      })

                  })

            })

            resolve(publicacoes)
                
          })

    })

    
  }

}

/*

let publicacao = childSnapShot.val()
              // consultar a url da imagem (storage)
              firebase.storage().ref()
              .child(`imagens/${childSnapShot.key}`)
              .getDownloadURL()
              .then((url: string) => {
                publicacao.url_imagem = url

                //consultar o nome do usuário
            firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
              .once('value')
              .then((snapshot: any) => {
                publicacao.nome_usuario = snapshot.val().nome_usuario
                publicacoes.push(publicacao)
              })

              })

*/
