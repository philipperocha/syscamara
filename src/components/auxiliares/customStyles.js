import { StyleSheet } from 'react-native';

const exoRegular = 'Exo-Regular';
const exoBold = 'Exo-Bold';
const exoBoldItalic = 'Exo-BoldItalic';
const exoMedium = 'Exo-Medium';
const exoMediumItalic = 'Exo-MediumItalic';
const exoLight = 'Exo-Light';
const exoLightItalic = 'Exo-LightItalic';
const exoExtraLight = 'Exo-ExtraLight';
const exoExtraLightItalic = 'Exo-ExtraLightItalic';

const fonteTitulo = exoMedium;
const fonteDescricao = exoExtraLight;
const fonteMostrarMais = exoExtraLightItalic;
const fonteData = exoLightItalic;
const fonteRenderItemTitle = exoMedium;
const fonteRenderItemSubtitle = exoExtraLight;
const fonteBuscar = exoLight;

export default customStyles = StyleSheet.create({
    titulo: {
        fontFamily: fonteTitulo,
        fontSize: 18,
        color: 'black',
    },
    descricao: {
        fontFamily: fonteDescricao,
        fontSize: 16,
        color: 'black',
    },
    mostrarMais: {
        fontFamily: fonteMostrarMais,
        fontSize: 16,
        color: 'green'
    },
    data: {
        fontFamily: fonteData,
        fontSize: 14,
        color: 'black'
    },
    renderItemTitle: {
        fontFamily: fonteRenderItemTitle,
        fontSize: 16,
        color: 'black',
    },
    renderItemSubtitle: {
        fontFamily: fonteRenderItemSubtitle,
        fontSize: 14,
        color: 'black',
    },
    buscar: {
        fontFamily: fonteBuscar,
        fontSize: 14,
        color: 'black',
    },
});