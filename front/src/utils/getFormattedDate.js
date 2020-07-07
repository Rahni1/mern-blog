// format in MMM DD, YYYY (August 29, 2019)
const getFormattedDate = date => {
    return new Date(Date.parse(date)).toLocaleDateString("en-UK", {
        dateStyle: "long"
    })
}

export default getFormattedDate