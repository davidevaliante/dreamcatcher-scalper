export const months = {
    'Jan' : 1,
    'Feb' : 2,
    'Mar' : 3,
    'Apr' : 4,
    'May' : 5,
    'Jun' : 6,
    'Jul' : 7,
    'Aug' : 8,
    'Sep' : 9,
    'Oct' : 10,
    'Nov' : 11,
    'Dec' : 12
}

export const rawStringToUnixTime = (rawDateString : string) => {
    const year = new Date().getFullYear()
    const pieces = rawDateString.split(' ').filter(it => it !== '@')
    const month = months[pieces[0]] -1
    const day = parseInt(pieces[1])
    const hours = parseInt(pieces[2].split(':')[0])
    const minutes = parseInt(pieces[2].split(':')[1])

    // console.log(new Date(Date.UTC(year, month, day, hours, minutes)).getTime(), 'date')
    return new Date(Date.UTC(year, month, day, hours, minutes)).getTime()
}

export const rawStringToFormattedDate = (rawDateString : string) => {
    const year = new Date().getFullYear()
    const pieces = rawDateString.split(' ').filter(it => it !== '@')
    const month = months[pieces[0]] -1
    const day = parseInt(pieces[1])
    const hours = parseInt(pieces[2].split(':')[0])
    const minutes = parseInt(pieces[2].split(':')[1])

    // console.log(new Date(Date.UTC(year, month, day, hours, minutes)).getTime(), 'date')
    return new Date(Date.UTC(year, month, day, hours, minutes))
}