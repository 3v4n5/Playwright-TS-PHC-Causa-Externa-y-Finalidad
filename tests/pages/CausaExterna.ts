import { Locator, Page, expect } from '@playwright/test';
import { Causa, Finalidad } from '../Data/dataCEF';

export class CausaExterna {
    private page: Page;
    private causa: string;
    private finalidad: string;
    private encabezado: string;
    private labelCausa: string;
    private labelFinalidad: string;

    constructor(page: Page) {
        this.page = page;
        this.causa = ("//select[@id='prot-causa-externa']");
        this.finalidad = ("//body[1]/div[1]/div[3]/div[1]/div[3]/div[4]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/form[1]/div[1]/span[1]/span[1]/span[32]/span[1]/span[1]/span[1]/div[1]/div[2]/div[1]/span[1]/span[1]/div[1]/div[1]/span[1]/div[1]/div[1]/table[1]/tbody[1]/tr[2]/td[2]/span[1]/select[1]/option");
        this.encabezado = ("//h4[text()='Causa externa y finalidad']");
        this.labelCausa = ("//label[text()='Causa externa']");
        this.labelFinalidad = ("//label[text()='Finalidad de la consulta']");
    }

    async validaEncabezadoSeccion() {
        (await this.page.waitForSelector(this.encabezado)).click()
        await this.page.waitForTimeout(3000)
        await this.page.screenshot({ path: 'tests/Screenshots/causaFinalidad/' + 'CausaFinalidad.png' });
        
        const msj = await this.page.locator(this.encabezado).textContent()
        console.log('Seccion: ' + msj);
        console.log("")
        

    }

    async seleccionarCausa() {

        const labelC = await this.page.locator(this.labelCausa).textContent()
        console.log('Opciones de', labelC)
        console.log(" --------------------- ")
        console.log('')

        //Obtener valores del select Causa o motivo de atencion
        const resultado = await this.page.$$eval('#prot-causa-externa > option', (element) => {
            return element.map(option => option.textContent)
        });

        const clavesCausa = Object.keys(Causa)

        console.log('Valores Esperados: ', clavesCausa)
        console.log('Valores Obtenidos: ', resultado)
        console.log('')

        //validacion
        expect(resultado).toEqual(clavesCausa)
    }


    async seleccionarFinalidad() {

        const labelF = await this.page.locator(this.labelFinalidad).textContent()
        console.log('Opciones de', labelF)
        console.log(" --------------------- ")
        console.log('')

        //Obtener valores del select Finalidad o motivo de atencion
        const selectFinalidad = await this.page.$$eval(this.finalidad, (element) => {
            return element.map(option => option.textContent)
        });

        const clavesFinalidad = Object.keys(Finalidad)

        console.log('Valores Esperados: ', clavesFinalidad)
        console.log('Valores Obtenidos: ', selectFinalidad)

        //validacion
        expect(selectFinalidad).toEqual(clavesFinalidad)

    }
}

