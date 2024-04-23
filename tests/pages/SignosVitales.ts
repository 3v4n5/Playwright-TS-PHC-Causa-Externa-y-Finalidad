import { expect, Page } from '@playwright/test';

export class SignosVitales {
    page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }

    encabezado2 = () => this.page.locator("(//h4[text()='Signos Vitales'])[1]")
    frecuenciaCardiaca = () => this.page.locator("(//label[text()='Frecuencia cardiaca']/following::input)[1]")
    frecuenciaPulso = () => this.page.locator("(//label[text()='Frecuencia Pulso']/following::input)[1]")
    frecuenciaRespiratoria = () => this.page.locator("(//label[text()='Frecuencia respiratoria']/following::input)[1]")
    cl_FrecuenciaCardiaca = () => this.page.locator("(//label[text()='Clasificación frecuencia cardiaca']/following::input)[1]")
    cl_Pulso = () => this.page.locator("(//label[text()='Clasificación pulso']/following::input)[1]")
    cl_FrecuenciaRespiratoria = () => this.page.locator("(//label[text()='Clasificación frecuencia respiratoria']/following::input)[1]")

    async validaEncabezadoSeccion2() {
        const msj = await this.encabezado2().textContent()
        console.log('Finaliza la seccion: ' + msj?.toUpperCase());
        console.log("")
    }

    async inputFrecuenciaCardiaca(valor: string) {
        const value = await this.frecuenciaCardiaca().fill(valor)
    }

    async inputFrecuenciaPulso(valor: string) {
        await this.frecuenciaPulso().fill(valor)
    }

    async inputFrecuenciaRespiratoria(valor: string) {
        await this.frecuenciaRespiratoria().fill(valor)
    }

    async labelcl_FrecuenciaCardiaca(edad: number) {
        const value = await this.frecuenciaCardiaca().inputValue()
        const texto = this.cl_FrecuenciaCardiaca()

        const valor = parseInt(value)
        
        switch (edad) {
            case (edad < 60 && edad ):
                if ( valor <= 100){
                    expect(texto).toHaveValue('Normal') 
                }else if ( valor > 100 ){
                    expect(texto).toHaveValue('Anormal')
                 }

            case (edad >= 60 && edad):
                if (valor >= 60 && valor <= 90) {
                    expect(texto).toHaveValue('Normal')
                } else if (valor <= 60 && valor >= 90) {
                    await expect(texto).toHaveValue('Anormal')
                }
                break;

            default: console.log( 'Se debe ingresar un valor valido')
                break;
        }

        console.log(
            'Frecuencia Cardiaca......', value,
            'Clasificación Frecuencia Cardiaca......', await texto.inputValue()
        )
    }

    async labelcl_cl_Pulso() {
        const valueF = await this.frecuenciaCardiaca().inputValue()
        const value = await this.frecuenciaPulso().inputValue()
        const texto = this.cl_Pulso()

        if (value == valueF) {
            expect(texto).toHaveValue('Normal')
        } else if (value != valueF) {
            await expect(texto).toHaveValue('Alterado')
        } else {
            throw new Error('VALOR NO ESPERADO')
        }

        console.log(
            'Frecuencia Pulso.........', value,
            ' Clasificación Pulso....................', await texto.inputValue()
        )
    }

    async labelcl_cl_FrecuenciaRespiratoria() {
        const value = await this.frecuenciaRespiratoria().inputValue()
        const texto = this.cl_FrecuenciaRespiratoria()
        const valor = parseInt(value)

        if (valor >= 12 && valor <= 20) {
            expect(texto).toHaveValue('Normal')
        } else if (valor <= 12 && valor >= 20) {
            await expect(texto).toHaveValue('Anormal')
        } else {
            throw new Error('VALOR NO ESPERADO')
        }

        console.log(
            'Frecuencia Respiratoria..', value,
            ' Clasificación Frecuencia Respiratoria..', await texto.inputValue()
        )

        await this.page.screenshot({ path: 'tests/Screenshots/SeccionMA/' + 'Signos.png' });
        console.log('')
    }



}

