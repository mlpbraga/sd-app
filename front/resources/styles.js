import {StyleSheet, Dimensions} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerLogin: {
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: '#2ECC71',
        paddingVertical: 20
    },
    containerMain: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    itemList: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 4,
        backgroundColor: '#e6e8ed',
        borderRadius: 10,
        height: 70,
        flexDirection: 'row'
    },
    itemListSm: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 4,
        backgroundColor: '#e6e8ed',
        borderRadius: 10,
        height: 50,
        flexDirection: 'row'
    },
    icon: {
        marginLeft: 10,
        marginHorizontal: 0,
    },
    imagePill: {
        width: 30,
        height: 30,
        marginHorizontal: 10
    },
    textItem: {
        marginHorizontal: 10
    },
    listItemName: {
        fontSize: 20,
    },
    listItemDescription: {
        fontSize: 16,
        color: '#767676'
    },
    inputLogin: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        fontSize: 20,
        marginHorizontal: 40,
        marginVertical: 5,
        borderLeftWidth: 4,
        borderRightWidth: 4,
        backgroundColor: '#58D68D'
    },
    input: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        marginHorizontal: 20,
        borderLeftWidth: 4,
        borderRightWidth: 4,
        height: 35
    },
    text: {
        textAlign: 'left',
        alignSelf: 'stretch',
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 5
    },
    button: {
        marginHorizontal: 10,
        marginVertical: 10,
        height: 50,
        backgroundColor: '#15885a',
        color: '#fff'
    },
    buttonDanger: {
        marginHorizontal: 10,
        marginVertical: 10,
        height: 50,
        backgroundColor: '#960003',
        color: '#fff'
    },
    buttonLeft: {
        marginHorizontal: 10,
        marginVertical: 10,
        height: 30,
        width: 30,
        backgroundColor: '#15885a',
        color: '#fff',
        marginLeft: 'auto',
        marginRight: 20
    },
    welcome: {
        fontSize: 40,
        color: '#FFFFFF',
        fontFamily: 'Comfortaa',
        textAlign: 'center',
    },
    signUp: {
        fontSize: 30,
        color: '#fff',
        fontFamily: 'Comfortaa',
        textAlign: 'center',
        margin: 30
    },
    textRow: {
        justifyContent: 'center',
        flexDirection: 'row'
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 'auto',
        width: Dimensions.get('window').width - 20,
        borderRadius: 10
    },
    block: {
        backgroundColor: '#f3f5fa',
        alignSelf: 'stretch',
        borderRadius: 10,
        marginHorizontal: 20,
        marginBottom: 10
    },
    blockCenter: {
        backgroundColor: '#f3f5fa',
        flexGrow: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderRadius: 10,
        marginHorizontal: 20,
        marginBottom: 10
    },
    indicator: {
        flex: 1,
        color: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        height: 80
    },
    footer: {
        justifyContent: 'flex-end',
        flex: 1,
    },
});

export default styles;