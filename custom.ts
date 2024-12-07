/**
 * RocketLink-S blokker
 */

enum status {
    //% block="selfStatus"
    selfStatus,
    //% block="linkStatus"
    linkStatus,
    //% block="igniterStatus"
    igniterStatus,
    //% block="igniterStatusLP"
    igniterStatusLP,
    //% block="armStatus"
    armStatus,
    //% block="armStatusLP"
    armStatusLP,
    //% block="klar"
    klar
}

//% weight=80 color=#ff0000 icon="\uf135"
//% groups="['Status', 'Knapper - ControllerPAD', 'Knapper - LaunchPAD', 'Knapper - Felles']"
//% state.shadow="toggleOnOff"
//% state.defl=true

namespace RocketLink {

    let selfStatus = false
    let linkStatus = false
    let armStatus = false
    let armStatusLP = false
    let igniterStatus = false
    let igniterStatusLP = false
    let klar = false
    let sistSettAktiv = 0

    //% block="Trykker på Launch-knappen"
    //% subcategory=Knapper color=#d400d4
    //% group="Knapper - ControllerPAD"
    export function launchButton(): boolean {
        if (input.buttonIsPressed(Button.A)) {
            return true
        } else {
            return false
        }
    }

    //% block="Armerer ControllerPAD"
    //% subcategory=Knapper color=#d400d4
    //% group="Knapper - ControllerPAD"
    export function armCP(): boolean {
        if (pins.digitalReadPin(DigitalPin.P1) == 0) {
            return true
        } else {
            return false
        }
    }

    //% block="Armerer LaunchPAD"
    //% subcategory=Knapper color=#d400d4
    //% group="Knapper - LaunchPAD"
    export function armLP(): boolean {
        if (pins.digitalReadPin(DigitalPin.P1) == 1) {
            return true
        } else {
            return false
        }
    }

    //% block="sjekk om ControllerPAD er klar til oppskytning"
    //% subcategory=Status
    //% group="Status"
    export function oppskytningKlarCP(): void {
        if (selfStatus && linkStatus && igniterStatus) {
            klar = true
        } else {
            klar = false
        }
    }

    //% block="Sjekk linkStatus til ControllerPAD: | Send radionummer $linkRadioNumber"
    //% inlineInputMode=external
    //% subcategory=Radio
    //% group="Status - Radio"
    //% color=#e5478c
    export function linksjekk(linkRadioNumber: number) {
        while (true) {
            radio.sendNumber(linkRadioNumber)
            if (input.runningTime() - sistSettAktiv > 3 * 200) {
                linkStatus = false
                igniterStatusLP = false
                armStatusLP = false
            }
            basic.pause(200)
        }
    }
    //% block="$velgVariabel"
    //% subcategory=Status
    //% group="Status - Felles"
    export function statusVariabel(velgVariabel?: status): boolean {
        if (velgVariabel) {
            return true
        } else {
            return false
        }
    }
    
    //% block="Arm Status-Lys %state"
    //% subcategory=Status
    //% group="Status - Lys"
    export function armStatusLys(state: boolean): void {
        if (state) {
            led.plot(0, 0)
            led.plot(0, 1)
            led.plot(0, 2)
            led.plot(0, 3)
            led.plot(0, 4)
        } else {
            led.unplot(0, 0)
            led.unplot(0, 1)
            led.unplot(0, 2)
            led.unplot(0, 3)
            led.plot(0, 4)
        }
    }

    //% block="Link Status-Lys %state"
    //% subcategory=Status
    //% group="Status - Lys"
    export function linkStatusLys(state: boolean): void {
        if (state) {
            led.plot(2, 0)
            led.plot(2, 1)
            led.plot(2, 2)
            led.plot(2, 3)
            led.plot(2, 4)
        } else {
            led.unplot(2, 0)
            led.unplot(2, 1)
            led.unplot(2, 2)
            led.unplot(2, 3)
            led.plot(2, 4)
        }
    }

    //% block="Oppskytning Status-Lys %state"
    //% subcategory=Status
    //% group="Status - Lys"
    export function oppskytningStatusLys(state: boolean): void {
        if (state) {
            pins.digitalWritePin(DigitalPin.P2, 1)
            led.plot(4, 0)
            led.plot(4, 1)
            led.plot(4, 2)
            led.plot(4, 3)
            led.plot(4, 4)
        } else {
            pins.digitalWritePin(DigitalPin.P2, 0)
            led.unplot(4, 0)
            led.unplot(4, 1)
            led.unplot(4, 2)
            led.unplot(4, 3)
            led.plot(4, 4)
        }
    }

    //% block="Arm LP Status-Lys %state"
    //% subcategory=Status
    //% group="Status - Lys"
    export function armLPStatusLys(state: boolean): void {
        if (state) {
            led.plot(1, 0)
            led.plot(1, 1)
            led.plot(1, 2)
            led.plot(1, 3)
            led.plot(1, 4)
        } else {
            led.unplot(1, 0)
            led.unplot(1, 1)
            led.unplot(1, 2)
            led.unplot(1, 3)
            led.plot(1, 4)
        }
    }
}