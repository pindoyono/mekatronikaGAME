/**
 * COMPONENT LIBRARY
 * Comprehensive library of electronic components with properties
 */

class ComponentLibrary {
    constructor() {
        this.components = this.defineComponents();
    }

    /**
     * Define all electronic components
     */
    defineComponents() {
        return {
            // PASSIVE COMPONENTS
            resistor: {
                id: 'resistor',
                name: 'Resistor',
                category: 'passive',
                symbol: '🔲',
                svgSymbol: 'resistor-symbol.svg',
                description: 'Komponen yang menahan arus listrik',
                function: 'Membatasi arus, membagi tegangan, pull-up/down',
                unit: 'Ohm (Ω)',
                values: ['10Ω', '100Ω', '1kΩ', '10kΩ', '100kΩ', '1MΩ'],
                pins: 2,
                polarity: false,
                properties: {
                    resistance: { min: 0.1, max: 10000000, unit: 'Ω' },
                    power: { standard: [0.125, 0.25, 0.5, 1, 2, 5], unit: 'W' },
                    tolerance: ['1%', '5%', '10%'],
                    tempCoeff: { min: 10, max: 200, unit: 'ppm/°C' }
                },
                colorCode: true,
                applications: [
                    'Current limiting untuk LED',
                    'Voltage divider',
                    'Pull-up/pull-down resistor',
                    'Timing circuits',
                    'Filter circuits'
                ],
                testMethod: 'Ukur dengan multimeter (Ohm mode)',
                commonFaults: ['Nilai berubah', 'Terbakar (open circuit)', 'Rusak karena overheat']
            },

            capacitor: {
                id: 'capacitor',
                name: 'Capacitor',
                category: 'passive',
                symbol: '⊏⊐',
                svgSymbol: 'capacitor-symbol.svg',
                description: 'Komponen yang menyimpan energi dalam bentuk medan listrik',
                function: 'Menyimpan charge, filter, coupling, decoupling, timing',
                unit: 'Farad (F)',
                values: ['10pF', '100pF', '1nF', '10nF', '100nF', '1µF', '10µF', '100µF', '1000µF'],
                pins: 2,
                polarity: 'depends', // electrolytic yes, ceramic no
                types: ['Ceramic', 'Electrolytic', 'Tantalum', 'Film', 'Variable'],
                properties: {
                    capacitance: { min: 1e-12, max: 0.1, unit: 'F' },
                    voltage: { standard: [6.3, 10, 16, 25, 35, 50, 100, 200, 400], unit: 'V' },
                    tolerance: ['5%', '10%', '20%'],
                    esr: { min: 0.01, max: 10, unit: 'Ω' }
                },
                markingCode: {
                    ceramic: '3-digit code (104 = 100nF)',
                    electrolytic: 'Printed value (100µF 25V)'
                },
                applications: [
                    'Power supply filtering',
                    'Decoupling (bypass)',
                    'AC coupling',
                    'Timing circuits (RC)',
                    'Audio crossover'
                ],
                testMethod: 'Ukur dengan capacitance meter, check ESR',
                commonFaults: ['Kering (elektrolit)', 'Short circuit', 'Bocor (leakage)']
            },

            led: {
                id: 'led',
                name: 'LED (Light Emitting Diode)',
                category: 'semiconductor',
                symbol: '💡',
                svgSymbol: 'led-symbol.svg',
                description: 'Diode yang memancarkan cahaya saat dialiri arus',
                function: 'Indikator visual, penerangan, display',
                unit: 'Candela (cd)',
                pins: 2,
                polarity: true, // Anode (+), Cathode (-)
                colors: ['Red', 'Green', 'Blue', 'Yellow', 'White', 'RGB'],
                properties: {
                    forwardVoltage: {
                        red: 1.8,
                        green: 2.0,
                        blue: 3.0,
                        white: 3.2,
                        unit: 'V'
                    },
                    forwardCurrent: { typical: 20, max: 30, unit: 'mA' },
                    brightness: { min: 100, max: 20000, unit: 'mcd' },
                    viewingAngle: { typical: 120, unit: 'degrees' }
                },
                calculations: {
                    resistor: 'R = (Vsupply - Vled) / Iled',
                    power: 'P = Vled × Iled'
                },
                applications: [
                    'Status indicator',
                    'Power indicator',
                    'Seven-segment display',
                    'Backlighting',
                    'Optical communication'
                ],
                testMethod: 'Test dengan resistor 1kΩ dari 5V',
                commonFaults: ['Terbalik (reverse bias)', 'Overcurrent (terbakar)', 'Retak']
            },

            transistor: {
                id: 'transistor',
                name: 'Transistor',
                category: 'active',
                symbol: '⚡',
                svgSymbol: 'transistor-symbol.svg',
                description: 'Komponen aktif untuk switching dan amplifikasi',
                function: 'Saklar elektronik, penguat sinyal',
                types: ['NPN', 'PNP', 'MOSFET-N', 'MOSFET-P'],
                pins: 3,
                pinNames: {
                    BJT: ['Collector', 'Base', 'Emitter'],
                    MOSFET: ['Drain', 'Gate', 'Source']
                },
                properties: {
                    hFE: { min: 10, max: 800, typical: 100 },
                    Vce_sat: { typical: 0.2, max: 0.5, unit: 'V' },
                    Vbe: { typical: 0.7, unit: 'V' },
                    Ic_max: { range: [100, 500, 1000, 5000], unit: 'mA' },
                    power: { range: [0.5, 1, 5, 10, 50], unit: 'W' }
                },
                commonTypes: {
                    '2N2222': { type: 'NPN', Ic: 800, hFE: 100, use: 'General purpose' },
                    '2N3904': { type: 'NPN', Ic: 200, hFE: 150, use: 'Small signal' },
                    '2N3906': { type: 'PNP', Ic: 200, hFE: 150, use: 'Small signal' },
                    'BC547': { type: 'NPN', Ic: 100, hFE: 200, use: 'General purpose' },
                    'TIP31': { type: 'NPN', Ic: 3000, hFE: 50, use: 'Power' }
                },
                applications: [
                    'Digital switching',
                    'Signal amplification',
                    'Motor driver',
                    'Logic level shifting',
                    'Current source'
                ],
                testMethod: 'Ukur hFE dengan multimeter, test Vbe',
                commonFaults: ['Base-emitter short', 'Collector-emitter open', 'Reduced hFE']
            },

            diode: {
                id: 'diode',
                name: 'Diode',
                category: 'semiconductor',
                symbol: '▷|',
                svgSymbol: 'diode-symbol.svg',
                description: 'Komponen yang hanya mengalirkan arus satu arah',
                function: 'Rectifier, proteksi, clipper, clamper',
                unit: 'Volt (V)',
                pins: 2,
                polarity: true, // Anode, Cathode
                types: ['Standard', 'Zener', 'Schottky', 'Fast Recovery', 'Photodiode'],
                properties: {
                    forwardVoltage: { typical: 0.7, silicon: 0.7, schottky: 0.3, unit: 'V' },
                    reverseCurrent: { max: 50, unit: 'µA' },
                    peakReverseVoltage: { range: [50, 100, 200, 400, 600, 1000], unit: 'V' },
                    forwardCurrent: { range: [100, 1000, 3000, 5000], unit: 'mA' }
                },
                commonTypes: {
                    '1N4001': { PIV: 50, If: 1000, use: 'General rectifier' },
                    '1N4007': { PIV: 1000, If: 1000, use: 'High voltage rectifier' },
                    '1N5819': { type: 'Schottky', Vf: 0.3, use: 'Low dropout' },
                    '1N4148': { type: 'Fast', use: 'Signal diode' }
                },
                applications: [
                    'AC to DC rectification',
                    'Reverse polarity protection',
                    'Flyback diode (motor)',
                    'Voltage clamping',
                    'Signal demodulation'
                ],
                testMethod: 'Test dengan multimeter diode mode',
                commonFaults: ['Short circuit', 'High leakage', 'Open circuit']
            },

            inductor: {
                id: 'inductor',
                name: 'Inductor',
                category: 'passive',
                symbol: '⌇⌇⌇',
                svgSymbol: 'inductor-symbol.svg',
                description: 'Komponen yang menyimpan energi dalam medan magnet',
                function: 'Filter, energy storage, choke, transformer',
                unit: 'Henry (H)',
                pins: 2,
                polarity: false,
                values: ['1µH', '10µH', '100µH', '1mH', '10mH', '100mH'],
                properties: {
                    inductance: { min: 1e-6, max: 10, unit: 'H' },
                    current: { range: [100, 500, 1000, 3000, 5000], unit: 'mA' },
                    dcResistance: { min: 0.01, max: 100, unit: 'Ω' },
                    satCurrent: { unit: 'A' }
                },
                types: ['Air core', 'Ferrite core', 'Iron core', 'Toroid'],
                applications: [
                    'LC filter',
                    'Buck/boost converter',
                    'EMI suppression',
                    'RF circuits',
                    'Power factor correction'
                ],
                testMethod: 'Ukur dengan LCR meter',
                commonFaults: ['Core saturation', 'Winding short', 'Open circuit']
            },

            ic555: {
                id: 'ic555',
                name: '555 Timer IC',
                category: 'integrated',
                symbol: '▭',
                svgSymbol: 'ic-symbol.svg',
                description: 'IC timer serbaguna untuk timing dan oscillator',
                function: 'Astable multivibrator, monostable, PWM generator',
                pins: 8,
                pinout: {
                    1: 'GND',
                    2: 'Trigger',
                    3: 'Output',
                    4: 'Reset',
                    5: 'Control Voltage',
                    6: 'Threshold',
                    7: 'Discharge',
                    8: 'VCC'
                },
                properties: {
                    voltage: { min: 4.5, max: 16, typical: 5, unit: 'V' },
                    outputCurrent: { max: 200, unit: 'mA' },
                    frequency: { max: 2000000, unit: 'Hz' }
                },
                modes: {
                    astable: {
                        description: 'Free-running oscillator',
                        frequency: 'f = 1.44 / ((R1 + 2*R2) * C)',
                        dutyCycle: '(R1 + R2) / (R1 + 2*R2)'
                    },
                    monostable: {
                        description: 'One-shot pulse generator',
                        pulseWidth: 't = 1.1 * R * C'
                    }
                },
                applications: [
                    'LED flasher',
                    'Pulse generator',
                    'PWM controller',
                    'Frequency divider',
                    'Touch switch'
                ],
                testMethod: 'Build basic astable circuit, measure output',
                commonFaults: ['No output', 'Wrong frequency', 'Output stuck high/low']
            },

            opamp741: {
                id: 'opamp741',
                name: '741 Op-Amp',
                category: 'integrated',
                symbol: '△',
                svgSymbol: 'opamp-symbol.svg',
                description: 'Operational Amplifier untuk penguat dan filter',
                function: 'Amplifikasi, filter, komparator, buffer',
                pins: 8,
                pinout: {
                    1: 'Offset Null',
                    2: 'Inverting Input (-)',
                    3: 'Non-Inverting Input (+)',
                    4: 'V-',
                    5: 'Offset Null',
                    6: 'Output',
                    7: 'V+',
                    8: 'NC'
                },
                properties: {
                    voltage: { min: -18, max: 18, dual: '±15V', unit: 'V' },
                    gainBandwidth: { typical: 1000000, unit: 'Hz' },
                    slewRate: { typical: 0.5, unit: 'V/µs' },
                    inputBias: { max: 500, unit: 'nA' }
                },
                configurations: {
                    inverting: {
                        gain: '-Rf/Rin',
                        description: 'Inverting amplifier'
                    },
                    nonInverting: {
                        gain: '1 + (Rf/Rin)',
                        description: 'Non-inverting amplifier'
                    },
                    buffer: {
                        gain: '1',
                        description: 'Unity gain buffer'
                    }
                },
                applications: [
                    'Audio amplifier',
                    'Active filter',
                    'Voltage follower',
                    'Instrumentation amplifier',
                    'Integrator/Differentiator'
                ],
                testMethod: 'Build unity gain buffer, test output = input',
                commonFaults: ['No output', 'Oscillation', 'Offset voltage']
            },

            relay: {
                id: 'relay',
                name: 'Relay',
                category: 'electromechanical',
                symbol: '⚡🔌',
                svgSymbol: 'relay-symbol.svg',
                description: 'Saklar elektromagnet untuk high power switching',
                function: 'Isolasi dan kontrol beban besar dengan sinyal kecil',
                pins: '4-8',
                types: ['SPST', 'SPDT', 'DPDT'],
                properties: {
                    coilVoltage: { common: [5, 12, 24], unit: 'V' },
                    coilCurrent: { range: [50, 100, 200], unit: 'mA' },
                    contactRating: { voltage: [250, 120], current: [5, 10, 15], unit: 'A' },
                    switchingTime: { typical: 10, unit: 'ms' }
                },
                pinout: {
                    coil: 'Coil terminals (energize)',
                    NO: 'Normally Open',
                    NC: 'Normally Closed',
                    COM: 'Common'
                },
                applications: [
                    'AC appliance control',
                    'Motor switching',
                    'High current switching',
                    'Isolation dari microcontroller',
                    'Automation'
                ],
                testMethod: 'Apply coil voltage, check contact continuity',
                commonFaults: ['Coil burn', 'Contact weld', 'Spring failure']
            },

            // Add more components as needed...
        };
    }

