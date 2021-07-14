export async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

export enum SlotResultSymbols {
    one='one',
    two='two',
    five='five',
    ten='ten',
    twenty='twenty',
    fourty='fourty',
    twox='twox',
    sevenx='sevenx'
}

export enum SpinResultSymbols {
    one='one',
    two='two',
    five='five',
    ten='ten',
    twenty='twenty',
    fourty='fourty',
    twox='twox',
    sevenx='sevenx'
}

export const spinResultImageToSymbol = (imageValue : string) : SpinResultSymbols => {
    const options = {
        'ico-dreamcatcher-1' : SpinResultSymbols.one,
        'ico-dreamcatcher-2' : SpinResultSymbols.two,
        'ico-dreamcatcher-5' : SpinResultSymbols.five,
        'ico-dreamcatcher-10' : SpinResultSymbols.ten,
        'ico-dreamcatcher-20' : SpinResultSymbols.twenty,
        'ico-dreamcatcher-40' : SpinResultSymbols.fourty,
        'ico-dreamcatcher-200' : SpinResultSymbols.twox,
        'ico-dreamcatcher-700' : SpinResultSymbols.sevenx,
    }

    return options[imageValue]
}

export const spinResultImageNameToSymbol = (imageValue : string) : SpinResultSymbols => {
    const options = {
        'ico-dreamcatcher-1' : SpinResultSymbols.one,
        'ico-dreamcatcher-2' : SpinResultSymbols.two,
        'ico-dreamcatcher-5' : SpinResultSymbols.five,
        'ico-dreamcatcher-10' : SpinResultSymbols.ten,
        'ico-dreamcatcher-20' : SpinResultSymbols.twenty,
        'ico-dreamcatcher-40' : SpinResultSymbols.fourty,
        'ico-dreamcatcher-200' : SpinResultSymbols.twox,
        'ico-dreamcatcher-700' : SpinResultSymbols.sevenx,
    }

    return options[imageValue]
}