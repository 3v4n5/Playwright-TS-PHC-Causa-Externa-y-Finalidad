import { test } from '@playwright/test';
import { BaseUrl, Atencion, Credenciales } from './Data/Variables';
import { LoginPHC } from './pages/loginPHC';
import { AtencionPHC } from './pages/AtencionPHC';
import { CausaExterna } from './pages/CausaExterna';


test.describe.parallel('Opciones en campo select de ', () => {
    
    test.beforeEach(async ({ page }) => {

        await page.goto(BaseUrl.URL_Labo);
        const login = new LoginPHC(page)
    
        const atencion = new AtencionPHC(page)
        const causa = new CausaExterna(page)        

    
        await test.step(" Login ", async () => {
            await login.nuevoLoginPHC(Credenciales.PHCUSER, Credenciales.PHCPASSW)
        });
    
        await test.step('Atencion', async () => {
            await atencion.iniciarNuevaAtencion('17131964')//Atencion.CEDULA 
            await atencion.seleccionarTipoAtencion(Atencion.ATENCION)
            await atencion.seleccionarTipoPlan(Atencion.PLAN)
            await atencion.btnVisibleEspecialidad()
        })

        await causa.validaEncabezadoSeccion()

    });
    
    test('Causa y Finalidad', async ({ page }) => {
        //Objetos de paginas
        const causa = new CausaExterna(page)        
        
        await causa.seleccionarCausa()
        await causa.seleccionarFinalidad()
    })
    
})

