import { test } from '@playwright/test';
import { BaseUrl, Atencion, Credenciales } from './Data/Variables';
import { LoginPHC } from './pages/loginPHC';
import { AtencionPHC } from './pages/atencionPHC';
import { CausaExterna } from './pages/CausaExterna';


test.describe.parallel('Test valores select en Causa y Finalidad', () => {
    
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
    
    test.only('Causa', async ({ page }) => {
        //Objetos de paginas
        const causa = new CausaExterna(page)        

        await causa.seleccionarCausa()
        //await causa.seleccionarFinalidad()

    })
    test('Finalidad', async ({ page }) => {
        //Objetos de paginas
        const causa = new CausaExterna(page)        

        await causa.seleccionarFinalidad()

    })
})

