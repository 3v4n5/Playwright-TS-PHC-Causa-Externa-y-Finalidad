import { expect, Page, Locator } from '@playwright/test'

export class MedidasAntropometricas {
    
    readonly page: Page;
    readonly encabezado: string;
    readonly peso: Locator;
    readonly perimetroAbdominal: Locator;
    readonly alturaRodilla: Locator;
    readonly tallacalculadaAR: Locator;
    readonly IMCcalculadoAR: Locator;
    readonly cl_IMCporAR: Locator;
    readonly perimetroBraquial: Locator;
    readonly int_perimetroBraquial: Locator;
    readonly circunferenciaPantorilla: Locator;
    readonly int_circunferenciaPantorilla: Locator;
    readonly velocidadMarcha: Locator;
    readonly int_VelocidadMarcha: Locator;
    readonly btnArrowColapse: Locator;
    
    constructor( page: Page ) {
        this.page = page
        this.encabezado = ("//h4[text()='Medidas Antropométricas']")
        this.peso = page.locator("(//label[text()='Peso']/following::input)[1]")
        this.perimetroAbdominal = page.locator("(//label[text()='Perímetro abdominal']/following::input)[1]")
        this.alturaRodilla = page.locator("(//label[text()='Altura de rodilla']/following::input)[1]")
        this.tallacalculadaAR = page.locator("(//label[text()='Talla calculada por AR']/following::input)[1]")
        this.IMCcalculadoAR = page.locator("(//label[text()='IMC calculada por AR']/following::input)[1]")
        this.cl_IMCporAR = page.locator("(//label[text()='Clasificación IMC por AR']/following::input)[1]")
        this.perimetroBraquial = page.locator("(//label[text()='Perímetro braquial']/following::input)[1]")
        this.int_perimetroBraquial = page.locator("(//label[text()='Interpretación perímetro braquial']/following::input)[1]")
        this.circunferenciaPantorilla = page.locator("(//label[text()='Circunferencia pantorrilla']/following::input)[1]")
        this.int_circunferenciaPantorilla = page.locator("(//label[text()='Interpretación circunferencia de pantorrilla']/following::input)[1]")
        this.velocidadMarcha = page.locator("(//label[text()='Velocidad marcha']/following::input)[1]")
        this.int_VelocidadMarcha = page.locator("(//label[text()='Interpretación velocidad de la marcha']/following::input)[1]")
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

    async inputPeso( valor:string ) {
        await this.peso.fill(valor)
        const pesoValue = await this.peso.inputValue()
        console.log('Peso =', pesoValue)
    }

    async inputPerimetroAbdominal( valor: string ) {
        await this.perimetroAbdominal.fill(valor)
        const perimetroValue = await this.perimetroAbdominal.inputValue()
        console.log('Perímetro abdominal =', perimetroValue)
    }

    async inputAlturaRodilla( valor: string ) {
        await this.alturaRodilla.fill(valor)
        const aRodillaValue = await this.alturaRodilla.inputValue()
        console.log('Altura de rodilla =', aRodillaValue)
    }

    async inputTallaCalculadaPorAR( edad: number, sexo: string ) {
        const talla = await this.tallacalculadaAR.inputValue()
        const aRodillaValue = await this.alturaRodilla.inputValue()
        const calculoFCh = (2.02 * parseInt(aRodillaValue)) - (0.04 * edad) + 64.19
        const calculoFCm = (1.83 * parseInt(aRodillaValue)) - (0.24 * edad) + 84.88
        const chumleaH = calculoFCh.toFixed(1)
        const chumleaM = calculoFCm.toFixed(1)

        const sexoFM = sexo;
        
        switch (sexoFM) {
            case 'H':
                if (chumleaH === talla) {
                    console.log('Formula Chumlea OK ', chumleaH)
                } else {
                    console.log('Error en Talla Calculada AR Formula = ', chumleaH)
                }
                console.log('Talla calculada por AR =', talla,)
                
            break;
            
            case 'M':
                if (chumleaM === talla) {
                    console.log('Formula Chumlea OK ', chumleaM)
                } else {
                    console.log('Error en Talla Calculada AR Formula = ', chumleaM)
                }
                console.log('Talla calculada por AR =', talla,)
                
            break;

            default:
                break;
        }
    }

    async inputIMCcalculadaPorAR() {
        
        const value = await this.IMCcalculadoAR.inputValue()
        const interpretacion = parseInt(value)
        const texto = this.cl_IMCporAR
        
        
        
        if (interpretacion < 22) {
            await expect(texto).toHaveValue('Desnutrición')
        } else if (interpretacion >= 22.1 && interpretacion <= 22.9) {
            await expect(texto).toHaveValue('Delgadez')
        } else if (interpretacion >= 23 && interpretacion <= 27.9) {
            await expect(texto).toHaveValue('Peso normal')
        } else if (interpretacion >= 28 && interpretacion <= 31.9) {
            await expect(texto).toHaveValue('Sobrepeso')
        } else if (interpretacion >= 32) {
            await expect(texto).toHaveValue('Obesidad')
        } else {
            throw new Error('VALOR NO ESPERADO')
        }

        console.log('IMC calculada por AR.........', interpretacion, ' Clasificación IMC por AR =', await texto.inputValue())
    }


    async inputPerimetroBraquial(valor: string) {
        await this.perimetroBraquial.fill(valor)
        const value = await this.perimetroBraquial.inputValue()
        const interpretacion = parseInt(value)
        const texto = this.int_perimetroBraquial
        if (interpretacion < 22) {
            await expect(texto).toHaveValue('Probable sarcopenia')
        } else if (interpretacion >= 22) {
            await expect(texto).toHaveValue('Normal')
        } else {
            throw new Error('VALOR NO ESPERADO')
        }

        console.log('Perímetro braquial ..........', value, 'Interpretación perímetro braquial =', await texto.inputValue())
    }

    async inputCircunferenciaPantorilla(valor: string) {
        await this.circunferenciaPantorilla.fill(valor)
        const value = await this.circunferenciaPantorilla.inputValue()
        const interpretacion = parseInt(value)
        const texto = this.int_circunferenciaPantorilla
        if (interpretacion < 31) {
            await expect(texto).toHaveValue('Probable sarcopenia')
        } else if (interpretacion >= 31) {
            await expect(texto).toHaveValue('Normal')
        } else {
            throw new Error('VALOR NO ESPERADO')
        }

        console.log('Circunferencia pantorrilla ..', value, 'Interpretación circunferencia de pantorrilla =', await texto.inputValue()
        )
    }

    async inputVelocidadMarcha(valor: string) {
        await this.velocidadMarcha.fill(valor)
        const value = await this.velocidadMarcha.inputValue()
        const interpretacion = parseInt(value)
        const texto = this.int_VelocidadMarcha
        if (interpretacion <= 4.8) {
            await expect(texto).toHaveValue('Normal')
        } else if (interpretacion > 4.8) {
            await expect(texto).toHaveValue('Alterado')
        } else {
            throw new Error('VALOR NO ESPERADO')
        }

        console.log('Velocidad marcha ............', value, ' Interpretación velocidad de la marcha =', await texto.inputValue()
        )

        await this.page.screenshot({ path: 'tests/Screenshots/SeccionMA/' + 'Medidas.png' });

        console.log("")
        console.log("------------------------------------------------------------------")
        console.log("")
    }

}

