const textColor = '#4a5156';
const textStrokeColor = '#353b48';
const wallColor = "#4a5156";
const restrictedColor = "rgba(74, 81, 86, 0.4)";

var CONFIG = {
    kakenScale: 1.5, 
    tappanScale: 1.0,
    rootElementID: 'svg-view',
    defaultZoom: 1.0,
    zoomLevel: 4.0,
    touchZoomSensitvity: 800,
    touchPanSensitvity: 0.1,
    iconSize: 16,
    textSize: 10,
    icon_files: [
        '/svg/icons/food.svg',
        '/svg/icons/elevator.svg',
        '/svg/icons/restroom.svg',
        '/svg/icons/stairs.svg',
    ],
    svg_files: [
        '/svg/kaken_02.svg',
        '/svg/kaken_03.svg',
        '/svg/kaken_04.svg',
        '/svg/kaken_05.svg',
        '/svg/tappan_03.svg',
        '/svg/tappan_04.svg',
        '/svg/tappan_05.svg',
    ],
    names: {
        'kaken': 'Kåken',
        'tappan': 'Täppan',
    },    
    styles: {
        'text': {
            'font-family': 'sans-serif',
            'font-weight': '700',
            'fill': textColor,
            // 'stroke': textStrokeColor,
            'stroke-width': '3px',
            'stroke-linecap': 'round',
            'paint-order': 'stroke',
        },
        'walls': {
            'fill': wallColor,
            'stroke': wallColor,
            'stroke-width': '1px',
        },
        'rooms': {
            'fill': 'none',
            'stroke': wallColor,
            'stroke-width': '1px',
        },
        'restricted': {
            'fill': "url('#stripes')",
            'stroke': wallColor,
            'stroke-width': '1px',
        },
        'stairs': {
            'fill': 'rgba(67, 160, 71, 0.2)',
            'stroke': 'rgb(67, 160, 71)',
            'stroke-width': '1px',
        }
    },
    'animation': {
        'smoothPosition': {duration: 2000, ease:'<>', step: 10},
        'roomHighlight': {duration: 1250, times: 9999, wait: 200, time: 5, ease:'<>'},
    }
}

const patternSize = 4;
const patternWidth = 2;
const STRIPE_PATTERN = `<pattern id="stripes" patternUnits="userSpaceOnUse" width="${patternSize}" height="${patternSize}" patternTransform="rotate(45)"><line x1="0" y="0" x1="0" y2="${patternSize}" stroke="${restrictedColor}" stroke-width="${patternWidth}" /></pattern>`;