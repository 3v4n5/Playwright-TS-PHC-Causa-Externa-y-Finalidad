import  dotenv  from 'dotenv';
dotenv.config()


export const BaseUrl = {
    URL_Labo : `https://labepsapps.suramericana.com/PHC/SrvPHCNoSeguro?dniUsuarioTran=${process.env.MEDICO}&fechaExpiracionToken=99999999999999999&loginUserService=pedrvevi&nameUserService=pedrvevi&modoIngreso=4&tipoDniusuarioTran=CC&valorDerecho=${process.env.IPS}&cdRol=${process.env.ROL}&cdProceso=0&pNProfesional=Beatriz&pAProfesional=Cano`,
    URL_Piloto : `https://epsappslab.suramericana.com/PHC/SrvPHCNoSeguro?dniUsuarioTran=${process.env.MEDICO}&fechaExpiracionToken=99999999999999999&loginUserService=pedrvevi&nameUserService=pedrvevi&modoIngreso=4&tipoDniusuarioTran=CC&valorDerecho=${process.env.IPS}&cdRol=${process.env.ROL}&consultorio=8-sep-M%C3%B3dulo%201&cdProceso=0&pNProfesional=Beatriz&pAProfesional=Cano`
}

export const Credenciales = {
    PHCUSER: `${process.env.PHCUSER}`,
    PHCPASSW: `${process.env.PHCPASSW}`
}

export const Atencion = {
    CEDULA :  `${process.env.CEDULA}`,
    ATENCION : `${process.env.ATENCION}`,
    PLAN : `${process.env.PLAN}`
}

