import { test } from 'playwright/test';
import { BaseUrl, Atencion, Credenciales } from './Data/Variables';
import { LoginPHC } from './pages/loginPHC';
import { AtencionPHC } from './pages/atencionPHC';
import { MedidasAntropometricas2 } from './pages/MedidasAnt2';
import { MedidasAntropometricas } from './pages/MedidasAnt';
import { SignosVitales } from './pages/SignosVitales';

import dotenv from 'dotenv';
dotenv.config()


test.beforeEach(async ({ page }) => {

    await page.goto(BaseUrl.URL_Piloto);

    const login = new LoginPHC(page)


    await test.step(" Login ", async () => {
        await login.nuevoLoginPHC(Credenciales.PHCUSER, Credenciales.PHCPASSW)
    });


});


test('Medidas Antropometricas en PHC - Hombre >= 60', async ({ page }) => {

    //Objetos de paginas
    const atencion = new AtencionPHC(page)
    const medidas = new MedidasAntropometricas(page)
    const signos = new SignosVitales(page)


    await test.step('Atencion', async () => {

        await atencion.iniciarNuevaAtencion('17131964')//Atencion.CEDULA 
        await atencion.seleccionarTipoAtencion(Atencion.ATENCION)
        await atencion.seleccionarTipoPlan(Atencion.PLAN)
        await atencion.btnVisibleEspecialidad()
    })


    await test.step('Seccion Medidas Antropometricas', async () => {

        await medidas.validaEncabezadoSeccion()
        await medidas.inputPeso('70')
        await medidas.inputPerimetroAbdominal('55')
        await medidas.inputAlturaRodilla('56')
        await medidas.inputTallaCalculadaPorAR(78, 'H')//edad, Hombre(H) o mujer(M)
        await medidas.inputIMCcalculadaPorAR()
        await medidas.inputPerimetroBraquial('22')
        await medidas.inputCircunferenciaPantorilla('25')
        await medidas.inputVelocidadMarcha('5')
    })

    await test.step('Seccion Signos Vitales', async () => {

        await signos.validaEncabezadoSeccion2()
        await signos.inputFrecuenciaCardiaca('60')
        await signos.labelcl_FrecuenciaCardiaca(78)//frecuencia cardiaca / edad
        await signos.inputFrecuenciaPulso('61')
        await signos.labelcl_cl_Pulso()
        await signos.inputFrecuenciaRespiratoria('20')
        await signos.labelcl_cl_FrecuenciaRespiratoria()
    })


})

test('Medidas Antropometricas en PHC - Mujer >= 60', async ({ page }) => {

    //Objetos de paginas
    const atencion = new AtencionPHC(page)
    const medidas = new MedidasAntropometricas(page)
    const signos = new SignosVitales(page)
    // const tooltip = new ValidaTooltips( page )


    await test.step('Atencion', async () => {

        await atencion.iniciarNuevaAtencion('49663227')//Atencion.CEDULA
        await atencion.seleccionarTipoAtencion(Atencion.ATENCION)
        await atencion.seleccionarTipoPlan(Atencion.PLAN)
        await atencion.btnVisibleEspecialidad()
    })


    await test.step('Seccion Medidas Antropometricas', async () => {

        await medidas.validaEncabezadoSeccion()
        await medidas.inputPeso('70')
        await medidas.inputPerimetroAbdominal('55')
        await medidas.inputAlturaRodilla('48')
        await medidas.inputTallaCalculadaPorAR(65, 'M')//edad, Hombre(H) o mujer(M)
        await medidas.inputIMCcalculadaPorAR()
        await medidas.inputPerimetroBraquial('22')
        await medidas.inputCircunferenciaPantorilla('25')
        await medidas.inputVelocidadMarcha('3')
    })

    await test.step('Seccion Signos Vitales', async () => {

        await signos.validaEncabezadoSeccion2()
        await signos.inputFrecuenciaCardiaca('60')
        await signos.labelcl_FrecuenciaCardiaca(65)//edad
        await signos.inputFrecuenciaPulso('61')
        await signos.labelcl_cl_Pulso()
        await signos.inputFrecuenciaRespiratoria('20')
        await signos.labelcl_cl_FrecuenciaRespiratoria()
    })


})

test('Medidas Antropometricas en PHC Hombre < 60', async ({ page }) => {

    //Objetos de paginas
    const atencion = new AtencionPHC(page)
    const medidas2 = new MedidasAntropometricas2(page)
    const signos = new SignosVitales(page)


    await test.step('Atencion', async () => {

        await atencion.iniciarNuevaAtencion('8030846')//Atencion.CEDULA )
        await atencion.seleccionarTipoAtencion(Atencion.ATENCION)
        await atencion.seleccionarTipoPlan(Atencion.PLAN)
        await atencion.btnVisibleEspecialidad()
    })


    await test.step('Seccion Medidas Antropometricas', async () => {

        await medidas2.validaEncabezadoSeccion()
        await medidas2.inputPeso('90')
        await medidas2.inputTalla('160')
        await medidas2.inputIMC()
        await medidas2.inputClasificacion()
        await medidas2.inputPerimetroAbdominal('50')
    })

    await test.step('Seccion Signos Vitales', async () => {

        await signos.validaEncabezadoSeccion2()
        await signos.inputFrecuenciaCardiaca('60')
        await signos.labelcl_FrecuenciaCardiaca(55)//edad
        await signos.inputFrecuenciaPulso('61')
        await signos.labelcl_cl_Pulso()
        await signos.inputFrecuenciaRespiratoria('20')
        await signos.labelcl_cl_FrecuenciaRespiratoria()
    })

})