    /**
     * Get component by ID
     */
    getComponent(id) {
        return this.components[id] || null;
    }

    /**
     * Get all components in category
     */
    getByCategory(category) {
        return Object.values(this.components).filter(c => c.category === category);
    }

    /**
     * Get random component
     */
    getRandomComponent(category = null) {
        let pool = Object.values(this.components);
        if (category) {
            pool = pool.filter(c => c.category === category);
        }
        return pool[Math.floor(Math.random() * pool.length)];
    }

    /**
     * Get multiple random components
     */
    getRandomComponents(count, category = null) {
        const components = [];
        for (let i = 0; i < count; i++) {
            components.push(this.getRandomComponent(category));
        }
        return components;
    }

    /**
     * Search components
     */
    search(query) {
        query = query.toLowerCase();
        return Object.values(this.components).filter(c => 
            c.name.toLowerCase().includes(query) ||
            c.description.toLowerCase().includes(query) ||
            c.category.toLowerCase().includes(query)
        );
    }

    /**
     * Get all categories
     */
    getCategories() {
        const categories = new Set();
        Object.values(this.components).forEach(c => categories.add(c.category));
        return Array.from(categories);
    }

    /**
     * Calculate resistor for LED
     */
    calculateLEDResistor(supplyVoltage, ledColor = 'red', ledCurrent = 20) {
        const led = this.getComponent('led');
        const vLed = led.properties.forwardVoltage[ledColor] || 2.0;
        const resistance = (supplyVoltage - vLed) / (ledCurrent / 1000);
        const power = Math.pow(ledCurrent / 1000, 2) * resistance;
        
        return {
            resistance: Math.round(resistance),
            standardValue: this.getNearestStandardResistor(resistance),
            power: power,
            recommendedPower: power < 0.125 ? 0.125 : (power < 0.25 ? 0.25 : 0.5)
        };
    }

    /**
     * Get nearest standard resistor value
     */
    getNearestStandardResistor(value) {
        const e12 = [10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82];
        let multiplier = 1;
        let normalized = value;
        
        while (normalized >= 100) {
            normalized /= 10;
            multiplier *= 10;
        }
        
        while (normalized < 10) {
            normalized *= 10;
            multiplier /= 10;
        }
        
        const nearest = e12.reduce((prev, curr) => 
            Math.abs(curr - normalized) < Math.abs(prev - normalized) ? curr : prev
        );
        
        return nearest * multiplier;
    }
}

// Make it globally accessible
window.ComponentLibrary = ComponentLibrary;
