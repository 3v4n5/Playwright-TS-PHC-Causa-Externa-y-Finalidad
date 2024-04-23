import { test } from '@playwright/test';
import { BaseUrl, Atencion, Credenciales } from './Data/Variables';
import { LoginPHC } from './pages/loginPHC';
import { AtencionPHC } from './pages/atencionPHC';
import { MedidasAntropometricas2 } from './pages/MedidasAnt2';
import { MedidasAntropometricas } from './pages/MedidasAnt';
import { SignosVitales } from './pages/SignosVitales';

import  dotenv  from 'dotenv';
dotenv.config()


test.beforeEach( async ({ page }) => {
    
    await page.goto( BaseUrl.URL_Piloto );
    
    const login = new LoginPHC( page )

    
    await test.step(" Login ", async () => {
        await login.nuevoLoginPHC( Credenciales.PHCUSER, Credenciales.PHCPASSW )
    });

    
});


test('Medidas Antropometricas en PHC - Hombre >= 60', async ({ page }) => { 
  
  //Objetos de paginas
  const atencion = new AtencionPHC( page )
  const medidas = new MedidasAntropometricas( page )
  const signos = new SignosVitales( page )

 
  await test.step('Atencion', async () => {
      
      await atencion.iniciarNuevaAtencion('17131964')//Atencion.CEDULA 
      await atencion.seleccionarTipoAtencion( Atencion.ATENCION )
      await atencion.seleccionarTipoPlan( Atencion.PLAN )
      await atencion.btnVisibleEspecialidad()
  })
  
  
  await test.step('Seccion Medidas Antropometricas', async() => {
      
      await medidas.validaEncabezadoSeccion()
      await medidas.inputPeso('70')
      await medidas.inputPerimetroAbdominal('55')
      await medidas.inputAlturaRodilla('56')
      await medidas.inputTallaCalculadaPorAR(78,'H')//edad, Hombre(H) o mujer(M)
      await medidas.inputIMCcalculadaPorAR()
      await medidas.inputPerimetroBraquial('22')
      await medidas.inputCircunferenciaPantorilla('25')
      await medidas.inputVelocidadMarcha('5')
  })

  await test.step('Seccion Signos Vitales', async() => {
      
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
    const atencion = new AtencionPHC( page )
    const medidas = new MedidasAntropometricas( page )
    const signos = new SignosVitales( page )
    // const tooltip = new ValidaTooltips( page )
  
   
    await test.step('Atencion', async () => {
        
        await atencion.iniciarNuevaAtencion('49663227')//Atencion.CEDULA
        await atencion.seleccionarTipoAtencion( Atencion.ATENCION )
        await atencion.seleccionarTipoPlan( Atencion.PLAN )
        await atencion.btnVisibleEspecialidad()
    })
    
    
    await test.step('Seccion Medidas Antropometricas', async() => {
        
        await medidas.validaEncabezadoSeccion()
        await medidas.inputPeso('70')
        await medidas.inputPerimetroAbdominal('55')
        await medidas.inputAlturaRodilla('48')
        await medidas.inputTallaCalculadaPorAR(65,'M')//edad, Hombre(H) o mujer(M)
        await medidas.inputIMCcalculadaPorAR()
        await medidas.inputPerimetroBraquial('22')
        await medidas.inputCircunferenciaPantorilla('25')
        await medidas.inputVelocidadMarcha('3')
    })
  
    await test.step('Seccion Signos Vitales', async() => {
        
        await signos.validaEncabezadoSeccion2()
        await signos.inputFrecuenciaCardiaca('60')
        await signos.labelcl_FrecuenciaCardiaca(65)//edad
        await signos.inputFrecuenciaPulso('61')
        await signos.labelcl_cl_Pulso()
        await signos.inputFrecuenciaRespiratoria('20')
        await signos.labelcl_cl_FrecuenciaRespiratoria()
    })
  
  
})

test('Medidas Antropometricas en PHC Hombre < 60', async ({ page}) => {

  //Objetos de paginas
  const atencion = new AtencionPHC( page )
  const medidas2 = new MedidasAntropometricas2( page )
  const signos = new SignosVitales( page )

 
  await test.step('Atencion', async () => {
      
      await atencion.iniciarNuevaAtencion('8030846')//Atencion.CEDULA )
      await atencion.seleccionarTipoAtencion( Atencion.ATENCION )
      await atencion.seleccionarTipoPlan( Atencion.PLAN )
      await atencion.btnVisibleEspecialidad()
  })
  
  
  await test.step('Seccion Medidas Antropometricas', async() => {
      
      await medidas2.validaEncabezadoSeccion()
      await medidas2.inputPeso('90')
      await medidas2.inputTalla('160')
      await medidas2.inputIMC()
      await medidas2.inputClasificacion()
      await medidas2.inputPerimetroAbdominal('50')
  })

  await test.step('Seccion Signos Vitales', async() => {
      
      await signos.validaEncabezadoSeccion2()
      await signos.inputFrecuenciaCardiaca('60')
      await signos.labelcl_FrecuenciaCardiaca(55)//edad
      await signos.inputFrecuenciaPulso('61')
      await signos.labelcl_cl_Pulso()
      await signos.inputFrecuenciaRespiratoria('20')
      await signos.labelcl_cl_FrecuenciaRespiratoria()
  })
  
})

test('Medidas Antropometricas en PHC Mujer < 60', async ({ page}) => {

    //Objetos de paginas
    const atencion = new AtencionPHC( page )
    const medidas2 = new MedidasAntropometricas2( page )
    const signos = new SignosVitales( page )
  
   
    await test.step('Atencion', async () => {
        
        await atencion.iniciarNuevaAtencion('39487381')//Atencion.CEDULA )
        await atencion.seleccionarTipoAtencion( Atencion.ATENCION )
        await atencion.seleccionarTipoPlan( Atencion.PLAN )
        await atencion.btnVisibleEspecialidad()
    })
    
    
    await test.step('Seccion Medidas Antropometricas', async() => {
        
        await medidas2.validaEncabezadoSeccion()
        await medidas2.inputPeso('90')
        await medidas2.inputTalla('160')
        await medidas2.inputIMC()
        await medidas2.inputClasificacion()
        await medidas2.inputPerimetroAbdominal('50')
    })
  
    await test.step('Seccion Signos Vitales', async() => {
        
        await signos.validaEncabezadoSeccion2()
        await signos.inputFrecuenciaCardiaca('101')
        await signos.labelcl_FrecuenciaCardiaca(57)//edad
        await signos.inputFrecuenciaPulso('61')
        await signos.labelcl_cl_Pulso()
        await signos.inputFrecuenciaRespiratoria('20')
        await signos.labelcl_cl_FrecuenciaRespiratoria()
    })
    
})

// test.only('Medidas Antropometricas en PHC Tooltips',  async ({ page }) =>{
    
//     const atencion = new AtencionPHC( page )
//     // const tooltip = new ValidaTooltips( page )

    
//     await test.step('Atencion', async () => {
      
//         await atencion.iniciarNuevaAtencion.abrirBuscar
//         await atencion.iniciarNuevaAtencion( Atencion.CEDULA )
//         await atencion.iniciarNuevaAtencion.btnBuscar
//         await atencion.iniciarNuevaAtencion.btnAtender
//         await atencion.seleccionarTipoAtencion( Atencion.ATENCION )
//         await atencion.seleccionarTipoPlan( Atencion.PLAN )
//         await atencion.seleccionarTipoPlan.btnIniciarAtencion
//         await atencion.seleccionarTipoPlan.btnIniciarRegistro
//         await atencion.btnVisibleEspecialidad()
//     })
    
//     await test.step('Validar Tooltips', async() =>{
        
//         console.log("")
//         console.log("Finaliza Validacion de: TOOLTIPS")
//         console.log("")
//         console.log("------------------------------------------------------------------")
//         console.log("")

//         // await tooltip.tooltipPerímetroAbdominal()
//         // await tooltip.tooltipAlturadeRodilla()
//         await page.locator('//tbody//span[2]//span[1]//img[1]').click()
//         const texto = await page.locator("(//div[@class='tooltip-inner ng-binding'])[1]").textContent()
//         console.log('Tooltip Perimetro Abdominal: ', texto)
//         console.log("")

//         await page.locator('//body[1]/div[1]/div[3]/div[1]/div[3]/div[4]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/form[1]/div[1]/span[1]/span[1]/span[20]/span[1]/span[1]/span[1]/div[1]/div[2]/span[1]/span[1]/div[1]/div[1]/span[2]/span[1]/div[1]/div[1]/div[1]/span[1]/span[1]/div[1]/div[1]/span[1]/div[1]/div[1]/table[1]/tbody[1]/tr[2]/td[2]/span[1]/span[1]/span[1]/span[1]/span[1]/img[1]').click()
//         const texto2 = await page.locator("(//div[@class='tooltip-inner ng-binding'])[2]").textContent()
//         console.log('Tooltip Altura De Rodilla: ', texto2)
//         console.log("")
        
//         await page.locator("//span[@data-tooltip-html-unsafe='Talla calculada por la fórmula de Chumlea.']//img[@title='Ayuda']").click()
//         const texto3 = await page.locator("(//div[@class='tooltip-inner ng-binding'])[3]").textContent()
//         console.log('Talla calculada por AR: ', texto3)
//         console.log("")

//         await page.locator("//tbody/tr/td[@class='phc-td-25 ng-scope']/span[@name='examenfisicomg']/span[1]/span[1]/img[1]").click()
//         const texto4 = await page.locator("//div[text()='Si el IMC <22 puede indicar aumento de la mortalidad']").textContent();
//         console.log('IMC calculada por AR: ', texto4)
//         console.log("")
        
//         await page.locator("(//img[@title='Ayuda'])[12]").click()
//         const texto5 = await page.locator("//div[@class='tooltip-inner ng-binding']//br[1]").textContent();
//         console.log('Perímetro braquial: ', texto5)
//         console.log("")

//         //await page.getByRole('cell', { name: 'cm Ayuda' }).getByAltText('Ayuda').click({force: true})
//         // const texto = page.getByText('Aplica para < 80 años.').textContent()
//         // await page.getByRole('cell', { name: 'cm Ayuda Aplica para < 80 años.' }).getByAltText('Ayuda').click({force: true});
        
//         // await page.getByRole('row', { name: 'Altura de rodilla Ayuda Talla calculada por AR Ayuda' }).getByAltText('Ayuda').first().click({force: true});
//         // const texto2 = page.getByText('Se debe tomar con la persona preferiblemente sentada, con los pies totalmente ap').textContent()
//         // await page.getByRole('cell', { name: 'Ayuda Se debe tomar con la persona preferiblemente sentada, con los pies totalmente apoyados; con las rodillas dobladas en un ángulo de 90°. Se ubica el polo superior de la rótula y saca una línea imaginaria hasta la cara lateral externa de la pierna y se mide desde este punto hasta el suelo.' }).getByAltText('Ayuda').click({force: true});  

//         // await page.getByRole('row', { name: 'Altura de rodilla Ayuda Talla calculada por AR Ayuda' }).getByAltText('Ayuda').nth(1).click({force: true})
//         // const texto3 = page.getByText('Talla calculada por la fórmula de Chumlea.')
//         // const msj = await texto3.textContent()
//         // console.log('Tooltip Talla Calculada Por AR: ', await msj)
//         // // await page.getByRole('cell', { name: 'Ayuda Talla calculada por la fórmula de Chumlea.' }).getByAltText('Ayuda').click({force: true});
//         // console.log("")

//         // await page.getByRole('row', { name: 'IMC calculada por AR Ayuda Clasificación IMC por AR' }).getByAltText('Ayuda').click({force: true});
//         // const texto4 = page.getByText('Si el IMC <22 puede indicar aumento de la mortalidad').textContent()
//         // console.log('Tooltip IMC Calculada Por AR: ', await texto4)
//         // // await page.getByRole('cell', { name: 'Ayuda Si el IMC <22 puede indicar aumento de la mortalidad' }).getByAltText('Ayuda').click({force: true});
//         // console.log("")

//         // await page.getByRole('row', { name: 'Perímetro braquial Ayuda Interpretación perímetro braquial' }).getByAltText('Ayuda').click({force: true});
//         // const texto5 = page.getByText('Se toma la medida en el brazo dominante.Es la medición de la circunferencia del ').textContent()
//         // console.log('Perímetro Braquial: ', await texto5)
//         // await page.getByRole('cell', { name: 'Ayuda Se toma la medida en el brazo dominante. Es la medición de la circunferencia del punto medio entre la punta de la clavícula (acromion) y la del codo (olécranon). Su medición refleja de manera indirecta las reservas de masa muscular.' }).getByAltText('Ayuda').click({force: true});
//         // console.log("")

//         // await page.getByRole('row', { name: 'Circunferencia pantorrilla * Ayuda Interpretación circunferencia de pantorrilla' }).getByAltText('Ayuda').click({force: true});
//         // const texto6 = await page.getByText('Se recomienda que la persona esté sentada, con las piernas en un ángulo de 90°.S').textContent();
//         // console.log('Circunferencia Pantorrilla: ', await texto6)
//         // await page.getByRole('cell', { name: 'Ayuda Se recomienda que la persona esté sentada, con las piernas en un ángulo de 90°. Se tomala medida en la pierna dominante en la parte más gruesa de la pantorrilla,sin hacer mucha presión sobre la piel.' }).getByAltText('Ayuda').click({force: true});
//         // console.log("")

//         // await page.getByRole('row', { name: 'Velocidad marcha Ayuda Interpretación velocidad de la marcha' }).getByAltText('Ayuda').click({force: true});
//         // const texto7 = page.getByText('Se mide con el cronómetro el tiempo que le toma a la persona caminar un trayecto').textContent();
//         // console.log('Velocidad Marcha: ', await texto7)
//         // // await page.getByRole('cell', { name: 'Ayuda Se mide con el cronómetro el tiempo que le toma a la persona caminar un trayecto de 4 metros, libre de obstáculos. Si la persona requiere bastón o caminador para la marcha, lo debe usar para la medición.' }).getByAltText('Ayuda').click({force: true});
//         // console.log("")

//         await page.screenshot({ path: 'tests/Screenshots/Tooltips/' + 'Tooltips.png' });
// })

        
// })