test('Medidas Antropometricas en PHC Mujer < 60', async ({ page }) => {

    //Objetos de paginas
    const atencion = new AtencionPHC(page)
    const medidas2 = new MedidasAntropometricas2(page)
    const signos = new SignosVitales(page)


    await test.step('Atencion', async () => {

        await atencion.iniciarNuevaAtencion('39487381')//Atencion.CEDULA )
        await atencion.seleccionarTipoAtencion(Atencion.ATENCION)
        await atencion.seleccionarTipoPlan(Atencion.PLAN)
        await atencion.btnVisibleEspecialidad()
    })


    await test.step('Seccion Medidas Antropometricas', async () => {

        await medidas2.validaEncabezadoSeccion()
        await medidas2.inputPeso('90')
        await medidas2.inputTalla('160')
        await medidas2.inputIMC()
        await medidas2.inputClasificacion()
        await medidas2.inputPerimetroAbdominal('50')
    })

    await test.step('Seccion Signos Vitales', async () => {

        await signos.validaEncabezadoSeccion2()
        await signos.inputFrecuenciaCardiaca('101')
        await signos.labelcl_FrecuenciaCardiaca(57)//edad
        await signos.inputFrecuenciaPulso('61')
        await signos.labelcl_cl_Pulso()
        await signos.inputFrecuenciaRespiratoria('20')
        await signos.labelcl_cl_FrecuenciaRespiratoria()
    })

})

// test.only('Medidas Antropometricas en PHC Tooltips', async ({ page }) => {

//     const atencion = new AtencionPHC(page)

//     await test.step('Atencion', async () => {

//         await atencion.iniciarNuevaAtencion('49663227')//Atencion.CEDULA
//         await atencion.seleccionarTipoAtencion(Atencion.ATENCION)
//         await atencion.seleccionarTipoPlan(Atencion.PLAN)
//         await atencion.btnVisibleEspecialidad()
//     })

//     await test.step('Validar Tooltips', async () => {

//         console.log("")
//         console.log("Finaliza Validacion de: TOOLTIPS")
//         console.log("")
//         console.log("------------------------------------------------------------------")
//         console.log("")

//         await page.getByRole('cell', { name: 'cm Ayuda' }).getByRole('img').click({ force: true })
//         const texto = await page.getByText('Aplica para < 80 años.').allInnerTexts()
//         console.log('Tooltip Perimetro Abdominal: ', texto)
//         console.log("")

//         await page.getByRole('row', { name: 'Altura de rodilla Ayuda Talla' }).getByRole('img').first().click({ force: true })
//         const texto2 = await page.getByText('Se debe tomar con la persona').allInnerTexts()
//         console.log('Tooltip Altura De Rodilla: ', texto2)
//         console.log("")

//         await page.getByRole('row', { name: 'Altura de rodilla Ayuda Talla' }).getByRole('img').nth(1).click({ force: true })
//         const texto3 = await page.getByText('Talla calculada por la fó').allInnerTexts()
//         console.log('Tooltip Talla calculada por AR: ', texto3)
//         console.log("")

//         await page.getByRole('row', { name: 'IMC calculada por AR Ayuda' }).getByRole('img').click({ force: true })
//         const texto4 = await page.getByText('Si el IMC <22 puede indicar').allInnerTexts();
//         console.log('Tooltip IMC calculada por AR: ', texto4)
//         console.log("")

//         await page.getByRole('row', { name: 'Perímetro braquial Ayuda' }).getByRole('img').click({ force: true })
//         const texto5 = await page.getByText('Se toma la medida en el brazo').allInnerTexts();
//         console.log('Tooltip Perímetro braquial: ', texto5)
//         console.log("")

//         await page.getByRole('row', { name: 'Circunferencia pantorrilla' }).getByRole('img').click({ force: true })
//         const texto6 = await page.getByText('Se recomienda que la persona').allInnerTexts();
//         console.log('Tooltip Circunferencia pantorrilla: ', texto6)
//         console.log("")

//         await page.getByRole('row', { name: 'Velocidad marcha Ayuda' }).getByRole('img').getByRole('img').click({ force: true })
//         const texto7 = await page.getByText('Se mide con el cronómetro el').allInnerTexts();
//         console.log('Tooltip Velocidad marcha: ', texto7)
//         console.log("")

//         await page.screenshot({ path: 'tests/Screenshots/Tooltips/' + 'Tooltips.png' });
//     })


// })
