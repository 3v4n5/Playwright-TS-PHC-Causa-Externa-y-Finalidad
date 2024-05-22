import { Locator, Page } from '@playwright/test';

export class AtencionPHC {
    private page: Page;
    private abrirBuscar: Locator;
    private inputPaciente: Locator;
    private btnBuscar: Locator;
    private btnAtender: Locator;
    private seleccionarAtencion: Locator;
    private seleccionarPlan: Locator;
    private btnIniciarAtencion: Locator;
    private btnIniciarRegistro: Locator;
    private btnAceptarRemision: Locator;
    private btnAbrirRemisiones: Locator;
    private btnSinRemision: Locator;
    private btnAceptarSinRemision: Locator;
    private btnSinDerechos: Locator;
    private btnConsentInform: Locator;

    constructor(page: Page) {
        this.page = page;
        this.abrirBuscar = page.locator('#btnOpenFinder')
        this.inputPaciente = page.locator('input[name="identificacion"]')
        this.btnBuscar = page.locator('//button[normalize-space()="Buscar paciente"]')
        this.btnAtender = page.locator("//img[@title='Atender']")

        this.seleccionarAtencion = page.locator('//*[@id="ng-app"]/div[3]/div/div/span/div[1]/table/tbody/tr[3]/td[2]/div/input')
        this.seleccionarPlan = page.locator("//td[@class='width-80']//select[1]")

        this.btnIniciarAtencion = page.locator('//*[@id="ng-app"]/div[3]/div/div/span/div[3]/div/button[2]')
        this.btnIniciarRegistro = page.locator("//button[text()='Iniciar Registro']")
        this.btnAceptarRemision = page.locator("//button[@class='buttonMainAction ng-binding']")
        this.btnAbrirRemisiones = page.locator("(//button[@class='buttonExpand btn'])[1]")
        this.btnSinRemision = page.locator("//img[@title='Atender sin remisión']")
        this.btnAceptarSinRemision = page.locator("//button[@ng-if='messageButtonVisible']")
        this.btnSinDerechos = page.locator("//button[@class='buttonMainAction ng-binding']")
        this.btnConsentInform = page.getByRole('button', { name: 'Aceptar' })
    }

    async iniciarNuevaAtencion(cedula: string) {

        await this.abrirBuscar.click()
        await this.inputPaciente.fill(cedula)
        await this.btnBuscar.click()
        await this.btnAtender.click()
    }

    async seleccionarTipoAtencion(atencion: string) {
        await this.seleccionarAtencion.click()
        const valorImprimir = await this.page.getByText(atencion, { exact: true }).textContent()
        await this.page.getByText(atencion, { exact: true }).click()

        console.log('')
        console.log('Atencion:', valorImprimir)
        console.log('------------------------------------------------------------------')
        console.log('')
    }

    async seleccionarTipoPlan(plan: string) {
        await this.seleccionarPlan.selectOption({ value: plan })
        await this.btnIniciarAtencion.click()

        await this.btnConsentInform.isVisible() ? await this.btnConsentInform.click() : await this.btnIniciarRegistro.click()

        //await this.page.screenshot({ path: 'tests/Screenshots/Atencion/' + 'Atencion.png' });
    }

    async btnVisibleEspecialidad() {
        const botones = [
            this.btnAceptarRemision,
            this.btnAbrirRemisiones,
            this.btnSinRemision,
            this.btnAceptarSinRemision,
            this.btnSinDerechos,
        ]

        for (const selector of botones) {
            if (await selector.isVisible()) await selector.click()
        }
    }
} 