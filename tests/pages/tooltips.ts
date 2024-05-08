// export class ValidaTooltips{

//     construrctor( page ){
//         this.page = page;
        
//         this.ttPerimetroAbdominal = page.locator('//tbody//span[2]//span[1]//img[1]')
//         this.msjttPerimetroAbdominal = ("//div[@class='tooltip-inner ng-binding']")

//         this.ttAlturaRodilla = '//tbody/tr[2]/td[2]/span[1]/span[1]/span[1]/span[1]/span[1]/img[1]'
//         this.msjttAlturaRodilla = ("(//div[@class='tooltip-inner ng-binding'])[2]")
//         this.ttTallaCalculadaAR = ("//span[@data-tooltip-html-unsafe='Talla calculada por la fórmula de Chumlea.']//img[@title='Ayuda']")
//         this.msjttTallaCalculadaAR = ("")
//         this.ttIMCcalculadaAR = ("//tbody/tr/td[@class='phc-td-25 ng-scope']/span[@name='examenfisicomg']/span[1]/span[1]/img[1]")
//         this.msjttIMCcalculadaAR = ("")
//         this.ttPerimetroBraquial = ("//span[@data-tooltip-html-unsafe='Se toma la medida en el brazo dominante.<br/>Es la medición de la circunferencia del punto medio entre la punta de la clavícula (acromion) y la del codo (olécranon). <br/>Su medición refleja de manera indirecta las reservas de masa muscular.']//img[@title='Ayuda']")
//         this.msjttPerimetroBraquial = ("")
//         this.ttCircunferenciaPantorrilla = ("//tbody/tr[2]/td[2]/span[1]/span[1]/span[1]/span[1]/span[1]/img[1]")
//         this.msjttCircunferenciaPantorrilla = ("")
//         this.ttVelocidadmarcha = ("//tbody/tr[2]/td[2]/span[1]/span[1]/span[1]/span[1]/span[1]/img[1]")
//         this.msjttVelocidadmarcha = ("")
//     }


//     async tooltipPerímetroAbdominal(){
//         // await this.page.waitForSelector(this.ttPerimetroAbdominal)    
//         // await this.page.locator(this.ttPerimetroAbdominal).click()
//         await this.ttPerimetroAbdominal.click({force:true})
//         const texto = await this.page.locator(this.msjttPerimetroAbdominal).textContent()
//         console.log('Tooltip Perimetro Abdominal: ', await texto)
//     }
    
//     async tooltipAlturadeRodilla(){
//         await this.page.waitForSelector(this.ttAlturaRodilla)    
//         await this.page.locator(this.ttAlturaRodilla).click()
//         const texto = await this.page.locator(this.msjttAlturaRodilla).textContent()
//         console.log('Tooltip Altura de Rodilla: ', await texto)
//     }

//     async tooltipTallaCalculadaporAR(){

//     }

//     async tooltipIMCcalculadaporAR(){

//     }
    
//     async tooltipPerímetrobraquial(){

//     }
    
//     async tooltipCircunferenciaPantorrilla(){

//     }
    
//     async tooltipVelocidadmarcha(){

//     }

// }