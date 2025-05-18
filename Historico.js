var knex = require("../database/connection");

class Historico{
    async findAll(){
        try{
            var result = await knex.select(["idHistorico","IdPaciente","idProfissional","dtAgendamento","dtConfirmacao","dtAtendimento","historico"]).table("historicos");
            return result;
        }catch(err){
            console.log(err);
            return [];
        }
    }

    async findById(idCadastro){
        try{
            var result = await knex.select(["idHistorico","IdPaciente","idProfissional","dtAgendamento","dtConfirmacao","dtAtendimento","historico"]).where({idHistorico:idHistorico}).table("historicos");
            
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

    async new(idHistorico,IdPaciente,idProfissional,dtAgendamento,dtConfirmacao,dtAtendimento,historico){
        try{
            var hash = await bcrypt.hash(senha, 10);
            await knex.insert({idHistorico,IdPaciente,idProfissional,dtAgendamento,dtConfirmacao,dtAtendimento,historico}).table("historico");
        }catch(err){
            console.log(err);
        }
    }   
    async update(idHistorico,IdPaciente,idProfissional,dtAgendamento,dtConfirmacao,dtAtendimento,historico){

        var historico = await this.findById(idHistorico);

        if(historico != undefined){

            var editHitorico = {};

            if(idCadastro != undefined){ 
                if(idHistorico != historico.idHistorico){
                   var result = await this.findById(idHistorico);
                   if(result == false){
                        editHistorico.idHistorico = idHistorico;
                   }else{
                        return {status: false,err: "Já está cadastrado"}
                   }
                }
            }


            try{
                await knex.update({idHistorico,IdPaciente,idProfissional,dtAgendamento,dtConfirmacao,dtAtendimento,historico}).table("historicos");
                return {status: true}
            }catch(err){
                return {status: false,err: err}
            }
            
        }else{
            return {status: false,err: "O usuário não existe!"}
        }
    }

    async delete(idHistorico){
        var historico = await this.findById(idHistorico);
        if(historico != undefined){

            try{
                await knex.delete().where({idHistorico: idHistorico }).table("historicos");
                return {status: true}
            }catch(err){
                return {status: false,err: err}
            }
        
        }else{
            return {status: false,err: "O historico não existe para ser deletado."}
        }
    }

}

module.exports = new Historico();