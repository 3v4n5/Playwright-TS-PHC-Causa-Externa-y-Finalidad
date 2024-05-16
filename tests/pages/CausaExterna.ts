import { Page, expect } from '@playwright/test';
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
        this.finalidad = ("//body[1]/div[1]/div[3]/div[1]/div[3]/div[4]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/form[1]/div[1]/span[1]/span[1]/span[32]/span[1]/span[1]/span[1]/div[1]/div[2]/div[1]/span[1]/span[1]/div[1]/div[1]/span[1]/div[1]/div[1]/table[1]/tbody[1]/tr[2]/td[2]/span[1]/select[1]");
        this.encabezado = ("//h4[text()='Causa externa y finalidad']");
        this.labelCausa = ("//label[text()='Causa externa']");
        this.labelFinalidad = ("//label[text()='Finalidad de la consulta']");

    }

    async validaEncabezadoSeccion() {
        await this.page.waitForSelector(this.encabezado)
        const msj = await this.page.locator(this.encabezado).textContent()
        console.log('Seccion: ' + msj);
        console.log("")
    }

    async seleccionarCausa() {

        const labelC = await this.page.locator(this.labelCausa).textContent()
        console.log('Opciones de', labelC)
        console.log(" --------------------- ")

        //Obtener valores del select Causa o motivo de atencion
        const select = this.page.locator(this.causa)
        const valoresCausa = await select.allInnerTexts()

        const selectCausa = (() => {
            let x = []
            for (let i = 0; i < valoresCausa.length; i++) {
                const element = valoresCausa[i];
                
            }
            return x.push()
        })

        const causas = Causa.map((key) => {
            let claves = Object.keys(key)
            for (const elementos of claves) {
                return elementos
            }
        })
        
        console.log(causas)
        console.log(valoresCausa)

        //validacion
        expect(causas).toEqual(valoresCausa)
    }



    async seleccionarFinalidad() {

        const labelF = await this.page.locator(this.labelFinalidad).textContent()
        console.log("Opciones de", labelF)
        console.log(" --------------------- ")


        //Obtener valores del select finalidad de la consulta
        const select = this.page.locator(this.finalidad);
        const valoresFinalidad = await select.allInnerTexts()

        let selectFinalidad = valoresFinalidad.map((valor) => {
            return console.log(valor)
        })

        let keys = Finalidad.filter((key) => {
            let element = Object.keys(key)
            return console.log(element)
        })


        //validacion
        expect(selectFinalidad).toEqual(expect.arrayContaining(keys))

    }
}

