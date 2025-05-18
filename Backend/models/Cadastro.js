var knex = require("../database/connection");

class Cadastro{
    async findAll(){
        try{
            var result = await knex.select(["idCadastro","usuario","nome","sobrenome","documento","docProfSaude","docProfSaude","endereco","cep"]).table("cadastros");
            return result;
        }catch(err){
            console.log(err);
            return [];
        }
    }

    async findById(idCadastro){
        try{
            var result = await knex.select(["idCadastro","usuario","nome","sobrenome","documento","docProfSaude","endereco","cep"]).where({idCadastro:idCadastro}).table("cadastros");
            
            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }

        }catch(err){
            console.log(err);
            return undefined;
        }
    }

    async new(idCadastro,usuario,nome,sobrenome,documento,docProfSaude,endereco,cep){
        try{
            
            await knex.insert({idCadastro,usuario,nome,sobrenome,documento,docProfSaude,endereco,cep}).table("cadastros");
        }catch(err){
            console.log(err);
        }
    }   
    async update(idCadastro,usuario,nome,sobrenome,documento,docProfSaude,endereco,cep){

        var cadastro = await this.findById(idCadastro);

        if(cadastro != undefined){

            var editCadastro = {};

            if(idCadastro != undefined){ 
                if(idCadastro != cadastro.idCadastro){
                   var result = await this.findById(idCadastro);
                   if(result == false){
                        editCadastro.idCadastro = idCadastro;
                   }else{
                        return {status: false,err: "Já está cadastrado"}
                   }
                }
            }

            try{
                await knex.update({idCadastro,usuario,nome,sobrenome,documento,docProfSaude,endereco,cep}).where({idCadastro: idCadastro}).table("cadastros");
                return {status: true}
            }catch(err){
                return {status: false,err: err}
            }
            
        }else{
            return {status: false,err: "O usuário não existe!"}
        }
    }

    async delete(idCadastro){
        var cadastro = await this.findById(idCadastro);
        if(cadastro != undefined){

            try{
                await knex.delete().where({idCadastro: idCadastro}).table("cadastros");
                return {status: true}
            }catch(err){
                return {status: false,err: err}
            }
        
        }else{
            return {status: false,err: "O usuário não existe para ser deletado."}
        }
    }

}

module.exports = new Cadastro();