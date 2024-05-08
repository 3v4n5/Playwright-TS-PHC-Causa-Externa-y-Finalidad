import { expect, Locator, Page } from '@playwright/test';

export class MedidasAntropometricas2{
    readonly page: Page;
    readonly encabezado: string;
    readonly peso: Locator;
    readonly talla: Locator;
    readonly imc: Locator;
    readonly clasificacion: Locator;
    readonly labelPeso: Locator;
    readonly labelPerimetroAbdominal: Locator;
    readonly labelTalla: Locator;
    readonly labelIMC: Locator;
    readonly labelClasificacion: Locator;
    readonly perimetroAbdominal: Locator;
    readonly btnArrowColapse: Locator;


    constructor( page: Page ){
        this.page = page;
        this.encabezado = ("//h4[text()='Medidas Antropométricas']")
        this.peso = page.locator("(//label[text()='Peso']/following::input)[1]")
        this.talla = page.locator("(//label[text()='Talla']/following::input)[1]")
        this.imc = page.locator("(//label[text()='IMC']/following::input)[1]")
        this.clasificacion = page.locator("((//label[text()='Clasificación'])[3]/following::input)[1]")

        this.labelPeso = page.locator("(//label[@for='Peso'])[1]")
        this.labelPerimetroAbdominal = page.locator("(//label[@for='Perímetro abdominal'])[1]")
        this.labelTalla = page.locator("//label[@for='Talla']")
        this.labelIMC = page.locator("//label[@for='IMC']")
        this.labelClasificacion = page.locator("(//label[@for='Clasificación'])[2]")

        this.perimetroAbdominal = page.locator("(//label[text()='Perímetro abdominal']/following::input)[1]")
        this.btnArrowColapse = page.locator("(//i[contains(@class,'arrowTitle ng-scope')])[3]")
    }
        
    
    async validaEncabezadoSeccion() {

        if( await this.btnArrowColapse.isVisible() ) await this.btnArrowColapse.click()
            
            await this.page.waitForSelector(this.encabezado)        
            const encabezado = await this.page.locator(this.encabezado).isVisible()
        
        if( encabezado ){
            const msj = await this.page.locator(this.encabezado).textContent()
            console.log('Finaliza la seccion: ' + msj?.toUpperCase());
            console.log("")
        }else{
            throw new Error ('No existe seccion Medidas Antropometricas');     
        }
        
    }

    async inputPeso( valor: string ) {
        const labelPeso = this.labelPeso
        await expect( labelPeso ).toHaveText("Peso  *  ")
        
        await this.peso.fill( valor )
        const pesoValue = await this.peso.inputValue()
        console.log('Peso = ', pesoValue)
    }

    async inputTalla( valor: string ){
        const labelTalla = this.labelTalla
        await expect( labelTalla ).toHaveText('Talla  *  ')

        await this.talla.fill( valor )
        const tallaValue = await this.talla.inputValue()
        console.log('Talla = ' + tallaValue)
    }
   
    async inputIMC(){
        const label = await this.labelIMC.textContent()

        const labelIMC = this.labelIMC
        await expect( labelIMC ).toHaveText('IMC  *  ')

        const imcValue = await this.imc.inputValue()
        console.log('IMC = ', imcValue)
    }

    async inputClasificacion(){
        const labelClasificacion = this.labelClasificacion
        await expect( labelClasificacion ).toHaveText('Clasificación  *  ')

        const clasificacionValue = await this.clasificacion.inputValue()
        console.log('Clasificación = ', clasificacionValue)
    }

    async inputPerimetroAbdominal( valor: string ){
        const labelPerimetroAbdominal = this.labelPerimetroAbdominal
        await expect( labelPerimetroAbdominal ).toHaveText('Perímetro abdominal  *  ')

        await this.perimetroAbdominal.fill( valor )
        const perimetroValue = await this.perimetroAbdominal.inputValue()
        console.log('Perímetro abdominal = ', perimetroValue)

        console.log("")
        console.log("------------------------------------------------------------------")
        console.log("")
    }
}

