interface dataValues {
    icon_height : number,
    base_url : string,
    num_icons : number,
    time_per_icon : number,
    allReels : number,
    colorsArray : Array<string>
}
const data : dataValues = {
    icon_height : 120,
    base_url : "http://localhost:8000",
    num_icons : 9,
    time_per_icon : 50,
    allReels : 15,
    colorsArray : ["rgba(236, 236, 114, 0.919)", "rgba(236, 236, 97, 0.919)", "rgba(235, 235, 70, 0.919)", "rgb(230, 230, 48)", "rgb(236, 236, 25)","rgb(236, 236, 59)", "rgb(210, 210, 113)", "rgb(238, 238, 71)", "rgb(228, 228, 112)"]
}

export default data
